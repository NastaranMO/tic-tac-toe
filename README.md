I create this live multiplayer Tic Tac Toe app using Reactjs, Nodejs, Socket.io and Framer Motion.

## Table of contents

- [Demo](#demo)
- [Specifications](#my-process)
- [Built with](#built-with)
- [How to run?](#how-to-run)

### Demo

You can see my Tic Tac Toe online at: [Tic-Tac_Toe](https://tic-tac-toe-app.herokuapp.com)

## Overview

![](https://github.com/NastaranMO/tic-tac-toe/blob/main/client/src/assests/Screen-Recording-2022-12-13-at-1.gif)

### Specifications

- Mobile first approach
- Handling real-time connection between players with <b>Socket.io</b>
- Managing states with React
- Using Express for REST API endpoints
- Adding animation and effects by Framer Motion
- Calculate the winner or draw and store user info in the local storage for next usage
- Implemented with React hooks
- Fully modular

### Built with

- Reactjs
- Nodejs
- Socket.io
- Express
- Framer Motion
- BEM css naming convention

### How to run?

1. Start `tic-tac-toe` application and ensure that it is running on `http://localhost:3000`
   ```bash
   cd client
   npm i
   npm start
   ```
2. Run the backend

   ```bash
   cd ../server
   npm i
   npm run start-dev
   ```

### Screenshot

<!-- ![](./client/src/assests/tic-tac-toe.png) -->
<img src="./client/src/assests/tic-tac-toe-screenshot.png" alt="Kitten" title="A cute kitten" width="400" height="400" style="border-radious: 5px;" />
