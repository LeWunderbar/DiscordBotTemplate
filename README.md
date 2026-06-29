# Discord Bot Template

This repository is a modern starter template for building Discord bots with Discord.js v14. It includes:

- Slash command support
- Button, select menu, and user context menu support
- Ready-event handlers and interaction routing
- Optional MongoDB support
- A basic example command and interaction setup

## Requirements

- Node.js 20 or newer
- A Discord bot token
- Optional: MongoDB connection string if you want database support

## Quick Start

1. Install dependencies
   ```bash
   npm install
   ```

2. Create environment files
   Create a file named `.env` and a file named `.envDev` in the project root.

   Example:
   ```env
   TOKEN=your_discord_bot_token_here
   ```

   For development, you can also add optional MongoDB config:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/mybot
   ```

3. Configure your bot
   - Edit `config.json` for production settings
   - Edit `configDev.json` for development settings

   Important values:
   - `DEVS`: array of developer user IDs
   - `TEST_SERVER`: your testing server ID
   - `BOT_STATUS`: status text shown by the bot
   - `LOG_CHANNEL`: channel used for ready logs

4. Start the bot
   ```bash
   npm start
   ```

## Project Structure

```text
src/
  configurator.js        # Loads config and environment settings
  launch.js              # Bot entry point
  events/                # Event handlers
    ready/               # Ready event modules (loaded in order)
    interactionCreate/  # Interaction routing
    messageCreate/      # Message event handlers
  handlers/              # Client, event, MongoDB, shutdown logic
  interactions/          # Slash commands, buttons, select menus, context menus
  schema/                # Mongoose schemas (optional)
  templates/             # Shared embed helpers
  utils/                 # Helper functions
```

## How the Template Works

### 1. Bot startup
The bot starts from `src/launch.js`, which loads the event system and initializes the Discord client.

### 2. Events
Files inside `src/events/` are loaded automatically. The `ready` folder is a good place for startup tasks such as:
- registering commands
- logging startup information
- connecting to MongoDB

### 3. Interactions
Interactions are organized by type:

- Slash commands: `src/interactions/slashCommands/`
- Buttons: `src/interactions/buttons/`
- Select menus: `src/interactions/selectMenus/`
- User context menus: `src/interactions/userContextMenus/`

Each interaction module should export an object with a callback function.

## Adding a Slash Command

Create a file such as:

```text
src/interactions/slashCommands/misc/ping.js
```

Example:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
  callback: async (client, interaction) => {
    await interaction.reply('Pong!');
  },
};
```

The command will be registered automatically on startup.

## Adding a Button

Create a file under:

```text
src/interactions/buttons/<category>/<name>.js
```

Example:

```js
module.exports = {
  buttonId: 'example',
  callback: async (client, interaction) => {
    await interaction.reply({ content: 'Button pressed!', ephemeral: true });
  },
};
```

## Adding a Select Menu

Create a file under:

```text
src/interactions/selectMenus/<category>/<name>.js
```

Example:

```js
module.exports = {
  selectMenuId: 'example',
  callback: async (client, interaction) => {
    await interaction.reply({ content: `You selected ${interaction.values[0]}`, ephemeral: true });
  },
};
```

## Adding a User Context Menu Command

Create a file under:

```text
src/interactions/userContextMenus/<category>/<name>.js
```

Example:

```js
const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('example')
    .setType(ApplicationCommandType.User),
  callback: async (client, interaction) => {
    await interaction.reply({ content: 'Context menu used!', ephemeral: true });
  },
};
```

## Config Files

### `config.json`
Used for production.

### `configDev.json`
Used for development.

Both files support values such as:

```json
{
  "DEVS": ["your-user-id"],
  "TEST_SERVER": "your-server-id",
  "BOT_STATUS": "My Bot",
  "LOG_CHANNEL": "your-log-channel-id"
}
```

## Optional MongoDB Setup

If you want to use MongoDB:

1. Install and run MongoDB locally, or use a cloud-hosted instance.
2. Set a MongoDB connection string in your environment file:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/mybot
   ```
3. Keep the `mongoHandler` and schema files if you want database support.

If you do not want MongoDB, you can leave it disabled and the bot will skip that connection.

## Inviting the Bot to Discord

Create an invite link with these scopes:

- `bot`
- `applications.commands`

And give the bot the permissions it needs for your commands.

## Running in Production

A simple production setup is to use a process manager such as PM2:

```bash
npm install -g pm2
pm2 start npm --name my-bot -- start
```

## Troubleshooting

### Missing token
If the bot says no token is provided, make sure your `.env` or `.envDev` file contains:

```env
TOKEN=your_discord_bot_token_here
```

### Slash commands not appearing
Make sure:
- the bot has the `applications.commands` scope
- the bot has been invited again after adding commands
- the app is online

### MongoDB connection issues
Check that your `MONGODB_URI` is valid and reachable.

## Next Steps

Once the template is running, you can start building your own bot by:
- adding new slash commands
- wiring buttons and select menus into your features
- replacing the example interactions with your own logic
- adding your own schemas and services

If you want, I can also add a `.env.example` file and a small starter command set for common bot features like moderation, utility, and economy commands.