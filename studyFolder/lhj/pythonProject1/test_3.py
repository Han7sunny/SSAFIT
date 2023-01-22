import cv2, os, threading, pyttsx3
import face_recognition as fr
import speech_recognition as sr

is_login = False
name = None
find_member_start = False

def speech():
    global find_member_start
    while True:
        try:
            s = pyttsx3.init()
            r = sr.Recognizer()
            with sr.Microphone() as source:
                print("Say something! : ")
                audio = r.listen(source)
            text = r.recognize_google(audio, language='ko-KR')
            print(text)
            if text == '로그인':
                find_member_start = True
            else:
                s.say(text)

        except:
            pass
        finally:
            s.runAndWait()

def findMember():
    global is_login, name
    while True:
        status, frame = webcam.read()
        try:
            s = pyttsx3.init()
            top, right, bottom, left = fr.face_locations(frame, number_of_times_to_upsample=0)[0]  # CNN 기반 얼굴 검출기
            face_img = frame[top:bottom, left:right]
            face_encoded = fr.face_encodings(face_img)
            for idx, enc_face in enumerate(enc_face_lists):
                dist = fr.face_distance(enc_face[0], face_encoded)
                print(idx, dist)

                if dist < 0.35:
                    name = person_names[idx]
                    is_login = True
                    print(name + '님이 로그인하셨습니다.')
                    s.say(name + '님이 로그인하셨습니다.')
                    s.runAndWait()
                    return
        except:
            pass



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

t2 = threading.Thread(target=speech)
t2.start()

# open webcam
webcam = cv2.VideoCapture(cv2.CAP_DSHOW + 0)

if not webcam.isOpened():
    print("Could not open webcam")
    exit()


while True:
    # read frame from webcam
    status, frame = webcam.read()
    if not status:
        print("Could not read frame")
        exit()

    if not is_login:
        if cv2.waitKey(1) & 0xFF == ord('l'):
            find_member_start = True

    if find_member_start:
        print('find')
        t1 = threading.Thread(target=findMember)
        t1.start()
        find_member_start = False

    # display output
    cv2.imshow("detect me", frame)

    if cv2.waitKey(1) & 0xFF == ord('x'):
        if is_login:
          is_login = False
          print(name + '님이 로그아웃하셨습니다.')

    # press "Q" to stop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        if is_login:
          is_login = False
          print(name + '님이 로그아웃하셨습니다.')
        break

# release resources
webcam.release()
cv2.destroyAllWindows()