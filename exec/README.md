# 🚀 A501 DOROLAW 프로젝트

## 📋 1. Gitlab 소스 클론 이후 빌드 및 배포 문서

### 🔧 개발 환경

#### 🧩 시스템 구성 요소
- **프론트엔드**: React 기반 웹 애플리케이션
- **백엔드**: Spring Boot REST API 서버
- **AI**: 과실 비율 분석 서버
- **Nginx**: 리버스 프록시, 포워드 프록시, HTTPS 설정
- **MySQL**: RDB 데이터 CRUD
- **RabbitMQ**: AI 분석 처리 비동기 논블로킹 처리
- **Prometheus**, **cAdvisor**, **Node-exporter**: 컨테이너 메트릭 데이터 수집
- **Grafana**: 컨테이너 메트릭 데이터 시각화

#### 사용 기술 스택 및 버전
- **JVM**: Amazon Corretto 17 (로컬), amazoncorretto:17 (Docker)
- **웹서버**: 
  - React + Nginx (프론트엔드)
  - nginx/1.27.4 (리버스 프록시)
- **WAS**: Spring Boot 내장 Tomcat
- **IDE**:
  - Visual Studio Code 1.97
  - IntelliJ Ultimate 2024.3.3
- **빌드 도구**:
  - 프론트엔드: Vite 
  - 백엔드: Gradle 8.13
- **프레임워크 및 주요 라이브러리**:
  - Spring Boot 3.4.2
  - React 19
- **데이터베이스**: MySQL 8.0.41
- **OS**: Ubuntu
- **RabbitMQ**: RabbitMQ 4.0.7
- **Prometheus**: Prometheus 3.3.0
- **Grafana**: Grafana 11.6.0



### 🔑 빌드 시 사용되는 환경 변수
#### 백엔드(Spring Boot)
`application.yml`
```
# 서버 설정
server:
  servlet:
    session:
      timeout: 30m
  port: 8080 # 백엔드 포트

# 로깅 설정
logging:
  level:
    org.hibernate.SQL: DEBUG # SQL 쿼리 로깅
    org.hibernate.orm.jdbc.bind: TRACE # SQL 파라미터 로깅
    org.springframework.boot.autoconfigure.logging: ERROR # 스프링 부트 자동설정 로깅

spring:
  application:
    name: dorolaw

  # mysql 설정
  datasource:
    url: jdbc:mysql://{{배포도메인}}:3306/dorolaw?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul
    username: {{db아이디}}
    password: {{비밀번호}}
    driver-class-name: com.mysql.cj.jdbc.Driver

  # jpa 설정
  jpa:
    hibernate:
      ddl-auto: update  # 테이블 없는 경우 자동 생성
      jdbc:
        time_zone: Asia/Seoul
    show-sql: true # 실행되는 sql문 출력
	
	jackson:
    time-zone: Asia/Seoul
	
	
  # 카카오 소셜 로그인 설정
  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: {{카카오 id}}
            client-secret: {{카카오 secreteId(선택)}}
            client-authentication-method: client_secret_post
            redirect-uri: "https://{{도메인}}/api/login/oauth2/code/{registrationId}"
            authorization-grant-type: authorization_code
            scope: profile_image, account_email, name, phone_number
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id

  # Local Cache 설정
  cache:
    type: simple

  # 얼로드 가능한 최대 영상 메모리
  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB

  # RabbitMQ
  rabbitmq:
    host: rabbitmq
    port: 5672
    username: guest
    password: guest
    connection-timeout: 10000
    template:
      retry:
        enabled: true
        initial-interval: 1000
        max-attempts: 5
        multiplier: 1.0

  # cors 설정
  main:
    allow-bean-definition-overriding: true

# JWT 설정
jwt:
  secret: jwtsecretkeyajwtsecretkeybjwtsecretkeycjwtsecretkeydjwtsecretkeye
  expiration: 86400000  # 만료시간

# 카카오페이 설정
kakaoPay:
  secretKey: DEV0F58DA8968BA95F18CF27A7A5124A7E959CC7

# CORS 설정
cors:
  allowed-origins: http://localhost:5173,http://localhost:3000,http://localhost:5000,https://{{도메인}},https://{{배포 도메인}}/ai
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS,PATCH,HEAD
  allowed-headers: Authorization,Content-Type,X-Requested-With,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-Auth-Token,X-XSRF-TOKEN,Cache-Control,Pragma,X-Frame-Options,X-Content-Type-Options,Strict-Transport-Security,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Max-Age,Access-Control-Expose-Headers,Access-Control-Allow-Credentials,X-Custom-Header,Referer,User-Agent

# EC2 영상 경로
file:
  uploadDir: {{ec2내 영상 저장 경로}}

# 디버깅
debug: true

# 프론트 로그인 리다이렉트
app:
  frontend:
    url: https://{{배포 도메인}}	
```

