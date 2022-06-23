# Tailstart Directory

This contain helpful informations for each files and folders that are present 
in Tailstart.

## Structure

By default, Tailstart directory initially looks as below:

```
.
├── src
│   ├── css
│   │   ├── input.css
│   │   └── style.css
│   └── js
│       └── app.js
├── .editorconfig
├── .gitattributes
├── .gitignore
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── 404.html
├── browserconfig.xml
├── changelog.md
├── documentation.md
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon.ico
├── humans.txt
├── icon.png
├── index.html
├── package-lock.json
├── package.json
├── readme.md
├── robots.txt
├── site.webmanifest
├── tailwind.config.js
├── tile.png
└── tile-wide.png
```

## SRC Folder

This folder contains project's CSSs, Javscript and asset related files. For
starter, it contains `css` and `js` directory. 

The name for `src` can be changed to conventional name for source file such as
`assets` and can be further customized according to your project's requirements.

Any asset related files can be included by creating new directories such as `img`
for image files and `fonts` for font files. 

### src/css

This directory should contain all your project's CSS files. For starter, it
contains below files: 

* `input.css` ─ TailwindCSS variable declaration.
* `style.css` ─ Rendered TailwindCSS variable outputs.

### src/js

This directory should contain all your project's Javscript files. For starter,
it contains below files: 

* `app.js` ─ Main Javascript source codes.

## HTML Pages

These are files that render the view for your site's page.

### index.html

This is the default HTML page for when the site is loaded. It contains the
skeleton code needed to get started with building a web page. You may use this
file as a template for creating other pages.

### 404.html

This is the default error page for when the site URL is not existed.

## Configuration Files

These are files which purposes are to provide settings for the project.

### .editorconfig

This file contains all settings for different editors and IDEs to maintain
consistent coding styles.

### robots.txt

This file contains configuration on how search engine will crawl the page.
Refer here for more informations: 
[Robots.txt](https://moz.com/learn/seo/robotstxt)

### .tailwind.config.js

This file contain properties related to TailwindCSS configurations. Refer here
for further customizations: 
[TailwindCSS Configuration](https://tailwindcss.com/docs/configuration)

### Git Files

These are Git related configuration files:

* `.gitattributes` ─ Track declared files to be pushed to git repository.
* `.gitignore` ─ Prevent declared files from being pushed to git repository.

### NPM Files

These are NPM related configuration file:

* `package-lock.json` ─ Contains record of installed package for nnpm registry.
* `package.json` ─ Contains project informations, scripts and dependancies.

## Favicons and Icons

These files are settings related with Favicon and Tile properties which can be 
replaced and customize accordingly. Standard favicon and icons that are loaded
by default consists as below:

* `favicon.ico`
* `favicon-16x16.png`
* `favicon-32x32.png`

### browserconfig.xml

This file contains custom tile settings for Edge Browser. Icons that are used
for the properties consists as below:

* `tile.png`
* `tile-wide.png`

### site.webmanifest

This file contains properties related to Progressive Web Application. Icons
that are used for the properties consists as below:

* `android-chrome-192x192.png`
* `android-chrome-512x512.png`

Refer here for more informations: 
[Web App Manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## Miscellaneous

These file are for documentation purposes and provide informations on the
project.

### CHANGELOG.md

This file contains notable changes for each version of a project. Refer here
for more informations: 
[Keep a Changlog](https://keepachangelog.com/en/1.0.0/)

### DIRECTORY.md

This file contains directory information of a project. It is what your are
reading right now.

### humans.txt

This file contains information of the team that worked on the project, and
technology stacks used. Refer here for more information:s 
[humanstxt.org](https://humanstxt.org/)

### LICENSE

This file contains license information of the project. More templates for
license can be found here: [Choose a Licesnes](https://choosealicense.com/)

### README.md

This file contains main information of your project. Refer here for more
informations:
[About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)