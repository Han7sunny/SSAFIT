#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv, copy, argparse, itertools, os, threading, pyttsx3
import  math
from collections import Counter
from collections import deque

import requests
import cv2 as cv
import numpy as np
import mediapipe as mp
import face_recognition as fr
import speech_recognition as sr
import socket
from _thread import *
import time
from queue import Queue

from utils import CvFpsCalc
from model import KeyPointClassifier
from model import PointHistoryClassifier
from model import PoseClassifier

HOST = '127.0.0.1'
PORT = 9999

client_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
client_socket.connect((HOST, PORT))

old_angle = 0
before_right = 'normal'
before_left = 'normal'
ol_time = 0
or_time = 0
ent_dt = 0
back_dt = 0
ges_dt = 0
sports_name = 'empty'


class MyDict(dict):
    def toString(self):
        return "{" + ",".join(['"%s":"%s"' % (key, self[key]) for key in self]) + "}"

class stack:
    def __init__(self):
        self.items = []
    def __len__(self):
        return len(self.items)
    def push(self, item):
        self.items.append(item)
    def pop(self):
        if not self.isEmpty():
            return self.items.pop(-1)
    def clear(self):
        self.top = []
    def peek(self):
        if not self.isEmpty():
            return self.items[-1]
    def isEmpty(self):
        return  len(self.items) == 0



baseURL = 'http://i8a204.p.ssafy.io:8080/api/mirror'
# baseURL = 'http://192.168.0.17:8090/api/mirror'
response = requests.get(baseURL + '/get-face-encoding-list')


def recv_data(client_socket) :
    global gesture_start, find_member_start, gesture_end, pose_start, sports_name, is_login, pose_end, counter


    q.put('on')
    while True:


        data = client_socket.recv(1024)
        data = data.decode('utf-8')
        data = data.strip()
        print("recive : ", data)
        if data == 'gestureon' and gesture_start == False:
            gesture_start = True
        elif data == 'ismember' and is_login == False:
            find_member_start = True
        elif data == 'gestureoff':
            gesture_end = True
        elif data == "poseon"and pose_start == False:
            pose_start = True
        elif data == "poseoff":
            pose_end = True

        elif data == '스쿼트':
            sports_name = "squat"
        elif data == '팔굽혀펴기':
            sports_name = "pushup"
        elif data == 'finish':
            counter.clear();
        elif data == 'logout' and is_login == True:
            is_login = False
        elif data == 'game':
            sports_name = 'game'




def get_args():
    parser = argparse.ArgumentParser()

    parser.add_argument("--device", type=int, default=1)
    parser.add_argument("--width", help='cap width', type=int, default=540)
    parser.add_argument("--height", help='cap height', type=int, default=960)

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


def calc_bounding_rect(img, landmarks):
    img_width, img_height = img.shape[1], img.shape[0]

    landmark_array = np.empty((0, 2), int)

    for _, landmark in enumerate(landmarks.landmark):
        landmark_x = min(int(landmark.x * img_width), img_width - 1)
        landmark_y = min(int(landmark.y * img_height), img_height - 1)

        landmark_point = [np.array((landmark_x, landmark_y))]

        landmark_array = np.append(landmark_array, landmark_point, axis=0)

    x, y, w, h = cv.boundingRect(landmark_array)

    return [x, y, x + w, y + h]


def calc_landmark_list(img, landmarks):
    img_width, img_height = img.shape[1], img.shape[0]

    landmark_point = []

    # キーポイント
    for _, landmark in enumerate(landmarks.landmark):
        landmark_x = min(int(landmark.x * img_width), img_width - 1)
        landmark_y = min(int(landmark.y * img_height), img_height - 1)
        # landmark_z = landmark.z

        landmark_point.append([landmark_x, landmark_y])

    return landmark_point


def pre_process_landmark(landmark_list):
    temp_landmark_list = copy.deepcopy(landmark_list)

    # 相対座標に変換
    base_x, base_y = 0, 0
    for index, landmark_point in enumerate(temp_landmark_list):
        if index == 0:
            base_x, base_y = landmark_point[0], landmark_point[1]

        temp_landmark_list[index][0] = temp_landmark_list[index][0] - base_x
        temp_landmark_list[index][1] = temp_landmark_list[index][1] - base_y

    # 1次元リストに変換
    temp_landmark_list = list(
        itertools.chain.from_iterable(temp_landmark_list))

    # 正規化
    max_value = max(list(map(abs, temp_landmark_list)))

    def normalize_(n):
        return n / max_value

    temp_landmark_list = list(map(normalize_, temp_landmark_list))

    return temp_landmark_list


