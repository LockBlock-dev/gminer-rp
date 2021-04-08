# GMiner Rich Presence

Discord Rich Presence for ![GMiner](https://github.com/develsoftware/GMinerRelease/releases) made with [![discord.js](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/gminer-rp/discord-rich-presence)](https://www.npmjs.com/package/discord-rich-presence)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/gminer-rp.svg)](https://github.com/LockBlock-dev/gminer-rp/stargazers)

![Rich Presence preview](/preview.jpg)

Note that this rich presence starts the miner, no need to start it.


## How to use

• Download [NPM](https://www.npmjs.com/get-npm) and [NodeJS](https://nodejs.org)

• Download the project or clone it

• Go to the GMiner RP folder and do `npm install`

• Edit the config :
```js
minerPath: "PATH_TO_miner.exe",
//only slash { / }, don't put backslash { \ }
//example: "C:/Users/LockBlock/Desktop/GMiner/miner.exe"
minerOptions: [
    '--algo', 'ALGO',
    '--server', 'POOL_ADRESS:PORT',
    '--user', 'WALLET.WORKER_NAME',
],
//here are the options you put in the .bat to start the miner (algo, pool, user, ...)
//to add any parameter, just add: 'parameter', 'value',
//example: '--templimit', '60',
showUpdateLogs: true,
//if you want to display the logs of the RP (when the hashrate, sharesCount and the presence are updated)
showMinerLogs: false
//if you want to display the logs of the miner (jobs, share, hashrate, temp, ...)
```

• Run it by doing `node index.js`


## Potential bugs

• I fixed every bugs I found while using it, if I found more bugs, I will fix them.


## Copyright

See the [license](/LICENSE).