`firebase-service-account.json`
```
{
  "type": "service_account",
  "project_id": {{구글클라우드 프로젝트id}},
  "private_key_id": {{구글클라우드 key id}},
  "private_key": {{구글클라우드 private key}},
  "client_email": {{구글클라우드 email}},
  "client_id": {{구글클라우드 client id}},
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40myproject-e9c73.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```



#### 프론트엔드(React)

`.env` 
```
VITE_API_URL = https://{{배포 도메인}}/api
VITE_API_LOCAL_URL = http://localhost:8080/api

VITE_KAKAO_REDIRECT_URI = https://j12a501.p.ssafy.io/api/oauth2/authorization/kakao
VITE_KAKAO_LOCAL_REDIRECT_URI = http://localhost:8080/oauth2/authorization/kakao

# Firebase configuration
VITE_FIREBASE_API_KEY={{구글클라우드 앱 API_KEY}}
VITE_FIREBASE_AUTH_DOMAIN={{{{구글클라우드 앱 AUTH_DOMAIN}}
VITE_FIREBASE_PROJECT_ID={{구글클라우드 앱 PROJECT_ID}}
VITE_FIREBASE_STORAGE_BUCKET={{구글클라우드 앱 STORAGE_BUCKET}}
VITE_FIREBASE_MESSAGING_SENDER_ID={{구글클라우드 앱 MESSAGING_SENDER_ID}}
VITE_FIREBASE_APP_ID={{구글클라우드 앱 APP_ID}}
VITE_FIREBASE_MEASUREMENT_ID={{구글클라우드 앱 MEASUREMENT_ID}}
VITE_FIREBASE_VAPID_KEY={{구글클라우드 앱 VAPID_KEY}}
```



### 🚢 빌드 및 배포 방법

#### Jenkins CI/CD 구성
- Jenkins 서버 접근 포트: 8080
- 배포 과정:
  1. Jenkins credentials에서 Gitlab 토큰값 로딩
  2. SSH 공개 키를 이용하여 서버 접속
  3. 최신 코드 pull
  4. 기존 컨테이너 중지: `docker-compose down`
  5. 캐시 없이 빌드: `docker-compose build --no-cache`
  6. 컨테이너 실행: `docker-compose up -d`

### 🐳 Docker 구성
- `docker-compose.yml`로 관리되는 9개의 컨테이너:
  1. `frontend`: React + Nginx (포트: 3000)
  2. `backend`: Spring Boot (포트: 8080)
  3. `ai`: 임베디드 시스템 서버 (포트: 5000)
  4. `nginx`: 리버스 프록시 서버 (포트: 80, 443)
  5. `rabbitmq`: 메세지 큐 (포트: 5672, 15672)
  5. `prometheus` 메트릭 데이터 종합 수집 서버 (포트: 9090)
  6. `cAdvisor`: docker 컨테이너 메트릭 데이터 수집 서버 (포트: 8080)
  7. `Node Exporter`: EC2 메트릭 데이터 수집 서버 (포트: 9100)
  8. `grafana`: 메트릭 데이터 시각화 서버 (포트: 3000)
  

