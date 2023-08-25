FROM node:lts-alpine
USER node
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm config set audit=false fund=false progress=off
RUN [ -f package-lock.json ] && npm ci || npm install
COPY --chown=node:node . .
EXPOSE 5000
CMD [ "npm", "start" ]
