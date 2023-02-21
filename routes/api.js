const express = require('express');
const router = express.Router();
const { Telegraf } = require('telegraf');
const { header, body, validationResult } = require('express-validator');
const API = require('../api-auth');

router.post('/notify', API.authenticateKey, validation(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const inputDTO = convertToDTO(req);
    const bot = new Telegraf(inputDTO.header.botToken);
    
    bot.telegram.sendMessage(inputDTO.header.chatId, inputDTO.message);
    
    res.json({ message: 'Notification was sent successfully!' });
  }
);

function validation() {
  return [
    header('Bot-Token').not().isEmpty(),
    header('Chat-Id').not().isEmpty(),
    body('from').isString().not().isEmpty(),
    body('message').isString().not().isEmpty(),
  ];
}

function convertToDTO(req) {
  return {
    header: {
      botToken: req.header('Bot-Token'),
      chatId: req.header('Chat-Id')
    },
    from: req.body.from,
    message: req.body.message
  }
}

module.exports = router;
