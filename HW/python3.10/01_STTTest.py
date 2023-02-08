'''
pip install PyAudio SpeechRecognition
마이크를 통해 음성을 인식하여 텍스트로 변환
'''
import speech_recognition as sr

r = sr.Recognizer()
with sr.Microphone() as source:
    print("Say something! : ")
    audio = r.listen(source, phrase_time_limit=3)
text = r.recognize_google(audio, language='ko-KR')
print(text)