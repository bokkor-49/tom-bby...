const { loadImage, createCanvas } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
        name: "jonny",
        version: "1.0.1",
        role: 0,
        author: "Not Found",
        description: "𝗝𝗼𝗻𝗻𝘆'𝘀 𝗙𝘂𝗻𝗻𝘆 𝗧𝗲𝘅𝘁 𝗜𝗺𝗮𝗴𝗲 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗼𝗿",
        category: "𝗜𝗠𝗔𝗚𝗘",
        guide: "{pn} [text]",
        countDown: 10,
        dependencies: {
                "canvas":"",
                 "axios":"",
                 "fs-extra":""
        }
};

module.exports.wrapText = (ctx, text, maxWidth) => {
        return new Promise(resolve => {
                if (ctx.measureText(text).width < maxWidth) return resolve([text]);
                if (ctx.measureText('W').width > maxWidth) return resolve(null);
                const words = text.split(' ');
                const lines = [];
                let line = '';
                while (words.length > 0) {
                        let split = false;
                        while (ctx.measureText(words[0]).width >= maxWidth) {
                                const temp = words[0];
                                words[0] = temp.slice(0, -1);
                                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                                else {
                                        split = true;
                                        words.splice(1, 0, temp.slice(-1));
                                }
                        }
                        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
                        else {
                                lines.push(line.trim());
                                line = '';
                        }
                        if (words.length === 0) lines.push(line.trim());
                }
                return resolve(lines);
        });
}

module.exports.onStart = async function({ api, event, args }) {
        let { senderID, threadID, messageID } = event;
        let pathImg = __dirname + '/cache/jonny.png';
        var text = args.join(" ");
        if (!text) return api.sendMessage("𝗘𝗻𝘁𝗲𝗿 𝘁𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁 𝗼𝗳 𝘁𝗵𝗲 𝗰𝗼𝗺𝗺𝗲𝗻𝘁 𝗼𝗻 𝘁𝗵𝗲 𝗯𝗼𝗮𝗿𝗱", threadID, messageID);
        let getPorn = (await axios.get(`https://i.imgur.com/qKDkp38.png`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
        let baseImage = await loadImage(pathImg);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.font = "400 18px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "start";
        let fontSize = 50;
        while (ctx.measureText(text).width > 1200) {
                fontSize--;
                ctx.font = `400 ${fontSize}px Arial`;
        }
        const lines = await this.wrapText(ctx, text, 490);
        ctx.fillText(lines.join('\n'), 18,85);//comment
        ctx.beginPath();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
}