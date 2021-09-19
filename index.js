const { spawn } = require("child_process");
const discord = require("discord-rpc");
const gminer = require("gminer.js");

const config = require("./config.js");
const clientId = "829648686706589737";
const startTimestamp = new Date();
const miner = spawn(config.minerPath, config.minerOptions);
let GPU;

miner.stdout.setEncoding("utf8");
miner.stderr.setEncoding("utf8");

miner.stdout.on("data", (data) => {
    try {
        data = data.toString();

        if (config.showMinerLogs) console.log(data);
        if (data.includes("Started Mining")) GPU = data.split("\r\n")[0].split("GPU0: ")[1].split("[")[0];
    } catch (e) {
        console.error(e);
    }
});

miner.stderr.on("data", (data) => {
    console.error(`error : ${data}`);
});

const GMinerAPI = new gminer.Client(config.minerOptions[config.minerOptions.indexOf("--api") + 1]);
const rpc = new discord.Client({ transport: "ipc" });

rpc.on("connected", () => {
    console.log("Connected to Discord!");

    setInterval(async () => {
        let data = await GMinerAPI.stats();
        let hashrate = `${(data.devices[0].speed / 1000000).toFixed(2)} M${data.speed_unit}`;
        let sharesCount = `${data.total_accepted_shares}/${data.total_rejected_shares}/${data.total_invalid_shares}`;

        rpc.setActivity({
            details: `${data.algorithm} : ${hashrate} - ${sharesCount} shares`,
            state: `GPU: ${GPU ? GPU : data.devices[0].name}`,
            startTimestamp,
            largeImageKey: "gminer-logo",
            largeImageText: data.miner,
        });
    }, 10000);
});

process.on("unhandledRejection", console.error);

rpc.login({ clientId });
