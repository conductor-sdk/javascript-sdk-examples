FROM node:19

COPY package.json /app/
COPY src/ /app/

WORKDIR /app

RUN npm install --only=production
COPY . .

CMD ["node", "main.js"]
