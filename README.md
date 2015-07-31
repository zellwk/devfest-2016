# Installation 

run these commands: 

1) `npm install`
2) `jspm install` (Using JSPM for JavaScript stuff)

# Usage 

run this command to watch for files and regenerate everything upon save: 

~~~
gulp 
~~~

Here are some files you might want to touch: 

1) `src/post/*` are for markdown posts that will be compiled into blogs. Eventual URL is based on permalink frontmatter. See files for more info
2) `src/pages/*` are for HTML pages. Eventual URL based on file name. See files for more info 
3) `scss/*` are for Sass stuff. 
4) `js/*` are for JS stuff. 
5) `src/_data.json` for global data
6) `src/_site.js` (is not in use yet)
7) `src/templates` are for Nunjuck tempaltes and other partials, fragments etc. 

# Production 

Not done yet :) 