#Node.js version of VersionPress Docs Site #

## Setup

This version of docs-site is based on Node.js, so before starting several steps should be done.


- install [Node.js](https://nodejs.org)
- perform `npm i`
- perform `tsd i`
- create `.env` file from `.env.example` and set path to documentation folder (probably cloned somewhere on the local drive)


##Running application

Application is using webpack and gulp as build and task running tool. If you use command

`gulp watchAndServe`

application is build and Node.js server is starded. Resources are processed via webpack and provided to client using webpack-dev server. Application is accessible on `http://localhost:3000/`.

When run standalone use `/dist` as working dir and `server.js` as startup script. Url of the application is same. Port can be adjusted by setting `PORT` variable in `.env` file.

**Note**

On production, Node.js server should not be exposed directly to internet. Some kind of http server ( e.g. Nginx) should be placed in front.



Site serving the [user documentation](https://bitbucket.org/agilio/versionpress-docs). Deployed as [docs.versionpress.net](http://docs.versionpress.net/).

see [Wiki](https://github.com/versionpress/docs-site/wiki) for usage manual and hints.


