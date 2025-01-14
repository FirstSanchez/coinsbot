# Role Bot

A Discord bot that automatically manages roles based on users' custom status containing the Discord invite link.

## Features

- 🔍 Monitors user custom status for Discord invite link
- ✨ Automatically assigns supporter role when link is detected
- 🗑️ Automatically removes role when link is removed
- 📨 Sends DM notification when role is assigned
- 🚀 Performs initial role check on startup
- ⚡ Real-time status monitoring

## Requirements

- Node.js 16.9.0 or higher
- Discord Bot Token
- Server with administrator permissions

## Installation

1. Clone the repository
```bash
git clone https://github.com/FirstSanchez/coinsbot
cd coinsbot
```

2. Install dependencies
```bash
npm install
```

3. Configure the bot
- Rename `config.example.json` to `config.json`
- Fill in your bot token, guild ID, and role ID:
```json
{
    "bot": {
        "token": "YOUR_BOT_TOKEN",
        "guildId": "YOUR_GUILD_ID",
        "roleId": "YOUR_ROLE_ID"
    }
}
```

4. Start the bot
```bash
npm start
```

## Configuration

- `token`: Your Discord bot token
- `guildId`: The ID of your Discord server
- `roleId`: The ID of the role to be assigned

## Valid Status Links

The bot recognizes the following link formats in custom status:
- `.gg/YOUR_LINK_HERE`
- `discord.gg/YOUR_LINK_HERE`
- `https://discord.gg/YOUR_LINK_HERE`

## Permissions

The bot requires the following permissions:
- Manage Roles
- Read Messages/View Channels
- View Server Insights
- Send Messages

## Error Handling

The bot includes comprehensive error handling:
- Logs role assignment/removal operations
- Handles DM permission errors gracefully
- Reports role not found errors
- Handles Discord API errors

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.