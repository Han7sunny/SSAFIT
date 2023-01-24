import pyttsx3
import speech_recognition as sr

r = sr.Recognizer()
s = pyttsx3.init()
with sr.Microphone() as source:
    print("Say something! : ")
    audio = r.listen(source)
text = r.recognize_google(audio, language='ko-KR')
print(text)
s.say(text)
s.runAndWait()