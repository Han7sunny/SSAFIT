FROM openjdk:11-jdk
VOLUME /tmp
EXPOSE 8080

# JAR_FILE 변수명에 build/libs 안의 jar 파일 할당
#ARG JAR_FILE=./build/libs/*.jar
ARG JAR_FILE=./build/libs/ssafit-0.0.1-SNAPSHOT.jar

# 변수에 저장된 것을 컨테이너 실행시 이름을 app.jar파일로 변경하여 컨테이너에 저장
COPY ${JAR_FILE} app.jar
# 빌드된 이미지가 run될 때 실행할 명령어
ENTRYPOINT ["java","-jar","app.jar"]