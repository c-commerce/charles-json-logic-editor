#!/usr/bin/env sh
# abort on errors
set -e
# # build
NODE_ENV=production npm run build:page
# # navigate into the build output directory
cd dist

git init
git add -A
git branch -M main
git commit -m 'deploy'

git branch -M gh-pages

git push -f git@github.com:c-commerce/charles-json-logic-editor.git gh-pages
cd -