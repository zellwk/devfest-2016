#!/usr/bin/env sh
set -e
git stash save
gulp --prod
REV=`git rev-parse HEAD`
git checkout gh-pages
git rm -rf .
git checkout master -- .gitignore
mv dist/* . && rm -rf dist # might to be changed if you have hidden files
git add .
git commit -m "deployed $REV"
git push --all
git checkout master
git stash pop