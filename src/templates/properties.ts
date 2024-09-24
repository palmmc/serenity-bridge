export const BRIDGE_PROPERTIES_TEMPLATE = `# Serenity Bridge Configuration

# -- DISCORD SETUP --

token: "CLIENT_TOKEN_HERE"
# The discord client token to log in with.

channel: "CHANNEL_ID_HERE"
# The channel identifier to log messages to.

# [?] If you require help setting up a discord bot, see:
# https://shockbyte.com/billing/knowledgebase/409/How-to-Setup-DiscordSRV-on-Your-Minecraft-Server.html

# -- LOGGING MANAGEMENT --

# General Logging

enableServerStartMessage: true
# Whether or not to send a discord message when the server starts.

enableServerStopMessage: true
# Whether or not to send a discord message when the server stops.

# Event Logging

enableChatLogging: true
# Whether or not to send a discord message when a player chats.

enableJoinLogging: true
# Whether or not to send a discord message when a player joins the game.

enableLeaveLogging: true
# Whether or not to send a discord message when a player leaves the game.

enableConsoleMessageLogging: true
# Whether or not to send a discord message when a console message is sent.

enableDeathMessageLogging: true
# Whether or not to send a discord message when a player dies.

enableCommandLogging: true
# Whether or not to send a discord message when a player uses a command.

# -- DISCORD RELAY --

enableRelay: true
# Enable the discord relay feature.
`;
