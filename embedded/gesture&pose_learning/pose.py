import cv2
import mediapipe as mp
from model.point_history_classifier.point_history_classifier import PointHistoryClassifier
import numpy as np
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

# For webcam input:
cap = cv2.VideoCapture(0)
with mp_pose.Pose(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as pose:
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
    results = pose.process(image)

    # Draw the pose annotation on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    poselandmarks = results.pose_landmarks
    print(poselandmarks.landmark)

    # for _, landmark in enumerate(results.pose_landmarks.landmark):
    #   print(landmark)
    #   landmark_x = min(int(landmark.x), 80 - 1)
    #   landmark_y = min(int(landmark.y), 80 - 1)
    #
    #   landmark_point = [np.array((landmark_x, landmark_y))]

      # landmark_array = np.append(landmark_array, landmark_point, axis=0)


    mp_drawing.draw_landmarks(
        image,
        results.pose_landmarks,
        mp_pose.POSE_CONNECTIONS,
        landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
    # Flip the image horizontally for a selfie-view display.
    cv2.imshow('MediaPipe Pose', cv2.flip(image, 1))
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()