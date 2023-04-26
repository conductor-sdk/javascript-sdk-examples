FROM node:19

ARG KEY
ARG SECRET
ARG CONDUCTOR_SERVER_URL
ENV KEY=${KEY}
ENV SECRET=${SECRET}
ENV CONDUCTOR_SERVER_URL=${CONDUCTOR_SERVER_URL}

COPY package*.json /app/
COPY src/ /app/
WORKDIR /app
RUN npm install --only=production
COPY . .

CMD ["node", "main.js"]
