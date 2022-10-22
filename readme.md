## Telegram Cloud Storage CLI

### Usage

1.  Create a Telegram bot using [BotFather](https://t.me/botfather) and generate the `token`
2.  Create a new group and add this bot as a member in that group.
3.  Get the ID of this group (`chatId`)
4.  Create a `.env` file in the root directory and add fill the following details.

```
     token = <bot-token>
     chatId = <chat-id>
```

5.  `npm install`
6.  Since it is developed in Typescript, I assume that `ts-node` is installed globally in the machine.
7.  Run `npm start -- --upload="src-folder-name"` to upload folder to that given telegram group
8.  Use `npm start -- --download="dest-folder-name"` to download the contents when you need it.

<!-- https://api.telegram.org/bot692564636:AAFPToeWo4-f132zRNalvT88dOjJhfGJJjU/getUpdates -->

Other CLI commands

- register
  - input username, password, token and chatID
- logout
- ls
- cd
- pwd
- mkdir
- rmdir
