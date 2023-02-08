#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv, copy, argparse, itertools, os, threading, pyttsx3
from collections import Counter
from collections import deque

import cv2 as cv
import numpy as np
import mediapipe as mp
import face_recognition as fr
import speech_recognition as sr

from utils import CvFpsCalc
from model import KeyPointClassifier
from model import PointHistoryClassifier
from model import PoseClassifier


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


# def draw_landmarks(img, landmark_point):
#     # 接続線
#     if len(landmark_point) > 0:
#         # 親指
#         cv.line(img, tuple(landmark_point[2]), tuple(landmark_point[3]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[2]), tuple(landmark_point[3]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[3]), tuple(landmark_point[4]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[3]), tuple(landmark_point[4]),
#                 (255, 255, 255), 2)
#
#         # 人差指
#         cv.line(img, tuple(landmark_point[5]), tuple(landmark_point[6]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[5]), tuple(landmark_point[6]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[6]), tuple(landmark_point[7]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[6]), tuple(landmark_point[7]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[7]), tuple(landmark_point[8]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[7]), tuple(landmark_point[8]),
#                 (255, 255, 255), 2)
#
#         # 中指
#         cv.line(img, tuple(landmark_point[9]), tuple(landmark_point[10]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[9]), tuple(landmark_point[10]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[10]), tuple(landmark_point[11]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[10]), tuple(landmark_point[11]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[11]), tuple(landmark_point[12]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[11]), tuple(landmark_point[12]),
#                 (255, 255, 255), 2)
#
#         # 薬指
#         cv.line(img, tuple(landmark_point[13]), tuple(landmark_point[14]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[13]), tuple(landmark_point[14]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[14]), tuple(landmark_point[15]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[14]), tuple(landmark_point[15]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[15]), tuple(landmark_point[16]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[15]), tuple(landmark_point[16]),
#                 (255, 255, 255), 2)
#
#         # 小指
#         cv.line(img, tuple(landmark_point[17]), tuple(landmark_point[18]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[17]), tuple(landmark_point[18]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[18]), tuple(landmark_point[19]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[18]), tuple(landmark_point[19]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[19]), tuple(landmark_point[20]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[19]), tuple(landmark_point[20]),
#                 (255, 255, 255), 2)
#
#         # 手の平
#         cv.line(img, tuple(landmark_point[0]), tuple(landmark_point[1]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[0]), tuple(landmark_point[1]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[1]), tuple(landmark_point[2]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[1]), tuple(landmark_point[2]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[2]), tuple(landmark_point[5]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[2]), tuple(landmark_point[5]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[5]), tuple(landmark_point[9]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[5]), tuple(landmark_point[9]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[9]), tuple(landmark_point[13]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[9]), tuple(landmark_point[13]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[13]), tuple(landmark_point[17]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[13]), tuple(landmark_point[17]),
#                 (255, 255, 255), 2)
#         cv.line(img, tuple(landmark_point[17]), tuple(landmark_point[0]),
#                 (0, 0, 0), 6)
#         cv.line(img, tuple(landmark_point[17]), tuple(landmark_point[0]),
#                 (255, 255, 255), 2)
#
#     # キーポイント
#     for index, landmark in enumerate(landmark_point):
#         if index == 0:  # 手首1
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 1:  # 手首2
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 2:  # 親指：付け根
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 3:  # 親指：第1関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 4:  # 親指：指先
#             cv.circle(img, (landmark[0], landmark[1]), 8, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 8, (0, 0, 0), 1)
#         if index == 5:  # 人差指：付け根
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 6:  # 人差指：第2関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 7:  # 人差指：第1関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 8:  # 人差指：指先
#             cv.circle(img, (landmark[0], landmark[1]), 8, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 8, (0, 0, 0), 1)
#         if index == 9:  # 中指：付け根
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 10:  # 中指：第2関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 11:  # 中指：第1関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 12:  # 中指：指先
#             cv.circle(img, (landmark[0], landmark[1]), 8, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 8, (0, 0, 0), 1)
#         if index == 13:  # 薬指：付け根
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 14:  # 薬指：第2関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 15:  # 薬指：第1関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 16:  # 薬指：指先
#             cv.circle(img, (landmark[0], landmark[1]), 8, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 8, (0, 0, 0), 1)
#         if index == 17:  # 小指：付け根
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 18:  # 小指：第2関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 19:  # 小指：第1関節
#             cv.circle(img, (landmark[0], landmark[1]), 5, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 5, (0, 0, 0), 1)
#         if index == 20:  # 小指：指先
#             cv.circle(img, (landmark[0], landmark[1]), 8, (255, 255, 255),
#                       -1)
#             cv.circle(img, (landmark[0], landmark[1]), 8, (0, 0, 0), 1)
#
#     return img


