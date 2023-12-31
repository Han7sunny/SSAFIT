import csv, copy, argparse, itertools, os, threading, pyttsx3
from collections import Counter
from collections import deque

import cv2 as cv
import numpy as np
import mediapipe as mp
import face_recognition as fr
import speech_recognition as sr

from model import KeyPointClassifier
from model import PointHistoryClassifier


def get_args():
    parser = argparse.ArgumentParser()

    parser.add_argument("--device", type=int, default=0)
    parser.add_argument("--width", help='cap width', type=int, default=960)
    parser.add_argument("--height", help='cap height', type=int, default=540)

    parser.add_argument('--use_static_image_mode', action='store_true')
    parser.add_argument("--min_detection_confidence",
                        help='min_detection_confidence',
                        type=float,
                        default=0.7)
    parser.add_argument("--min_tracking_confidence",
                        help='min_tracking_confidence',
                        type=int,
                        default=0.5)

    args = parser.parse_args()

    return args


def calc_bounding_rect(image, landmarks):
    image_width, image_height = image.shape[1], image.shape[0]

    landmark_array = np.empty((0, 2), int)

    for _, landmark in enumerate(landmarks.landmark):
        landmark_x = min(int(landmark.x * image_width), image_width - 1)
        landmark_y = min(int(landmark.y * image_height), image_height - 1)

        landmark_point = [np.array((landmark_x, landmark_y))]

        landmark_array = np.append(landmark_array, landmark_point, axis=0)

    x, y, w, h = cv.boundingRect(landmark_array)

    return [x, y, x + w, y + h]


def calc_landmark_list(image, landmarks):
    image_width, image_height = image.shape[1], image.shape[0]
    landmark_point = []

    for _, landmark in enumerate(landmarks.landmark):
        landmark_x = min(int(landmark.x * image_width), image_width - 1)
        landmark_y = min(int(landmark.y * image_height), image_height - 1)

        landmark_point.append([landmark_x, landmark_y])

    return landmark_point


def pre_process_landmark(landmark_list):
    temp_landmark_list = copy.deepcopy(landmark_list)

    base_x, base_y = 0, 0
    for index, landmark_point in enumerate(temp_landmark_list):
        if index == 0:
            base_x, base_y = landmark_point[0], landmark_point[1]

        temp_landmark_list[index][0] = temp_landmark_list[index][0] - base_x
        temp_landmark_list[index][1] = temp_landmark_list[index][1] - base_y

    temp_landmark_list = list(
        itertools.chain.from_iterable(temp_landmark_list))
    max_value = max(list(map(abs, temp_landmark_list)))

    def normalize_(n):
        return n / max_value

    temp_landmark_list = list(map(normalize_, temp_landmark_list))
    return temp_landmark_list


def pre_process_point_history(image, point_history):
    image_width, image_height = image.shape[1], image.shape[0]
    temp_point_history = copy.deepcopy(point_history)

    base_x, base_y = 0, 0
    for index, point in enumerate(temp_point_history):
        if index == 0:
            base_x, base_y = point[0], point[1]

        temp_point_history[index][0] = (temp_point_history[index][0] -
                                        base_x) / image_width
        temp_point_history[index][1] = (temp_point_history[index][1] -
                                        base_y) / image_height

    temp_point_history = list(
        itertools.chain.from_iterable(temp_point_history))

    return temp_point_history