def pre_process_point_history(img, point_history):
    img_width, img_height = img.shape[1], img.shape[0]

    temp_point_history = copy.deepcopy(point_history)

    # 相対座標に変換
    base_x, base_y = 0, 0
    for index, point in enumerate(temp_point_history):
        if index == 0:
            base_x, base_y = point[0], point[1]

        temp_point_history[index][0] = (temp_point_history[index][0] -
                                        base_x) / img_width
        temp_point_history[index][1] = (temp_point_history[index][1] -
                                        base_y) / img_height

    # 1次元リストに変換
    temp_point_history = list(
        itertools.chain.from_iterable(temp_point_history))

    return temp_point_history



def draw_info_text(img, brect, handedness, hand_sign_text, finger_gesture_text,q):
    global  befor_right,before_left, or_time,ol_time, ent_dt, back_dt
    cv.rectangle(img, (brect[0], brect[1]), (brect[2], brect[1] - 22),
                 (0, 0, 0), -1)
    info_text = handedness.classification[0].label[0:]

    if hand_sign_text == "Enter":
        ent_dt += 1
        if ent_dt  % 15 == 1:
            ent_dt = 1
            q.put("enter")
    elif hand_sign_text == "Back":
        back_dt += 1
        if back_dt % 15 == 1:
            back_dt = 1
            q.put("back")
    # if hand_sign_text == 'Open':
    #     Q.put('open')
    # # elif hand_sign_text == 'Close':
    # else :
    #     if finger_gesture_text == 'Move':
    #         delta_x = after[0] - before[0]
    #         delta_y = after[1] - before[1]
    #         if abs(delta_x) > abs(delta_y):
    #             if delta_x >= l:
    #
    #                 finger_gesture_text += ' - Right'
    #                 if curr_state == 'Left':
    #                     curr_state = 'normal'
    #                 else :
    #                     curr_state = 'Right'
    #                     Q.put('r')
    #             elif delta_x <= -l:
    #                 finger_gesture_text += ' - Left'
    #                 if curr_state == 'Right' :
    #                     curr_state = 'normal'
    #                 else :
    #                     curr_state = 'Left'
    #                     Q.put('l')
    #         elif abs(delta_y) > abs(delta_x):
    #             if delta_y <= -l:
    #                 finger_gesture_text += ' - Up'
    #                 curr_idx = 2
    #                 Q.put('up')
    #             elif delta_y >= l:
    #                 finger_gesture_text += ' - Down'
    #                 curr_idx = 3
    #                 Q.put('down')


    if hand_sign_text != "":
        info_text = info_text + ':' + hand_sign_text
    cv.putText(img, info_text, (brect[0] + 5, brect[1] - 4),
               cv.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1, cv.LINE_AA)

    if finger_gesture_text != "":
        cv.putText(img, "Finger Gesture:" + finger_gesture_text, (10, 60),
                   cv.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 0), 4, cv.LINE_AA)
        cv.putText(img, "Finger Gesture:" + finger_gesture_text, (10, 60),
                   cv.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), 2,
                   cv.LINE_AA)

    return img


def draw_point_history(img, point_history):
    for index, point in enumerate(point_history):
        if point[0] != 0 and point[1] != 0:
            cv.circle(img, (point[0], point[1]), 1 + int(index / 2),
                      (152, 251, 152), 2)
    return img


def draw_info(img, fps):
    cv.putText(img, "FPS:" + str(fps), (10, 30), cv.FONT_HERSHEY_SIMPLEX,
               1.0, (0, 0, 0), 4, cv.LINE_AA)
    cv.putText(img, "FPS:" + str(fps), (10, 30), cv.FONT_HERSHEY_SIMPLEX,
               1.0, (255, 255, 255), 2, cv.LINE_AA)
    return img

def client(q):
    while True:
        data = q.get()

        if data is None :
            continue
        else :
            client_socket.send(data.encode('utf-8'))
        '''x`
        무한 루프를 돌면서 2초에 한번씩 데이터를 송신함.
        만약 종료 조건을 넣고 싶다면 여기에 넣으면 됨
        '''

    client_socket.close()


