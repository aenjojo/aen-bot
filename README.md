# Aen-Bot
=======
Aen-Bot is a discord bot framework that built on top of [discord.js](https://github.com/discordjs/discord.js).

Built-in Command:
-----------------
| Command  | Description                                                     | Usage                               |
| :------: | :-------------------------------------------------------------- | :---------------------------------- |
| `load`   | Loading a new command                                           | `<prefix> load <command: string>`   |
| `unload` | Unloading a command                                             | `<prefix> unload <command: string>` |
| `reload` | Reloading a command                                             | `<prefix> reload <command: string>` |
| `ping`   | Send ping test to check the connection to Discord API           | `<prefix> ping`                     |
| `help`   | Send help message (include help message for each command/group) | `<prefix> help [command: string]`   |
| `eval`   | Evaluate a JavaScript code right in your discord guild/server   | `<prefix> eval <script: string>`    |