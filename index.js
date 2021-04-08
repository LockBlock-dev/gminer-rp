const { spawn } = require('child_process')

const config = require('./config.js')

const miner = spawn(config.minerPath, config.minerOptions)

const log = (value) => {
    if (config.showUpdateLogs) {
        console.log(`updated : ${value}`)
    }
}

var algo, GPU, sharesCount = "..."
var hashrate = "... H/s"

miner.stdout.setEncoding('utf8')

miner.stdout.on('data', (data) => {

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

        if (data.includes('H/s')) {
            hashrate = `${arrayData[2].split(' ')[11]} ${arrayData[2].split(' ')[12]}`

            if (arrayData[2].split(' ')[11] == undefined || arrayData[2].split(' ')[12] == undefined) {
                hashrate = `${arrayData[1].split(' ')[11]} ${arrayData[1].split(' ')[12]}`
                if (arrayData[1].split(' ')[11] == undefined || arrayData[1].split(' ')[12] == undefined) {
                    hashrate = `${arrayData[0].split(' ')[11]} ${arrayData[0].split(' ')[12]}`
                }
            }

            sharesCount = arrayData[2].split(' ')[14]

            if (sharesCount == undefined) {
                sharesCount = arrayData[1].split(' ')[14]
                if (sharesCount == undefined) {
                    sharesCount = arrayData[0].split(' ')[14]
                }
            }

            if (!sharesCount.includes('/')) {
                sharesCount = arrayData[2].split(' ')[13]

                if (sharesCount == undefined) {
                    sharesCount = arrayData[1].split(' ')[13]
                    if (sharesCount == undefined) {
                        sharesCount = arrayData[0].split(' ')[13]
                    }
                }
            }

            log(hashrate)
            log(sharesCount)
        }

    } catch(e) {
        
    }

})

miner.stderr.setEncoding('utf8')

miner.stderr.on('data', (data) => {
    console.log(`error : ${data}`)
})



const client = require('discord-rich-presence')('829648686706589737')

const discordRPC = async () => {

    client.on('connected', () => {

        console.log("Connected to Discord !")
        startTimestamp = new Date()

        client.updatePresence({
            state: `GPU: ${GPU}`,
            details: `${algo} : ${hashrate} - ${sharesCount} shares`,
            startTimestamp,
            largeImageKey: "gminer-logo",
            largeImageText: `Mining ${algo}`
        })

        setInterval(() => {

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