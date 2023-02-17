'''
pip install pyttsx3
텍스트를 음성으로 출력
'''
import pyttsx3
s = pyttsx3.init()
data = "안녕하세요"
s.say(data)
s.runAndWait()