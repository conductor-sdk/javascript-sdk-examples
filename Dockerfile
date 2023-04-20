FROM node:19

ENV KEY=""
ENV SECRET=""
ENV CONDUCTOR_SERVER_URL="https://play.orkes.io/api"

COPY package*.json /app/
COPY src/ /app/
WORKDIR /app
RUN npm install --only=production
COPY . .

CMD ["node", "main.js"]
