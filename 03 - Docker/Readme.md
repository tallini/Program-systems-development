# Practice 03

## Introduction

This practice is about virtualization and Docker. This folder contains a Dockerfile that is an example for starting writing your own Docker image and it helps you to create your first Docker container.

## About the Dockerfile

```FROM``` - the image is initiated from a pre-created image (in this case, it is Ubuntu 18.04)
```RUN``` - the Linux commands after ```RUN``` statements are executed while creating the images
```CMD``` - only one ```CMD``` statement can be in a Dockerfile. It needs a Linux command as well, but this command is executed only, when you start a container instance from your existing Docker image.

## Building the Dockerfile

In order to create an image from the Dockerfile, you should run the following command. Docker basically tries to find a file named ```Dockerfile```. If you rename the file or you have another docker file, you will need to use the ```--file``` option in the following command.

```sh
$ docker build -t my-first-image .
```

- After the ```-t``` option you can specify the name of the image.
- The ```.``` at the end of the command is necessary, because it denotes the context (in this case, it is the folder that you are in).


## Create a running container instance

From the created image, you can create a container instance wit the following command.

```sh
$ docker run -itd my-first-image
```

- ```-i``` option is for making the container interactive (in order to connect to it later via Terminal)
- ```-t``` option is for attaching a Pseudo terminal (TTY) to the container (in order to connect to it later via Terminal)
- ```d``` option is for running the container in the background (in this case, the current terminal can be used for running other processes)

### Author
Zoltán R. Jánki (jankiz@inf.u-szeged.hu)

