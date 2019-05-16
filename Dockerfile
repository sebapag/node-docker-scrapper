FROM node:8

RUN apt-get update -y
RUN apt-get install -y xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi \
    xfonts-scalable xfonts-cyrillic x11-apps clang libdbus-1-dev \
    libgtk2.0-dev libnotify-dev libgnome-keyring-dev libgconf2-dev \
    libasound2-dev libcap-dev libcups2-dev libxtst-dev libxss1 \
    libnss3-dev gcc-multilib g++-multilib

#COPY ./xvfbd /usr/local/bin
#RUN chmod 755 /usr/local/bin/xvfbd

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# EXPOSE 8080

# System variables, url with default value
ENV url "https://www.myawesomeurltoscrap.it/"

#
# CMD [ "node" ,"getPrices.js"]
ENTRYPOINT xvfb-run --server-args="-screen 9 1280x2000x24" npm start
