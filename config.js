module.exports = {
    minerPath: "PATH_TO_miner.exe",
    //only slash { / }, don't put backslash { \ }
    //example: "C:/Users/LockBlock/Desktop/GMiner/minexe.exe"
    minerOptions: [
        '--algo', 'ALGO',
        '--server', 'POOL_ADRESS:PORT',
        '--user', 'WALLET',
        '--worker', 'WORKER_NAME',
        '--api', 'PORT'
    ],
    //here are the options you put in the .bat to start the miner (algo, pool, user, port of the miner API ...)
    //to add any parameter, just add: 'parameter', 'value',
    //example: '--templimit', '60',
    showMinerLogs: false
    //if you want to display the logs of the miner (jobs, share, hashrate, temp, ...)
  }