# telegram-notifier

A simple notifier service to send notifications to Telegram. 

A service that will work fine for sending notifications from your apis to Telegram. It won't make your bot interact, its scope is just to send notifications, alerts, messages, etc.

## Tech

telegram-notifier uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework

And of course telegram-notifier itself is open source with a [public repository][dill]
 on GitHub.


## Setup

### Requirements
You must create a Telegram Bot and you must have install a development environment with Docker and NodeJS.

### Create a Telegram Bot

The first step is to open Telegram and search for @BotFather. @BotFather is responsible for creating and configuring new bots on Telegram. Creating bots on Telegram is free.

Start the chat with @BotFather and send the command: `/newbot`.

It will ask you to provide a name and then a username for your bot. Follow its instructions.

Once created, it will provide the bot's API token. It's really simple folks!

After completing the process, write down the token, as we will use it in the script.

You need to do the next steps now (still in Telegram):

 - Start a conversation with bot or create the group/channel that will receive the bot's messages _(as you wish)_;
 - Start conversation with bot or add it as a member of the group/channel;
 - If necessary, give group/channel admin permissions to your bot.

After all these steps, you will need to retrieve a code that identifies this group/channel/chat (its id). This is because when you send messages from your script, you will need to identify which group/channel/chat you are sending them to.

To recover the code, first post any message by the way you prefer, with your Telegram username.

Then open your browser and enter a url like this:
```
https://api.telegram.org/bot{{Bot Token}}/getUpdates
```

Where you have to enter the bot token in the corresponding space. _For example: if your token is: `921221256:BBIBRZb180C5nmzQ9F1UZ1sWQWod2QSJT-1`, the url would look like this: `https://api.telegram.org/bot921221256:BBIBRZb180C5nmzQ9F1UZ1sWQWod2QSJT-1/getUpdates`_.

You will get a JSON in the browser response. Format the JSON and then let's identify the id:
```json
{
    "ok":true,
    "result":[
       {
          "update_id":652212325,
          "channel_post":{
             "message_id":34,
             "chat":{
                "id":-2002161290520,
                "title":"News Channel",
                "type":"channel"
             },
             "date":1585494344,
             "text":"Hello! Test to retrieve group id."
          }
       }
    ]
}
```

**The group (or channel) id is in the “chat” object**. Write down the “id”, which in this example is like: `-2002161290520`.

Ready! Now we have everything we need to send notifications and start the notifier!

### Steps to install

#### Development environment

Clone this project
```sh
$ https://github.com/diegoqueres/telegram-notifier
```

Enter on project path, and create a environment file: _.env_ like the _.env.example_, with your own values to env variables.

Now run the following command:
```sh
$ docker compose up
```

To stop the service, run the command:
```sh
$ docker compose stop
```

Test by accessing your browser and accessing the url: `http://localhost:{{your api port}}`.


### Make requests to Notify
Use the endpoint: _POST `/api/v1/notify`_ to send notifications.

Run this curl to send your first notification:
```sh
curl --request POST \
  --url http://localhost:3010/api/v1/notify \
  --header 'Bot-Token: {{your bot token}}' \
  --header 'Chat-Id: {{your chat id}}' \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: {{your api key}}' \
  --data '{
	"from": "User",
	"message": "Heloooooo!"
}'
```


## License

MIT

**Free Software, Hell Yeah!**