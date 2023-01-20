import cv2
import face_recognition as fr

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# load your image
person = fr.load_image_file('./p5.jpg')
name = "hakjun lee"

# encoded the loaded image into a feature vector
top, right, bottom, left = fr.face_locations(person)[0]
face_img = person[top:bottom, left:right]
image_to_be_matched_encoded = fr.face_encodings(face_img)

# open webcam
webcam = cv2.VideoCapture(cv2.CAP_DSHOW + 0)
if not webcam.isOpened():
    print("Could not open webcam")
    exit()

# loop through frames
while webcam.isOpened():

    # read frame from webcam
    status, frame = webcam.read()
    if not status:
        print("Could not read frame")
        exit()
    frame = cv2.flip(frame, 1)
    # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    # if type(face_cascade.detectMultiScale(gray, 1.3, 5)) is not tuple:
    try:
        top, right, bottom, left = fr.face_locations(frame)[0] # HoG 기반 얼굴 검출기
        # face_locations = fr.face_locations(frame, number_of_times_to_upsample=0, model="cnn")  # CNN 기반 얼굴 검출기

        # You can access the actual face itself like this:
        face_image = frame[top:bottom, left:right]
        face_encoded = fr.face_encodings(face_image)
        dist = fr.face_distance(image_to_be_matched_encoded, face_encoded[0])
        # print(dist)

        # if result[0] == True:
        if dist < 0.3:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            print(name)
            # Y = top - 10 if top - 10 > 10 else top + 10
            # text = name
            # cv2.putText(frame, text, (left, Y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
    except:
        pass

    # display output
    cv2.imshow("detect me", frame)

    # press "Q" to stop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# release resources
webcam.release()
cv2.destroyAllWindows()