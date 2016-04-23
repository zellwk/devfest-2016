#!/usr/bin/env sh
# http://www.ryanburnette.com/blog/2015/deploy-to-another-branch.html
# git add dist -f
# git commit -m "deploy"
# git push origin `git subtree split --prefix dist master`:production --force
# git reset HEAD~1 --hard

REV=`git rev-parse HEAD`
git checkout production
mv dist/* . && rm -rf dist # might to be changed if you have hidden files
git add .
git add -u
git commit -m "deployed $REV"
git push --all
git checkout master