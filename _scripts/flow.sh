#!/usr/bin/env sh

# Clean old build
rm -Rf _jsbuild/**

# Enter into js source folder
cd _js 

# Run flow
../node_modules/.bin/flow 

# Remove flow types
../node_modules/.bin/flow-remove-types ../_js/ -d ../_jsbuild/ -i flow-typed/ --pretty