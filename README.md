# Seshat

Seshat - A Node.js scrapper

## Getting Started

Clone the repository then you can choose to run it with a standalone server or as a Docker container. 
Before running your project it is necessary to setup a MongoDB connection inside the .env file

## Run locally as Node.js server
If you want to locally run as a local node.js server open a terminal and then type 
```console
$ npm install 
```
After it 
```console
$ npm start 
```
## Run locally inside a Docker container
At first you need to add a local container via the command
```console
$ docker build -t "yourrepo/project" .  
```
After it you can run 
```console
$ docker run -e URL="https://www.myurltoscrap.com" yourrepo/project
```


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Cheerio](https://github.com/cheeriojs/cheerio) - JQuery for server 
* [Nightmare](https://github.com/segmentio/nightmare) - Browser automation library
* [Docker](https://www.docker.com/) - Enterprise container

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
