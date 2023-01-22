import cv2, os
import face_recognition as fr

# print(os.getcwd())
path = os.getcwd()+'/picture/'
os.chdir(path) # 해당 폴더로 이동
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

# open webcam
webcam = cv2.VideoCapture(cv2.CAP_DSHOW + 0)

if not webcam.isOpened():
    print("Could not open webcam")
    exit()

is_login = False
find_face_start = False

while True:
    # read frame from webcam
    status, frame = webcam.read()
    if not status:
        print("Could not read frame")
        exit()

    if not is_login:
        if cv2.waitKey(1) & 0xFF == ord('l'):
            find_face_start = True
            print('find')

        if find_face_start:
            try:
                top, right, bottom, left = fr.face_locations(frame, number_of_times_to_upsample=0)[0]  # CNN 기반 얼굴 검출기
                face_img = frame[top:bottom, left:right]
                face_encoded = fr.face_encodings(face_img)
                # print(face_encoded[0])
                for idx, enc_face in enumerate(enc_face_lists):
                    # print(idx)
                    # result = fr.compare_faces(enc_face, face_encoded, 1)
                    dist = fr.face_distance(enc_face[0], face_encoded)
                    print(idx, dist)

                    if dist < 0.35:
                        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                        Y = top - 10 if top - 10 > 10 else top + 10
                        name = person_names[idx]
                        text = name
                        cv2.putText(frame, text, (left, Y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                        find_face_start = False
                        is_login = True
                        print(name + '님이 로그인하셨습니다.')
                        break
            except:
                pass

    # display output
    cv2.imshow("detect me", frame)

    # press "Q" to stop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        if is_login:
          is_login = False
          print(name + '님이 로그아웃하셨습니다.')
        break

# release resources
webcam.release()
cv2.destroyAllWindows()