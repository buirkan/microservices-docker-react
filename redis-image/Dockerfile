# Use an existing docker image as a base
FROM alpine

# Download and install deps
RUN apk add --update redis

# What to do when it starts as a container
CMD ["redis-server"]