def speech(q):
    global find_member_start, gesture_start, gesture_end, pose_start, pose_end
    r = sr.Recognizer()
    while True:
        try:
            with sr.Microphone() as source:
                print("Say something! : ")
                audio = r.listen(source, phrase_time_limit=3)
            text = r.recognize_google(audio, language='ko-KR')
            print(text)
            if '로그인' in text:
                find_member_start = True
            elif '메뉴' in text:
                gesture_start = True
                q.put('menu')
            elif '닫아'  in text:
                gesture_end = True
                # q.put('gesclose')
            elif '시작' in text:
                pose_start = True
                # q.put('pose')
            # elif '끝' in text:
            #     pose_end = True
            #     # q.put('poseclose')
            elif '댄스' in text:
                q.put('dance')
            else:
                s = pyttsx3.init()
                s.say(text)

                s.runAndWait()
        except:
            pass


def findMember(q):
    global is_login, name, response, baseURL
    while True:
        # try:
            # status, frame = cap.read()
            # frame = cv.flip(frame,1)
            # # frame = cv.rotate(frame, cv.ROTATE_90_CLOCKWISE)
            # top, right, bottom, left = fr.face_locations(frame, number_of_times_to_upsample=0)[0]
            # face_img = frame[top:bottom, left:right]
            # face_encoded = fr.face_encodings(face_img)
            # for idx, enc_face in enumerate(enc_face_lists):
            #     dist = fr.face_distance(enc_face[0], face_encoded)
            #
            #     if dist < 0.35:
            #         name = person_names[idx]
            #         is_login = True
            #         f = pyttsx3.init()
            #         q.put('login')
            #         print(name + '님이 로그인 하셨습니다.')
            #         f.say(name + '님이 로그인 하셨습니다.')
            #         f.runAndWait()
            #         return
        status, frame = cap.read()
        frame = cv.flip(frame, 1)
        # frame = cv.rotate(frame, cv.ROTATE_90_CLOCKWISE)
        if not status:
            print("Could not read frame")
            exit()
        try:
            top, right, bottom, left = fr.face_locations(frame, number_of_times_to_upsample=0)[0]
            face_img = frame[top:bottom, left:right]
            face_encoded = fr.face_encodings(face_img)
            for user in response.json():
                name = user["userName"]
                id = user["userId"]
                faceEncode = user["faceEncode"]
                enc_face = np.fromstring(faceEncode, dtype=float, sep=' ')
                dist = fr.face_distance(enc_face, face_encoded)
                if dist < 1:
                    is_login = True
                    q.put('login')
                    time.sleep(0.1)
                    jsonStr = MyDict()
                    tokenResp = requests.get(baseURL + '/mirror-login/' + id)
                    jsonStr["userId"] = id
                    jsonStr["userName"] = name
                    jsonStr["accessToken"] = tokenResp.json()["msg"]
                    print(jsonStr)
                    q.put(jsonStr.toString())
                    break



        except:
            pass
        if cv.waitKey(1) and is_login == True:
            break


