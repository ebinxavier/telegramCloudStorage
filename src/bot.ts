import TelegramBot from "node-telegram-bot-api";
const token = process.env.token;
const chat = process.env.chatId;
const bot = new TelegramBot(token);

export const uploadDocument = (data, fileName) => {
  return bot.sendDocument(
    chat,
    data,
    {},
    {
      filename: fileName,
      contentType: "application/octet-stream",
    }
  );
};

export const downloadDocument = async (fileId) => {
  const file = await bot.getFile(fileId);
  return file.file_path;
};

export const getDownloadURL = (fileName) => {
  return `https://api.telegram.org/file/bot${token}/${fileName}`;
};
