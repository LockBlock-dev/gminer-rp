module.exports = {
    minerPath: "PATH_TO_miner.exe",
    //only slash { / }, don't put backslash { \ }
    minerOptions: [
        '--algo', 'ALGO',
        '--server', 'POOL_ADRESS:PORT',
        '--user', 'WALLET.WORKER_NAME',
    ],
    showUpdateLogs: true,
    showMinerLogs: false
  }