def draw_info_text(image, brect, handedness, hand_sign_text, finger_gesture_text):
    cv.rectangle(image, (brect[0], brect[1]), (brect[2], brect[1] - 22),
                 (0, 0, 0), -1)

    info_text = handedness.classification[0].label[0:]
    if finger_gesture_text == 'Move':
        delta_x = after[0] - before[0]
        delta_y = after[1] - before[1]
        if abs(delta_x) > abs(delta_y):
            if delta_x >= l:
                finger_gesture_text += ' - Right'
            elif delta_x <= -l:
                finger_gesture_text += ' - Left'
        elif abs(delta_y) > abs(delta_x):
            if delta_y <= -l:
                finger_gesture_text += ' - Up'
            elif delta_y >= l:
                finger_gesture_text += ' - Down'
    if hand_sign_text != "":
        info_text = info_text + ':' + hand_sign_text
    cv.putText(image, info_text, (brect[0] + 5, brect[1] - 4),
               cv.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1, cv.LINE_AA)

    if finger_gesture_text != "":
        cv.putText(image, "Finger Gesture:" + finger_gesture_text, (10, 60),
                   cv.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 0), 4, cv.LINE_AA)
        cv.putText(image, "Finger Gesture:" + finger_gesture_text, (10, 60),
                   cv.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), 2,
                   cv.LINE_AA)

    return image

def draw_point_history(image, point_history):
    for index, point in enumerate(point_history):
        if point[0] != 0 and point[1] != 0:
            cv.circle(image, (point[0], point[1]), 1 + int(index / 2),
                      (152, 251, 152), 2)
    return image


def draw_info(image, fps):
    cv.putText(image, "FPS:" + str(fps), (10, 30), cv.FONT_HERSHEY_SIMPLEX,
               1.0, (0, 0, 0), 4, cv.LINE_AA)
    cv.putText(image, "FPS:" + str(fps), (10, 30), cv.FONT_HERSHEY_SIMPLEX,
               1.0, (255, 255, 255), 2, cv.LINE_AA)
    return image


def gesture():
    while True:
        key = cv.waitKey(10)
        ret, image = cap.read()
        if not ret:
            break
        image = cv.flip(image, 1)  # ミラー表示
        debug_image = copy.deepcopy(image)

        image = cv.cvtColor(image, cv.COLOR_BGR2RGB)

        image.flags.writeable = False
        results = hands.process(image)
        image.flags.writeable = True

        if results.multi_hand_landmarks is not None:
            for hand_landmarks, handedness in zip(results.multi_hand_landmarks,
                                                  results.multi_handedness):
                after[0] = hand_landmarks.landmark[8].x
                after[1] = hand_landmarks.landmark[8].y
                brect = calc_bounding_rect(debug_image, hand_landmarks)
                landmark_list = calc_landmark_list(debug_image, hand_landmarks)

                pre_processed_landmark_list = pre_process_landmark(
                    landmark_list)
                pre_processed_point_history_list = pre_process_point_history(
                    debug_image, point_history)

                hand_sign_id = keypoint_classifier(pre_processed_landmark_list)
                if hand_sign_id == 2:
                    point_history.append(landmark_list[8])
                else:
                    point_history.append([0, 0])

                finger_gesture_id = 0
                point_history_len = len(pre_processed_point_history_list)
                if point_history_len == (history_length * 2):
                    finger_gesture_id = point_history_classifier(
                        pre_processed_point_history_list)

                finger_gesture_history.append(finger_gesture_id)
                most_common_fg_id = Counter(
                    finger_gesture_history).most_common()

                debug_image = draw_info_text(
                    debug_image,
                    brect,
                    handedness,
                    keypoint_classifier_labels[hand_sign_id],
                    point_history_classifier_labels[most_common_fg_id[0][0]],
                )
        else:
            point_history.append([0, 0])

        debug_image = draw_point_history(debug_image, point_history)
        before[0] = after[0]
        before[1] = after[1]

        cv.imshow('Hand Gesture Recognition', debug_image)
        if not using_gesture or key == 27:
            cv.destroyWindow('Hand Gesture Recognition')
            print('exit')
            return


def speech():
    global find_member_start
    r = sr.Recognizer()
    while True:
        try:
            with sr.Microphone() as source:
                print("Say something! : ")
                audio = r.listen(source)
            text = r.recognize_google(audio, language='ko-KR')
            print(text)
            if text == '로그인':
                find_member_start = True
            else:
                s = pyttsx3.init()
                s.say(text)
                s.runAndWait()
        except:
            pass

