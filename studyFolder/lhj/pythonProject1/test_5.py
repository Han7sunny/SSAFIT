import cv2, os
import face_recognition as fr

# print(os.getcwd())
path = os.getcwd()+'/picture/'
os.chdir(path) # 해당 폴더로 이동
files = os.listdir(path)
print(files)


# open webcam
webcam = cv2.VideoCapture(0)

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

    # display output
    cv2.imshow("detect me", frame)

    # press "Q" to stop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        if is_login:
          is_login = False
        break

# release resources
webcam.release()
cv2.destroyAllWindows()