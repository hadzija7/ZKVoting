# OneVote
One vote is an anonymous voting system. Users in such a system are allowed to vote without exposing their private information. OneVote utilizes zero knowledge to achieve anonymity. It relies on Semaphore contracts that allow user to prove that he/she belongs to the voting group.

## Getting started
OneVote contracts are deployed to the Harmony test net. <br>
Dapp is deployed on centralized Hetzner cloud. Deployment to decentralized cloud is planned in the future.

## Dependencies
- [Nodejs](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Deploy
- Clone repo
  ```
  git clone https://github.com/hadzija7/ZKVoting.git
  ```
- Position to contracts directory
  ```
  cd ZKVoting/contracts
  ```
- Run the truffle deployment script
  ```
  truffle deploy --network testnetHar
  ```
- Copy abi, address and bytecode to front-app
  ```
  node ./utils/compileContracts.js
  ```

## Run the react-app
- position to react-app directory
  ```
  cd ZKVoting/react-app
  ```
- Install dependencies
  ```
  npm install
  ```
- Copy webpack.config file to the react-scripts
  ```
  cp webpack.config.js ./node_modules/react-scripts/config
- Run the app
  ```
  npm run start
  ```
