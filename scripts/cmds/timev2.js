const axios = require('axios');

module.exports = {
  config: {
    name: "time",
    aliases: [],
    author: "ASIF",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    description: {
      en: "𝗞𝗻𝗼𝘄 𝘁𝗵𝗲 𝘁𝗶𝗺𝗲 𝘇𝗼𝗻𝗲 𝗼𝗳 𝗮𝗻𝘆 𝗰𝗶𝘁𝘆"
    },
    category: "𝗜𝗡𝗙𝗢",
    guide: {
      en: "{p}{n} name of city"
    }
  },
  onStart: async function ({ api, event, args }) {
    
    const cityName = args.join(' ');

    if (!cityName) {
      api.sendMessage("Please provide the name of a city.", event.threadID, event.messageID);
      return;
    }

   
    try {
      const apiKey = 'm3neaV+qN1FI+MDeoGJnmA==CwYimYwoSd5pheOd'; 
      const apiUrl = `https://api.api-ninjas.com/v1/worldtime?city=${encodeURIComponent(cityName)}`;
      const response = await axios.get(apiUrl, { headers: { 'X-Api-Key': apiKey } });

    
      const { timezone, datetime, day_of_week, year, month } = response.data;

   
      const currentTime = datetime.split(' ')[1]; 
      const message = `𝗧𝗜𝗠𝗘𝗭𝗢𝗡𝗘 𝗢𝗙: ${timezone}\n𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${currentTime}\n𝗬𝗘𝗔𝗥:${year}\n𝗠𝗢𝗡𝗧𝗛:${month}\n𝗗𝗔𝗬: ${day_of_week}`;
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
 
      api.sendMessage("Error fetching time information\nadd your own api key in code", event.threadID, event.messageID);
    }
  },
};
