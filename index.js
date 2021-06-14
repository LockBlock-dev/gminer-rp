const { spawn } = require("child_process")

const config = require("./config.js")

const miner = spawn(config.minerPath, config.minerOptions)

const log = (value) => {
    if (config.showUpdateLogs) {
        console.log(`updated : ${value}`)
    }
}

var GPU = ""

miner.stdout.setEncoding("utf8")

miner.stdout.on("data", (data) => {

    try {

        data = data.toString()

        if (config.showMinerLogs) {
            console.log(data)
        }

        arrayData = data.split('\r\n')
        //console.log('new data ' + arrayData)

        if (data.includes('Algorithm')) {
            algo = arrayData[3].split(':')[1].replace(/\s+/g, '')
            log(algo)
        }

        if (data.includes('Started Mining')) {
            GPU = arrayData[0].split('GPU0: ')[1].split('[')[0]
            log(GPU)
        }

    } catch(e) {
        console.log(e)
    }

})

miner.stderr.setEncoding("utf8")

miner.stderr.on("data", (data) => {
    console.log(`error : ${data}`)
})

const { Client } = require("gminer.js")
const gminer = new Client(config.minerOptions[config.minerOptions.indexOf("--api")+1])

var algo, sharesCount = "..."
var hashrate = "..."
var data

const client = require("discord-rich-presence")("829648686706589737")

const discordRPC = async () => {

    client.on("connected", () => {

        console.log("Connected to Discord !")
        startTimestamp = new Date()

        client.updatePresence({
            state: `GPU: ${GPU}`,
            details: `${algo} : ${hashrate} - ${sharesCount} shares`,
            startTimestamp,
            largeImageKey: "gminer-logo",
            largeImageText: `Mining ${algo}`
        })

        setInterval( async () => {

            data = await gminer.stats()

            algo = data.algorithm
            hashrate = `${(data.devices[0].speed / 1000000).toFixed(2)} M${data.speed_unit}`
            sharesCount = `${data.total_accepted_shares}/${data.total_rejected_shares}/${data.total_invalid_shares}`

            client.updatePresence({
                state: `GPU: ${GPU}`,
                details: `${algo} : ${hashrate} - ${sharesCount} shares`,
                startTimestamp,
                largeImageKey: "gminer-logo",
                largeImageText: `Mining ${algo}`
            })

            log("Discord Presence")

        }, 15500)

    })

    process.on("unhandledRejection", console.error)
}

discordRPC()