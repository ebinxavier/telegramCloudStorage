import TelegramBot from "node-telegram-bot-api";

const cachedBots = {};
const getMemoizedBot = (token) => {
  if (!cachedBots[token]) {
    cachedBots[token] = new TelegramBot(token);
  }
  return cachedBots[token];
};

export const uploadDocument = (data, fileName, token, chatId) => {
  const bot = getMemoizedBot(token);
  return bot.sendDocument(
    chatId,
    data,
    {},
    {
      filename: fileName,
      contentType: "application/octet-stream",
    }
  );
};

export const removeDocument = (messageId, token, chatId) => {
  const bot = getMemoizedBot(token);
  return bot.deleteMessage(chatId, messageId);
};

export const downloadDocument = async (fileId, token) => {
  const bot = getMemoizedBot(token);
  const file = await bot.getFile(fileId);
  return file.file_path;
};

export const getDownloadURL = (fileName, token) => {
  return `https://api.telegram.org/file/bot${token}/${fileName}`;
};
