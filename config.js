module.exports = {
    minerPath: "PATH_TO_miner.exe",
    //only slash { / }, don't put backslash { \ }
    //example: "C:/Users/LockBlock/Desktop/GMiner/minexe.exe"
    minerOptions: [
        '--algo', 'ALGO',
        '--server', 'POOL_ADRESS:PORT',
        '--user', 'WALLET',
        '--worker', 'WORKER_NAME',
    ],
    //here are the options you put in the .bat to start the miner (algo, pool, user, ...)
    //to add any parameter, just add: 'parameter', 'value',
    //example: '--templimit', '60',
    showUpdateLogs: true,
    //if you want to display the logs of the RP (when the hashrate, sharesCount and the presence are updated)
    showMinerLogs: false
    //if you want to display the logs of the miner (jobs, share, hashrate, temp, ...)
  }