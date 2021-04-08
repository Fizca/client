# client

The client is written on
[React](https://reactjs.org/). The state is managed by [MobX](https://mobx.js.org/README.html)
which is similar to Redux but I've found it easier to pick up, understand and manage.

More information on React and how this project was created, on the ./REACT.md

## MobX

There are some basic tutorials:

* https://www.youtube.com/watch?v=_q50BXqkAfI&t=5s
* https://mobx.js.org/getting-started


## Packages Used

* Build managment: [webpack](https://webpack.js.org/)
* Style and CSS: [Styled Components](https://styled-components.com/)

# Setup

## Node

The project currently runs on Node 12.

Instructions can be found here: https://formulae.brew.sh/formula/node@12

**brew**
```bash
brew install node@12
```

## Yarn

There is no significan difference between Yarn and NPM for package management.
There is a breakdown on how they operate here: https://www.sitepoint.com/yarn-vs-npm/.


The Yarn documentation can be found here https://yarnpkg.com/getting-started

Install Yarn base version 1.22

```bash
npm install -g yarn
```

# Extensions

## VS Code Extensions

* [ESLint ](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
* [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

# Running the Project

## Install Dependencies

```bash
yarn install
```

## Startup

> Scripts can be found in the `package.json` file

React hot reloads automatically via Webpack

```bash
yarn start
```

Application then runs on http://localhost:3000 by default but it can be updated on the `webpack.config.js` file.
