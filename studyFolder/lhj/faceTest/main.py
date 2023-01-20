import cv2, os
import face_recognition as fr
from IPython.display import Image, display
from matplotlib import pyplot as plt

plt.rcParams['figure.figsize'] = (2, 2)
cam = cv2.VideoCapture(cv2.CAP_DSHOW + 0)

person_lists = []
for i in range(1,6):
  person_lists.append(fr.load_image_file('./p' + str(i) + '.jpg'))

face_lists = []
for person in person_lists:
  top, right, bottom, left = fr.face_locations(person)[0]
  face_img = person[top:bottom, left:right]
  face_lists.append(face_img)

person = fr.load_image_file('./p1.jpg')
print(person.dtype)

top, right, bottom, left = fr.face_locations(person)[0]
face_img = person[top:bottom, left:right]

enc_unknown_face = fr.face_encodings(face_img)

for face in face_lists:
  enc_face = fr.face_encodings(face)

  dist = fr.face_distance(enc_face, enc_unknown_face[0])

  plt.title("dist: " + str(dist))
  plt.imshow(face)
  plt.show()