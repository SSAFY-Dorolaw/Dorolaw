FROM nginx:alpine

# 기본 nginx 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# SSL 인증서 복사
RUN mkdir -p /etc/nginx/ssl
COPY ssl/fullchain.pem /etc/nginx/ssl/
COPY ssl/privkey.pem /etc/nginx/ssl/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
