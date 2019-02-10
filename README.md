# is-cmu
Checks if the given input is CMU, whether the input is image, text, or speech.
More info can be found at [Devpost](https://devpost.com/software/is-cmu) 
Only supported on Mac.

## Installation

```shell
$ git clone https://github.com/ishantheperson/is-cmu.git
$ cd is-cmu
$ npm install
$ brew install ffmpeg
$ npm start
```

Created at CMU during TartanHacks 2019.

## Inspiration
This project was inspired by the npm library [is-thirteen](https://github.com/jezen/is-thirteen)

## What it does
Processes any type of input (image, speech, text) and determines whether it is CMU.

## How we built it
Built on Node.js with image recognition through Google reverse image search and speech recognition through Microsoft Azure, as well as with socket.io in order to facilitate real time communication between the client and server.

## Challenges we ran into
Getting the correct output from speech to text, accounting for statement negation, as well as accounting for large variety in inputs. 

## Accomplishments that we're proud of
Implementing a large variety of input recognition in a short time, as well as displaying real-time status updates to the user. 

## What we learned
How to use Microsoft Azure for development, as well as more complex topics in asynchronity.. 

## What's next for is-cmu
Applications in detecting copyright infringement.

