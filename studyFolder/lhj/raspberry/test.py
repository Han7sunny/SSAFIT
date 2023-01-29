import cv2
def main():
    capture = cv2.VideoCapture(0)
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while cv2.waitKey(10) < 0:
        ret, frame = capture.read()
        if not ret:
            print("Could not read frame")
            exit()
        cv2.imshow("Chap2_camera", frame)

    capture.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()