def draw_info_text(img, brect, handedness, hand_sign_text, finger_gesture_text):
    cv.rectangle(img, (brect[0], brect[1]), (brect[2], brect[1] - 22),
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


def speech():
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
            elif '닫아' in text:
                gesture_end = True
            elif '시작' in text:
                pose_start = True
            elif '끝' in text:
                pose_end = True
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


def gesture():
    global gesture_end
    while True:
        # fps = cvFpsCalc.get()
        key = cv.waitKey(10)

        # カメラキャプチャ #####################################################
        ret, img = cap.read()
        if not ret:
            break
        img = cv.flip(img, 1)  # ミラー表示
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
                after[0] = hand_landmarks.landmark[8].x
                after[1] = hand_landmarks.landmark[8].y
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
                # debug_img = draw_landmarks(debug_img, landmark_list)
                debug_img = draw_info_text(
                    debug_img,
                    brect,
                    handedness,
                    keypoint_classifier_labels[hand_sign_id],
                    point_history_classifier_labels[most_common_fg_id[0][0]],
                )
        else:
            point_history.append([0, 0])

        debug_img = draw_point_history(debug_img, point_history)
        # debug_img = draw_info(debug_img, fps)
        before[0] = after[0]
        before[1] = after[1]
        # 画面反映 #############################################################
        cv.imshow('Hand Gesture Recognition', debug_img)
        if gesture_end or key == 27:
            cv.destroyWindow('Hand Gesture Recognition')
            print('exit')
            gesture_end = False
            return


def pose():
    global pose_end
    with mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as pose:
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
                hand_sign_id = pose_classifier(pre_processed_landmark_list)
                print(pose_classifier_labels[hand_sign_id])
                mp_drawing.draw_landmarks(
                    img,
                    results.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS,
                    landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
            # Flip the image horizontally for a selfie-view display.
            cv.imshow('MediaPipe Pose', cv.flip(img, 1))
            if pose_end or key == 27:
                cv.destroyWindow('MediaPipe Pose')
                print('exit')
                pose_end = False
                return


# 引数解析 #################################################################
args = get_args()

cap_device = args.device
cap_width = args.width
cap_height = args.height

use_static_image_mode = args.use_static_image_mode
min_detection_confidence = args.min_detection_confidence
min_tracking_confidence = args.min_tracking_confidence

# カメラ準備 ###############################################################
cap = cv.VideoCapture(cap_device)
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
pose_classifier = PoseClassifier()

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
before = [0] * 2
after = [0] * 2
l = 0.01

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

t2 = threading.Thread(target=speech)
t2.start()

while cap.isOpened():
    ret, img = cap.read()
    img = cv.flip(img, 1)

    if not ret:
        print("Could not read frame")
        exit()
    key = cv.waitKey(1)

    if not is_login:
        if key & 0xFF == ord('l'):
            find_member_start = True

    if find_member_start:
        print('find')
        t1 = threading.Thread(target=findMember)
        t1.start()
        find_member_start = False

    if gesture_start or key & 0xFF == ord('g'):
        print('gesture start')
        t3 = threading.Thread(target=gesture)
        t3.start()
        gesture_start = False

    if pose_start or key & 0xFF == ord('p'):
        print('pose_start')
        t4 = threading.Thread(target=pose)
        t4.start()
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

cap.release()
cv.destroyAllWindows()
