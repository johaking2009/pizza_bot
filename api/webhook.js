require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const registerBot = require("../bot/register");

let botInstance = null;

function getBot() {
  if (botInstance) return botInstance;
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error("BOT_TOKEN not defined");
  botInstance = new TelegramBot(token);
  registerBot(botInstance);
  return botInstance;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(200).send("OK");
  try {
    const bot = getBot();
    await bot.processUpdate(req.body);
    return res.status(200).send("OK");
  } catch (err) {
    console.error("webhook error:", err);
    return res.status(500).send("error");
  }
};
