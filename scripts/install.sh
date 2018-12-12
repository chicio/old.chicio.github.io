#!/usr/bin/env sh

# Install gulp cli
npm install --global gulp-cli@2.0.1

# Init pages-gem submodule
git submodule update --init

# Install/Update core utils to use docker startup github-pages function
brew install coreutils

# Clean old docker images
docker images -a | grep "gh-pages" | awk '{print $3}' | xargs docker rmi
docker images -a | grep "ruby" | awk '{print $3}' | xargs docker rmi

# Create github pages docker image
cd pages-gem
make image
