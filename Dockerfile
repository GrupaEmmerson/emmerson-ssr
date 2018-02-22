FROM carriera/docker-reactjs
MAINTAINER carriera
COPY . /app
WORKDIR /app
RUN npm install && npm run build
EXPOSE 80