### 🔄 Nginx 설정 (리버스 프록시)
- HTTPS 리다이렉션 및 SSL 설정
- Let's Encrypt SSL 인증서 사용
- 요청 제한(rate limiting) 구성:
  - 일반 접근: 30 요청/분 (burst=30)
  - API 접근: 60 요청/분 (burst=20)
  - 스트림 접근: 5 요청/분 (burst=5)
- 주요 프록시 경로:



### ⚠️ 배포 시 특이사항

#### 인프라 
1. port가 열려 있어야 함
  - 22(ssh) 
  - 80(http) 
  - 443(https)
  - 3306(MySQL)
  - 8080(Jenkins)

2. MySQL 설치 필요

3. SSL 설정

   * /nginx/ssl/fullchain.pem
   * /nginx/ssl/privkey.pem

   

#### 백엔드
1. 구글 클라우드 애플리케이션 생성 필요
2. 카카오 애플리케이션 생성 필요
4. backend/src/main/resources에 application.yml 위치 및 값 작성 필요 (`{{}}` 표시된 값만 수정하면 됨)
5. backend/src/main/resources에 `firebase-service-account.json`위치 및 값 작성 필요 (`{{}}` 표시된 값만 수정하면 됨)



#### 프론트엔드

1. frontend에 `.env` 파일 위치 및 값 작성 필요



#### AI

1. 이미지 파일(ai_image.tar, 16GB) 다운로드 후 이미지 로드 필요
	- docker load -i ai_image.tar



### 📦 프로젝트 종속성

#### 백엔드 종속성
```
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.4.3'
    id 'io.spring.dependency-management' version '1.1.7'
}

group = 'com.dorolaw'
version = '0.0.1-SNAPSHOT'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot 기본 스타터
    implementation 'org.springframework.boot:spring-boot-starter'

    // Lombok
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    // rest api
    implementation 'org.springframework.boot:spring-boot-starter-web'

    // 인증, 인가
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'

    // JWT
    implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'

    // MySQL Connector
    runtimeOnly 'mysql:mysql-connector-java:8.0.33'

    // JPA
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

    // Local Cache
    implementation 'org.springframework.boot:spring-boot-starter-cache'
    implementation 'com.github.ben-manes.caffeine:caffeine:2.9.1'

    // firebase Admin SDK
    implementation 'com.google.firebase:firebase-admin:9.1.1'

    // 테스트
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

    // 템플릿 엔진 (선택사항 - Thymeleaf)
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'

    // RabbitMQ
    implementation 'org.springframework.boot:spring-boot-starter-amqp'
}

tasks.named('test') {
    useJUnitPlatform()
}
```



#### 프론트 종속성

`package.json`
```
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@eslint/compat": "^1.2.7",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-slot": "^1.1.2",
    "@tanstack/react-query": "^5.69.0",
    "@tanstack/react-query-devtools": "^5.69.0",
    "axios": "^1.8.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "firebase": "^11.6.0",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.483.0",
    "react": "^19.0.0",
    "react-calendar": "^5.1.0",
    "react-day-picker": "^8.10.1",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.4.0",
    "tailwind-merge": "^3.1.0",
    "tailwindcss-animate": "^1.0.7",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.23.0",
    "@tanstack/eslint-plugin-query": "^5.68.0",
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^22.13.11",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.23.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.3",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "eslint-plugin-tailwindcss": "^3.18.0",
    "globals": "^15.15.0",
    "postcss": "^8.5.3",
    "prettier": "^3.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.27.0",
    "vite": "^6.2.0"
  }
}
```



## 🔌 2. 프로젝트에서 사용하는 외부 서비스 정보

- 카카오
- FCM(구글 클라우드)



## 💾 3. DB 초기화 및 데이터 관리

### 🗄️ 초기 데이터 생성
실행하면 자동 생성됨

### 📝 주요 계정 및 프로퍼티 파일
DB 계정 생성하고 application.yml에 반영 필요