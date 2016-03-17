# Cinema fu

[![Build Status](https://travis-ci.org/macaco-maluco/cinema-fu.svg)](https://travis-ci.org/macaco-maluco/cinema-fu)

The connection between movies and stars.

## Running

Cinema fu is a [Node.js](http://nodejs.org/) application that is distributed via [Docker](https://hub.docker.com/). To run it, all you need is Docker:

```bash
docker run -p 8080:80 macacomaluco/cinema-fu:latest
```

## Development

```bash
docker-compose up
```

To run it you will need a [themoviedb](https://www.themoviedb.org/) API Key as an environment variable `TMDB_API_KEY`.
