#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv
import copy
import argparse
import itertools
from collections import Counter
from collections import deque

import cv2 as cv
import numpy as np
import mediapipe as mp

from utils import CvFpsCalc
from model import KeyPointClassifier
from model import PointHistoryClassifier
from threading import Thread

def work(id, start, end, result):
  total = 0
  for i in range(start, end):
    total+=i
  result.append(total)
  return


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

def main():
  # 引数解析 #################################################################
  args = get_args()

  cap_device = args.device
  cap_width = args.width
  cap_height = args.height

  use_static_image_mode = args.use_static_image_mode
  min_detection_confidence = args.min_detection_confidence
  min_tracking_confidence = args.min_tracking_confidence

  mp_drawing = mp.solutions.drawing_utils
  mp_drawing_styles = mp.solutions.drawing_styles

  use_brect = True

  # カメラ準備 ###############################################################
  cap = cv.VideoCapture(cap_device)
  cap.set(cv.CAP_PROP_FRAME_WIDTH, cap_width)
  cap.set(cv.CAP_PROP_FRAME_HEIGHT, cap_height)

  mp_pose = mp.solutions.pose.pose_world_landmarks;

  mp_3d_pose = mp.solutions.
  # モデルロード #############################################################
  pose = mp_pose.Pose(
    static_image_mode=use_static_image_mode,
    model_complexity=2,
    min_detection_confidence=min_detection_confidence,  
    min_tracking_confidence=min_tracking_confidence,
  )

  keypoint_classifier = KeyPointClassifier()

  # FPS計測モジュール ########################################################
  # cvFpsCalc = CvFpsCalc(buffer_len=10)


  # 座標履歴 #################################################################
  history_length = 16
  point_history = deque(maxlen=history_length)

  # フィンガージェスチャー履歴 ################################################
  finger_gesture_history = deque(maxlen=history_length)

  #  ########################################################################
  mode = 0

  while True:

    # キー処理(ESC：終了) #################################################
    key = cv.waitKey(10)
    if key == 27:  # ESC
      break
    number, mode = select_mode(key, mode)
    # カメラキャプチャ #####################################################
    ret, image = cap.read()
    if not ret:
      break
    image = cv.flip(image, 1)  # ミラー表示
    debug_image = copy.deepcopy(image)
   # 検出実施 #############################################################

    image.flags.writeable = False #이미지 다시쓰기
    image = cv.cvtColor(image, cv.COLOR_BGR2RGB)

    #탐지
    results_pose = pose.process(image)

    image.flags.writeable = True
    image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

    if results_pose.pose_landmarks is not None:
      brect = calc_bounding_rect(debug_image, results_pose.pose_landmarks)

      landmark_list = calc_landmark_list(debug_image, results_pose.pose_landmarks)

      pre_processed_landmark_list = pre_process_landmark(landmark_list)

      pre_processed_point_history_list = pre_process_point_history(debug_image, point_history)
      logging_csv(number, mode, pre_processed_landmark_list,
                  pre_processed_point_history_list)

      # ハンドサイン分類
      hand_sign_id = keypoint_classifier(pre_processed_landmark_list)

      mp_drawing.draw_landmarks(
        debug_image,
        results_pose.pose_landmarks,
        mp_pose.POSE_CONNECTIONS,
        landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())


    cv.imshow('Hand Gesture Recognition', debug_image)

  cap.release()
  cv.destroyAllWindows()

def calc_bounding_rect(image, landmarks):
  image_width, image_height = image.shape[1], image.shape[0]

  landmark_array = np.empty((0, 2), int)

  for _, landmark in enumerate(landmarks.landmark):
    landmark_x = min(int(landmark.x * image_width), image_width - 1)
    landmark_y = min(int(landmark.y * image_height), image_height - 1)

    landmark_point = [np.array((landmark_x, landmark_y))]

    landmark_array = np.append(landmark_array, landmark_point, axis=0)

  x, y, w, h = cv.boundingRect(landmark_array)

def calc_landmark_list(image, landmarks):
  image_width, image_height = image.shape[1], image.shape[0]

  landmark_point = []

  # キーポイント
  for _, landmark in enumerate(landmarks.landmark):
    landmark_x = min(int(landmark.x * image_width), image_width - 1)
    landmark_y = min(int(landmark.y * image_height), image_height - 1)
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

def pre_process_point_history(image, point_history):
  image_width, image_height = image.shape[1], image.shape[0]

  temp_point_history = copy.deepcopy(point_history)

  # 相対座標に変換
  base_x, base_y = 0, 0
  for index, point in enumerate(temp_point_history):
    if index == 0:
      base_x, base_y = point[0], point[1]

    temp_point_history[index][0] = (temp_point_history[index][0] -
                                    base_x) / image_width
    temp_point_history[index][1] = (temp_point_history[index][1] -
                                    base_y) / image_height

  # 1次元リストに変換
  temp_point_history = list(
    itertools.chain.from_iterable(temp_point_history))

  return temp_point_history


def logging_csv(number, mode, landmark_list, point_history_list):
  if mode == 0:
    pass
  if mode == 1 and (0 <= number <= 9):
    csv_path = 'model/keypoint_classifier/keypoint.csv'
    with open(csv_path, 'a', newline="") as f:
      writer = csv.writer(f)
      writer.writerow([number, *landmark_list])
  if mode == 2 and (0 <= number <= 9):
    csv_path = 'model/point_history_classifier/point_history.csv'
    with open(csv_path, 'a', newline="") as f:
      writer = csv.writer(f)
      writer.writerow([number, *point_history_list])
  return


def select_mode(key, mode):
  number = -1
  if 48 <= key <= 57:  # 0 ~ 9
    number = key - 48
  if key == 110:  # n
    mode = 0
  if key == 107:  # k
    mode = 1
  if key == 104:  # h
    mode = 2
  return number, mode

if __name__ == '__main__':
    main()
