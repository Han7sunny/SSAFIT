import cv2, os, threading, pyttsx3
import mediapipe as mp
import numpy as np
import face_recognition as fr
import speech_recognition as sr
from tensorflow.keras.models import load_model

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

def gesture():
    while True:
        ret, img = cap.read()
        img = cv2.flip(img, 1)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = hands.process(img)
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        if result.multi_hand_landmarks is not None:
            for res in result.multi_hand_landmarks:
                after[0] = result.multi_hand_landmarks[0].landmark[8].x
                after[1] = result.multi_hand_landmarks[0].landmark[8].y
                joint = np.zeros((21, 4))
                for j, lm in enumerate(res.landmark):
                    joint[j] = [lm.x, lm.y, lm.z, lm.visibility]

                # Compute angles between joints
                v1 = joint[[0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19], :3]  # Parent joint
                v2 = joint[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], :3]  # Child joint
                v = v2 - v1  # [20, 3]
                # Normalize v
                v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

                # Get angle using arcos of dot product
                angle = np.arccos(np.einsum('nt,nt->n',
                                            v[[0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18], :],
                                            v[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19], :]))  # [15,]

                angle = np.degrees(angle)  # Convert radian to degree
                d = np.concatenate([joint.flatten(), angle])
                seq.append(d)
                mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)

                if len(seq) < seq_length:
                    continue

                input_data = np.expand_dims(np.array(seq[-seq_length:], dtype=np.float32), axis=0)
                y_pred = model.predict(input_data).squeeze()  # print 있음
                i_pred = int(np.argmax(y_pred))
                conf = y_pred[i_pred]
                print(y_pred, conf)

                if conf >= 0.9:
                    action = actions[i_pred]
                    action_seq.append(action)

                    if len(action_seq) < 3:
                        continue

                    this_action = '?'
                    if action_seq[-1] == action_seq[-2] == action_seq[-3]:
                        this_action = action
                    text = ''
                    if this_action == 'move':
                        delta_x = after[0] - before[0]
                        delta_y = after[1] - before[1]
                        if abs(delta_x) > abs(delta_y):
                            if delta_x >= l:
                                text = 'right'
                            elif delta_x <= -l:
                                text = 'left'
                        elif abs(delta_y) > abs(delta_x):
                            if delta_y <= -l:
                                text = 'up'
                            elif delta_y >= l:
                                text = 'down'
                    cv2.putText(img, ('move - ' + f'{text.upper()}') if this_action == 'move' else f'{this_action.upper()}',
                                org=(20, 30),
                                fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(255, 255, 255), thickness=2)
                before[0] = after[0]
                before[1] = after[1]
        cv2.imshow("gesture", img)
        cv2.waitKey(1)
        if event_gesture.is_set():
            return

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Could not open webcam")
    exit()

is_login = False
name = None
find_member_start = False
using_gesture = False
event_gesture = threading.Event()
before = [0] * 2
after = [0] * 2
l = 0.01

actions = ['select', 'close', 'move']
seq_length = 30

model = load_model('models/model.h5')

# MediaPipe hands model
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    max_num_hands=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

seq = []
action_seq = []

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
    img = cv2.flip(img, 1)

    if not ret:
        print("Could not read frame")
        exit()

    if cv2.waitKey(1) & 0xFF == ord('g'):
        if using_gesture:
            using_gesture = False
            event_gesture.set()
        else:
            using_gesture = True
            t3 = threading.Thread(target=gesture)
            t3.start()

    if not is_login:
        if cv2.waitKey(1) & 0xFF == ord('l'):
            find_member_start = True

    if find_member_start:
        print('find')
        t1 = threading.Thread(target=findMember)
        t1.start()
        find_member_start = False

    # display output
    cv2.imshow("detect me", img)

    if cv2.waitKey(1) & 0xFF == ord('x'):
        if is_login:
            is_login = False
            print(name + '님이 로그아웃 하셨습니다.')

    # press "Q" to stop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        if is_login:
            is_login = False
            print(name + '님이 로그아웃 하셨습니다.')
        break

cap.release()
cv2.destroyAllWindows()