def gesture(q):
    global gesture_end, old_angle, finger_top, finger_bottom, ol_time, or_time
    while True:
        # fps = cvFpsCalc.get()
        key = cv.waitKey(10)

        # カメラキャプチャ #####################################################
        ret, img = cap.read()
        if not ret:
            break
        img = cv.flip(img, 1)  # ミラー表示
        # img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)

        debug_img = copy.deepcopy(img)

        # 検出実施 #############################################################
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)

        img.flags.writeable = False
        results = hands.process(img)
        img.flags.writeable = True



        #  ####################################################################
        if results.multi_hand_landmarks is not None:
            for hand_landmarks, handedness in zip(results.multi_hand_landmarks,
                                                  results.multi_handedness):


                # 外接矩形の計算
                brect = calc_bounding_rect(debug_img, hand_landmarks)
                # ランドマークの計算
                landmark_list = calc_landmark_list(debug_img, hand_landmarks)

                # 相対座標・正規化座標への変換
                pre_processed_landmark_list = pre_process_landmark(
                    landmark_list)
                pre_processed_point_history_list = pre_process_point_history(
                    debug_img, point_history)
                # 学習データ保存
                print("x : ",hand_landmarks.landmark[8].x,"y : ",hand_landmarks.landmark[8].y)

                # ハンドサイン分類
                hand_sign_id = keypoint_classifier(pre_processed_landmark_list)
                if hand_sign_id == 2:  # 指差しサイン
                    point_history.append(landmark_list[8])  # 人差指座標
                else:
                    point_history.append([0, 0])

                # フィンガージェスチャー分類
                finger_gesture_id = 0
                point_history_len = len(pre_processed_point_history_list)
                if point_history_len == (history_length * 2):
                    finger_gesture_id = point_history_classifier(
                        pre_processed_point_history_list)

                # 直近検出の中で最多のジェスチャーIDを算出
                finger_gesture_history.append(finger_gesture_id)
                most_common_fg_id = Counter(
                    finger_gesture_history).most_common()

                # 描画
                # def draw_info_text(img, brect, handedness, hand_sign_text, finger_gesture_text, q):

                if handedness.classification[0].label[0:] == 'Right' and keypoint_classifier_labels[hand_sign_id] == 'Open':
                    finger_top[0] = hand_landmarks.landmark[8].x
                    finger_top[1] = hand_landmarks.landmark[8].y
                    finger_bottom[0] = hand_landmarks.landmark[0].x
                    finger_bottom[1] = hand_landmarks.landmark[0].y

                    angle = np.rad2deg(math.atan2(finger_top[1]-finger_bottom[1], finger_top[0] - finger_bottom[0]))

                    if angle < -130:
                        ol_time += 1
                        if ol_time % 15 == 1:
                            ol_time = 1
                            or_time = 0
                            q.put('left')
                    elif 0 > angle > -60:
                        or_time += 1
                        if or_time % 15 == 1:
                            or_time = 1
                            ol_time = 0
                            q.put('right')

                # debug_img = draw_landmarks(debug_img, landmark_list)
                debug_img = draw_info_text(
                    debug_img,
                    brect,
                    handedness,
                    keypoint_classifier_labels[hand_sign_id],
                    point_history_classifier_labels[most_common_fg_id[0][0]],
                    q
                )



        else:
            point_history.append([0, 0])

        debug_img = draw_point_history(debug_img, point_history)
        # debug_img = draw_info(debug_img, fps)

        # 画面反映 #############################################################
        cv.imshow('Hand Gesture Recognition', debug_img)
        if gesture_end or key == 27:
            cv.destroyWindow('Hand Gesture Recognition')
            print('exit')
            gesture_end = False
            return


counter = stack()
process = 0
IsDown = False
IsLeft = False
IsRight = False
pose_id = -1
def pose(q):
    global pose_end, sports_name, counter, process, IsDown, pose_id, IsRight, IsLeft
    with mp_pose.Pose(
            min_detection_confidence=0.9,
            min_tracking_confidence=0.9 )as pose:
        while cap.isOpened():
            key = cv.waitKey(10)

            ret, img = cap.read()
            if not ret:
                print("Ignoring empty camera frame.")
                # If loading a video, use 'break' instead of 'continue'.
                continue

            # To improve performance, optionally mark the img as not writeable to
            # pass by reference.
            img.flags.writeable = False
            img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
            results = pose.process(img)

            # Draw the pose annotation on the image.
            img.flags.writeable = True
            img = cv.cvtColor(img, cv.COLOR_RGB2BGR)

            pose_landmarks = results.pose_landmarks
            if pose_landmarks is not None:
                landmark_list = calc_landmark_list(img, pose_landmarks)

                pre_processed_landmark_list = pre_process_landmark(
                    landmark_list)
                # 学習データ保存
                sports_name = 'game'
                if sports_name == 'squat':
                    pose_id = squat_classifier(pre_processed_landmark_list)
                elif sports_name == 'game':
                    pose_id = game_classifier(pre_processed_landmark_list)
                    print("in",pose_id)


                elif sports_name == 'pushup':
                    pose_id = pushup_classifier(pre_processed_landmark_list)

                print("out" ,pose_id)
                if sports_name == 'squat':
                    if 1 <= pose_id <= 2:
                        if counter.__len__() < 2 and IsDown == False:
                            if pose_id == process:
                                counter.push(pose_id)
                                process += 1
                                if counter.__len__() == 2:
                                    IsDown = True
                                    counter.pop()
                                    process = 0
                        elif IsDown == True:
                            if pose_id == counter.peek():
                                counter.pop()
                                if counter.isEmpty():
                                    IsDown = False
                                    q.put('count')
                elif sports_name == 'game':
                    if 7 <= pose_id <= 9:

                        if IsDown:
                            if 7 <= pose_id < 9:
                                IsDown = False
                                q.put('jump')
                        else:
                            if pose_id == 7 and IsRight == False:
                                IsRight = True
                                IsLeft = False
                                counter.push(pose_id)
                                q.put('right')
                            elif  pose_id == 8 and IsLeft == False:
                                IsLeft = True
                                IsRight = False
                                counter.push(pose_id)
                                q.put('left')
                            if pose_id == 9:
                                IsRight = False
                                IsLeft = False
                                counter.push(pose_id)
                                IsDown = True
                                q.put('down')
                        print(pose_classifier_labels[pose_id])

                elif sports_name =='pushup':
                    if 2 < pose_id <= 4:
                        print(pose_classifier_labels[pose_id])



                mp_drawing.draw_landmarks(
                    img,
                    results.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS,
                    landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
            # Flip the image horizontally for a selfie-view display.
            img = cv.flip(img, 1)
            # img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)
            cv.imshow('MediaPipe Pose', img )
            if pose_end or key == 27:
                cv.destroyWindow('MediaPipe Pose')
                print('exit')
                pose_end = False
                return


# 引数解析 #################################################################

q = Queue()

args = get_args()

cap_device = args.device
cap_width = args.width
cap_height = args.height



use_static_image_mode = args.use_static_image_mode
min_detection_confidence = args.min_detection_confidence
min_tracking_confidence = args.min_tracking_confidence

# カメラ準備 ###############################################################
cap = cv.VideoCapture(cv.CAP_DSHOW + 0)
cap.set(cv.CAP_PROP_FRAME_WIDTH, cap_width)
cap.set(cv.CAP_PROP_FRAME_HEIGHT, cap_height)
if not cap.isOpened():
    print("Could not open webcam")
    exit()

# モデルロード #############################################################
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=use_static_image_mode,
    max_num_hands=1,
    min_detection_confidence=min_detection_confidence,
    min_tracking_confidence=min_tracking_confidence,
)

