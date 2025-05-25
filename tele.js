const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Telegram failed: " + err.message);
  }
});

module.exports = router;