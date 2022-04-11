FROM nginx
MAINTAINER zhooke

EXPOSE 8081
#RUN rm /etc/nginx/conf.d/default.conf
#RUN rm /etc/nginx/nginx.conf

COPY dist/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/
RUN echo "Asia/Shanghai" > /etc/timezone
# 使用daemon off的方式将nginx运行在前台保证镜像不至于退出
CMD ["nginx", "-g", "daemon off;"]