keypoint_classifier = KeyPointClassifier()
point_history_classifier = PointHistoryClassifier()

pushup_classifier = PoseClassifier('pushup')
squat_classifier = PoseClassifier('squat')
game_classifier = PoseClassifier('lunge')

# ラベル読み込み ###########################################################
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
with open('model/pose_classifier/pose_classifier_label.csv',
          encoding='utf-8-sig') as f:
    pose_classifier_labels = csv.reader(f)
    pose_classifier_labels = [row[0] for row in pose_classifier_labels]

# FPS計測モジュール ########################################################
cvFpsCalc = CvFpsCalc(buffer_len=10)

# 座標履歴 #################################################################
history_length = 16
point_history = deque(maxlen=history_length)

# フィンガージェスチャー履歴 ################################################
finger_gesture_history = deque(maxlen=history_length)

is_login = False
name = None
find_member_start = False
gesture_start, gesture_end = False, False
pose_start, pose_end = False, False
before_top = [0] * 2
before_bottom = [0] * 2
finger_top = [0] * 2
finger_bottom = [0] * 2
l = 0.1

path = os.getcwd() + '/picture/'
os.chdir(path)  # 해당 폴더로 이동
files = os.listdir(path)

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

def sports_counter(pose_idx, id, n):
    global  IsDown, process, counter, q

    if pose_idx <= id <= (pose_idx + n - 1):
        if counter.__len__() < n and IsDown == False:
            if id - pose_idx == process:
                counter.push(id)
                process += 1
                if counter.__len__() == n:
                    IsDown = True
                    counter.pop()
                    process = 0
        elif IsDown == True:
            if id == counter.peek():
                counter.pop()
                if counter.isEmpty():
                    IsDown = False
                    q.put('count')
def thread_process():
    global is_login, find_member_start, gesture_start, pose_start, q, sports_name
    while cap.isOpened():
        ret, img = cap.read()
        img = cv.flip(img, 1)
        # img = cv.rotate(img, cv.ROTATE_90_CLOCKWISE)

        if not ret:
            print("Could not read frame")
            exit()
        key = cv.waitKey(1)

        if not is_login:
            if key & 0xFF == ord('l'):
                find_member_start = True

        if find_member_start:
            print('find')
            t1 = threading.Thread(target=findMember, args=(q,))
            t1.start()
            find_member_start = False

        if gesture_start or key & 0xFF == ord('g'):
            print('gesture start')
            t3 = threading.Thread(target=gesture, args=(q,))
            t3.start()
            q.put("gestureon")

            gesture_start = False


        if pose_start or key & 0xFF == ord('p'):
            print('pose_start')

            t4 = threading.Thread(target=pose, args=(q,))
            t4.start()
            q.put("poseon")
            pose_start = False

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


t2 = threading.Thread(target=speech, args=(q,))
t2.start()

t5 = threading.Thread(target=client, args = (q,))
t5.start()
t7 = threading.Thread(target=thread_process)
t7.start()
t6 = threading.Thread(target=recv_data(client_socket))
t6.start()


cap.release()
cv.destroyAllWindows()
