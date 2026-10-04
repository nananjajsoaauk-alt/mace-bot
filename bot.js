const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.SERVER_IP,       
  port: parseInt(process.env.SERVER_PORT) || 25565,
  username: process.env.BOT_NAME || 'MaceGuardBot',
  auth: 'offline'
});

const targetX = 250;
const targetZ = 250;
const triggerRadius = 6; 

bot.on('spawn', () => {
  console.log('Bot joined the Anarchy server successfully!');

  setInterval(() => {
    const playerFilter = (entity) => entity.type === 'player' && entity.username !== bot.username;
    const player = bot.nearestEntity(playerFilter);

    if (player) {
      const pos = player.position;
      if (Math.abs(pos.x - targetX) <= triggerRadius && Math.abs(pos.z - targetZ) <= triggerRadius) {
        bot.lookAt(pos.offset(0, player.height, 0));
        bot.attack(player);
      }
    }
  }, 300);
});

bot.on('kicked', (reason) => console.log(`Kicked: ${reason}`));
bot.on('error', (err) => console.log(`Error: ${err}`));