def findMember():
    global is_login, name
    while True:
        try:
            status, frame = cap.read()
            top, right, bottom, left = fr.face_locations(frame, number_of_times_to_upsample=0)[0]
            face_img = frame[top:bottom, left:right]
            face_encoded = fr.face_encodings(face_img)
            print(face_encoded[0])
            for idx, enc_face in enumerate(enc_face_lists):
                dist = fr.face_distance(enc_face[0], face_encoded)
                print(idx, dist)

                if dist < 0.35:
                    name = person_names[idx]
                    is_login = True
                    f = pyttsx3.init()
                    print(name + '님이 로그인 하셨습니다.')
                    f.say(name + '님이 로그인 하셨습니다.')
                    f.runAndWait()
                    return
        except:
            pass

args = get_args()

cap_device = args.device
cap_width = args.width
cap_height = args.height

use_static_image_mode = args.use_static_image_mode
min_detection_confidence = args.min_detection_confidence
min_tracking_confidence = args.min_tracking_confidence

cap = cv.VideoCapture(cap_device)
cap.set(cv.CAP_PROP_FRAME_WIDTH, cap_width)
cap.set(cv.CAP_PROP_FRAME_HEIGHT, cap_height)
if not cap.isOpened():
    print("Could not open webcam")
    exit()

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=use_static_image_mode,
    max_num_hands=1,
    min_detection_confidence=min_detection_confidence,
    min_tracking_confidence=min_tracking_confidence,
)

keypoint_classifier = KeyPointClassifier()

point_history_classifier = PointHistoryClassifier()

with open('model/keypoint_classifier/keypoint_classifier_label.csv',
          encoding='utf-8-sig') as f:
    keypoint_classifier_labels = csv.reader(f)
    keypoint_classifier_labels = [
        row[0] for row in keypoint_classifier_labels
    ]
with open(
        'model/point_history_classifier/point_history_classifier_label.csv',
        encoding='utf-8-sig') as f:
    point_history_classifier_labels = csv.reader(f)
    point_history_classifier_labels = [
        row[0] for row in point_history_classifier_labels
    ]

history_length = 16
point_history = deque(maxlen=history_length)

finger_gesture_history = deque(maxlen=history_length)

is_login = False
name = None
find_member_start = False
using_gesture = False
before = [0] * 2
after = [0] * 2
l = 0.01

path = os.getcwd()+'/picture/'
os.chdir(path)  # 해당 폴더로 이동
files = os.listdir(path)
print(files)

# load your image
person_lists = []
person_names = []
for file in files:
    person_lists.append(fr.load_image_file(file))
    person_names.append(file.split('.')[0])
print(person_names)

face_lists = []
for person in person_lists:
    top, right, bottom, left = fr.face_locations(person)[0]
    face_img = person[top:bottom, left:right]
    face_lists.append(face_img)

enc_face_lists = []
for face in face_lists:
    enc_face_lists.append(fr.face_encodings(face))

t2 = threading.Thread(target=speech)
t2.start()

while cap.isOpened():
    ret, img = cap.read()
    img = cv.flip(img, 1)

    if not ret:
        print("Could not read frame")
        exit()
    key = cv.waitKey(1)
    if key & 0xFF == ord('g'):
        if using_gesture:
            using_gesture = False
        else:
            using_gesture = True
            t3 = threading.Thread(target=gesture)
            t3.start()

    if not is_login:
        if key & 0xFF == ord('l'):
            find_member_start = True

    if find_member_start:
        print('find')
        t1 = threading.Thread(target=findMember)
        t1.start()
        find_member_start = False

    # display output
    cv.imshow("detect me", img)

    if key & 0xFF == ord('x'):
        if is_login:
            is_login = False
            print(name + '님이 로그아웃 하셨습니다.')

    # press "Q" to stop
    if key & 0xFF == ord('q'):
        if is_login:
            is_login = False
            print(name + '님이 로그아웃 하셨습니다.')
        break

cap.release()
cv.destroyAllWindows()
