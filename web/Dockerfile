FROM ubuntu

# install our dependencies and node
RUN apt-get update && \
	apt-get install -y curl && \
	curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
	apt-get install -y python build-essential  nodejs


# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

#install node modules global dependencies
RUN npm install -g babel-cli

EXPOSE 8080

CMD ["npm", "start"]
