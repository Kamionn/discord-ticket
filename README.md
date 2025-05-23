# Discord Ticket Bot

This project is a Discord bot designed to manage a ticketing system. It allows users to create tickets via direct messages, facilitates communication between users and staff, and logs all interactions for record-keeping.

## Features

- **Direct Message Support**: Users can create tickets by sending direct messages to the bot.
- **Ticket Channel Creation**: The bot automatically creates a dedicated channel for each ticket.
- **User and Staff Communication**: Messages are relayed between users and staff, ensuring seamless communication.
- **Ticket Closure and Logging**: Tickets can be closed, and all interactions are logged in both text and JSON formats.

## Project Structure

```
discord-ticket-bot
├── src
│   ├── index.js
│   ├── commands
│   ├── config
│   │   └── config.js
│   ├── events
│   │   ├── interactionCreate.js
│   │   └── messageCreate.js
│   ├── functions
│   │   ├── closeTicket.js
│   │   ├── createTicketButtons.js
│   │   ├── getUserInfo.js
│   │   └── relayMessages.js
│   ├── modules
│   │   └── ticketManager.js
│   ├── logs
│   └── tickets
├── .env
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd discord-ticket-bot
   ```

2. **Install Dependencies**: 
   ```bash
   npm install
   ```

3. **Configure Environment Variables**: 
   Create a `.env` file in the root directory and add the following variables:
   ```
   TOKEN=your_discord_bot_token
   STAFF_GUILD_ID=your_staff_guild_id
   USER_GUILD_ID=your_user_guild_id
   TICKET_CATEGORY_ID=your_ticket_category_id
   LOG_CHANNEL_ID=your_log_channel_id
   ```

4. **Run the Bot**: 
   ```bash
   node src/index.js
   ```

## Usage

- Users can start a ticket by sending a direct message to the bot.
- Staff can respond to tickets in the created channels.
- Tickets can be closed by staff, and logs will be generated automatically.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.