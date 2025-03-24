# Amazon Corretto 17 slim 버전 사용
FROM amazoncorretto:17-alpine

# app working direc 만들기 
WORKDIR /app

# Docker 빌드 캐시 활용을 위해 3가지만 먼저 복사함.
COPY gradlew settings.gradle build.gradle ./
COPY gradle/ gradle/

# 결과적으로 소스 코드가 변경될 때만 copy 실행됨.
COPY . .

RUN chmod +x gradlew

# docker에서 demon 모드 없이 진행하기 위해 -no-daemon 적용
# 도커는 독립적인 빌드를 사용하기 위함. + 따라서 clean 도 진행함.
RUN ./gradlew --no-daemon clean build -x test

EXPOSE 8080

# jar 파일 실행
CMD ["java", "-jar", "build/libs/dorolaw-0.0.1-SNAPSHOT.jar"]
