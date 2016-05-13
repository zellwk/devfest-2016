#!/usr/bin/env sh
# http://www.ryanburnette.com/blog/2015/deploy-to-another-branch.html
# git add dist -f
# git commit -m "deploy"
# git push origin `git subtree split --prefix dist master`:production --force
# git reset HEAD~1 --hard

REV=`git rev-parse HEAD`
git checkout ghpages
find . -and -not -path "./.git*" -and -not -path "./node_modules*" -and -not -path "./src*" -and -not -path "./dev*" -and -not -path "./dist*" |  xargs git rm -rf --ignore-unmatch
mv dist/* . && rm -rf dist # might to be changed if you have hidden files
git add .
git add -u
git commit -m "deployed $REV"
git push --all
git checkout master