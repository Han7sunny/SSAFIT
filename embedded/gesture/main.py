import cv2
import mediapipe as mp
import math
import numpy as np
import time
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

# 이미지 파일의 경우 사용:
IMAGE_FILES = []
mode_flag = ["normal","select", "quit", "move"]
state = "normal"
def cal_slope(x1, y1, x2, y2, x3, y3):
  vector1 = np.array([y1-y3, x1-x3])
  vector2 = np.array([y2-y3, x2-x3])

  phi = math.degrees(math.acos(np.dot(vector1,vector2)/(np.linalg.norm(vector1)*np.linalg.norm(vector2))))
  ang = math.degrees(math.acos(np.dot(-1*vector1,vector2)/(np.linalg.norm(vector1)*np.linalg.norm(vector2))))

  return phi

def cal_dis(x1, y1, x2, y2):
  distance = math.sqrt((x1-x2)**2 + (y1 - y2)**2)
  return distance

with mp_hands.Hands(
  static_image_mode=True,
  max_num_hands=1,
  min_detection_confidence=0.5) as hands:

  for idx, file in enumerate(IMAGE_FILES):
    # Read an image, flip it around y-axis for correct handedness output (see
    # above).
    # 이미지를 읽어 들이고, 보기 편하게  이미지를 좌우 반전
    image = cv2.flip(cv2.imread(file), 1)
    # Convert the BGR image to RGB before processing.
    # 작업 전에 BGR 이미지를 RGB 이미지로 변경
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    # Print handedness and draw hand landmarks on the image.


    # 손으로 프린트하고 이미지에 손 랜드마크를 그립니다.
    if not results.multi_hand_landmarks:
        continue
    image_height, image_width, _ = image.shape
    annotated_image = image.copy()

    for hand_landmarks in results.multi_hand_landmarks:
        print('hand_landmarks:', hand_landmarks)
        print(
          f'Index finger tip coordinates: (',
          f'{hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x * image_width}, '
          f'{hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y * image_height})'
        )
        mp_drawing.draw_landmarks(
          annotated_image,
          hand_landmarks,
          mp_hands.HAND_CONNECTIONS,
          mp_drawing_styles.get_default_hand_landmarks_style(),
          mp_drawing_styles.get_default_hand_connections_style())
    cv2.imwrite(
        '/tmp/annotated_image' + str(idx) + '.png', cv2.flip(annotated_image, 1))
    # Draw hand world landmarks.
    if not results.multi_hand_world_landmarks:
        continue
    for hand_world_landmarks in results.multi_hand_world_landmarks:
        mp_drawing.plot_landmarks(hand_world_landmarks, mp_hands.HAND_CONNECTIONS, azimuth=5)

# 웹캠일 경우 사용 :
cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
old_x = 0
old_y = 0
old_z = 0
new_x = 0
new_y = 0
new_z = 0
with mp_hands.Hands(
    model_complexity=0,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            # If loading a video, use 'break' instead of 'continue'.
            continue

        # To improve performance, optionally mark the image as not writeable to
        # pass by reference.
        image.flags.writeable = False
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(image)
        # Draw the hand annotations on the image.
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        if results.multi_hand_landmarks:

            for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
                new_x = hand_landmarks.landmark[8].x*10
                new_y = hand_landmarks.landmark[8].y*10
                new_z = hand_landmarks.landmark[8].z*100
                delta_x =  new_x - old_x
                delta_y = new_y - old_y
                delta_z = old_z - new_z


                slope1 =  cal_slope(hand_landmarks.landmark[7].x,hand_landmarks.landmark[7].y,\
                                 hand_landmarks.landmark[5].x,hand_landmarks.landmark[5].y, \
                                    hand_landmarks.landmark[6].x, hand_landmarks.landmark[6].y)
                # print(slope1)
                slope2 =  cal_slope(hand_landmarks.landmark[11].x,hand_landmarks.landmark[11].y,\
                                 hand_landmarks.landmark[9].x,hand_landmarks.landmark[9].y,\
                                    hand_landmarks.landmark[10].x, hand_landmarks.landmark[10].y)
                # print(slope2)
                slope3 =  cal_slope(hand_landmarks.landmark[15].x,hand_landmarks.landmark[15].y,\
                                 hand_landmarks.landmark[13].x,hand_landmarks.landmark[13].y,\
                                    hand_landmarks.landmark[14].x, hand_landmarks.landmark[14].y)
                # print(slope3)
                slope4 =  cal_slope(hand_landmarks.landmark[19].x,hand_landmarks.landmark[19].y,\
                                 hand_landmarks.landmark[17].x,hand_landmarks.landmark[17].y,\
                                    hand_landmarks.landmark[18].x, hand_landmarks.landmark[18].y)

                slope5 = cal_slope(hand_landmarks.landmark[8].x, hand_landmarks.landmark[8].y, \
                                   hand_landmarks.landmark[6].x, hand_landmarks.landmark[6].y, \
                                   hand_landmarks.landmark[7].x, hand_landmarks.landmark[7].y)
                print(slope5)
                if state != "quit" and slope1 > 170 and slope2 > 170 and slope3 > 170 and slope4 > 170 :
                  state = str(mode_flag[1])
                elif state != "select" and slope1 < 40 and slope2 < 40 and slope3 < 40 and slope4 < 40 :
                  state = str(mode_flag[2])
                elif slope5 > 170 and slope2 < 40 and slope3 < 40 and slope4 < 40 :
                  state = str(mode_flag[3])
                else :
                  state = str(mode_flag[0])




                if state == "move" :
                  print(delta_x,delta_y)
                  if abs(delta_x) > abs(delta_y) :
                    if delta_x <= -0.5 :
                      print("right")
                    elif delta_x >= 0.5 :
                      print("left")
                  if abs(delta_x) < abs(delta_y):
                    if delta_y <= -0.5:
                      print("up")
                    elif delta_y >= 0.5:
                      print("up")

                old_x = new_x
                old_y = new_y
                old_z = new_z
                mp_drawing.draw_landmarks(
                  image,
                  hand_landmarks,
                  mp_hands.HAND_CONNECTIONS,
                  mp_drawing_styles.get_default_hand_landmarks_style(),
                  mp_drawing_styles.get_default_hand_connections_style())
            # print(slope4)

          # Flip the image horizontally for a selfie-view display.



        cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))
        if cv2.waitKey(5) & 0xFF == 27:
            break
cap.release()
