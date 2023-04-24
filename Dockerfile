FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install --force --production
CMD ["npm", "start"]