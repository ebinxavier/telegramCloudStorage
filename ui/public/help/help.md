## Register New User

### 1. Get Telegram Bot Token

Open BotFather on your telegram and type `/newbot` and give a name to your bot eg: `TelegramCloudStorage` also give your bot's name eg: `ebinsCloudStorageBot`

- Create a bot
 <img src="./create-bot-token.png" alt="alt text" width="300" height="800">
  Copy this `TOKEN` for step 2.

### 2. Get Telegram Group ID

We have to create a Telegram Group and add our `Bot` to it.

- Create Group
  ![alt text](./create-group-1.png)
- Add our bot to it
  ![alt text](./create-group-2.png)
- Give a group name
<img src="./create-group-3.png" alt="alt text" width="300" height="800">
- Send a message `/test` to the group
  ![alt text](./create-group-4.png)
- Now open this URL on browser by replacing `TOKEN` with yours: https://api.telegram.org/bot{TOKEN}/getUpdates
- Now you have got the `Group ID` or Chat ID
  ![alt text](./call-bot-api.png)
