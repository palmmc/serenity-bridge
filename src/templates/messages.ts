export const BRIDGE_MESSAGES_TEMPLATE = `# Serenity Bridge Configuration

# -- MESSAGE CUSTOMIZATION --

# - MINECRAFT -> DISCORD -

# Server Start Message Format
serverStartFormat: "✅ **Server has started.**"
# DEFAULT: ✅ **Server has started.**

# Server Stop Message Format
serverStopFormat: "🛑 **Server has stopped.**"
# DEFAULT: 🛑 **Server has stopped.**

# Chat Message Format
chatFormat: "**{USERNAME}** » {MESSAGE}"
# DEFAULT: **{USERNAME}** » {MESSAGE}
# PLACEHOLDERS: {USERNAME} {MESSAGE}

# Join Message Format
joinFormat: "**{USERNAME}** has joined the game"
# DEFAULT: **{USERNAME}** has joined the game
# PLACEHOLDERS: {USERNAME}

# Leave Message Format
leaveFormat: "**{USERNAME}** has left the game"
# DEFAULT: **{USERNAME}** has left the game
# PLACEHOLDERS: {USERNAME}

# Console Message Format
consoleMessageFormat: "**[SERVER]** {MESSAGE}"
# DEFAULT: **[SERVER]** {MESSAGE}
# PLACEHOLDERS: {MESSAGE}

# Standard Death Message Format
deathFormat: "**{USERNAME}** died"
# DEFAULT: **{USERNAME}** died
# PLACEHOLDERS: {USERNAME}

# Death by Player Message Format
killedByFormat: "**{USERNAME}** was killed by **{ATTACKER}**"
# DEFAULT: **{USERNAME}** was killed by **{ATTACKER}**
# PLACEHOLDERS: {USERNAME} {ATTACKER}

# Command Executed Message Format
commandExecutedFormat: "**{USERNAME}** *executed*: \`{COMMAND}\`"
# DEFAULT: **{USERNAME}** *executed*: \`{COMMAND}\`
# PLACEHOLDERS: {USERNAME} {COMMAND}

# - DISCORD -> MINECRAFT -

# Discord Relay Message Format
discordRelayFormat: "[§9D§f] §7{USERNAME} §9>> §f{MESSAGE}"
# DEFAULT: [§9D§f] §7{USERNAME} §9>> §f{MESSAGE}
# PLACEHOLDERS: {USERNAME} {MESSAGE}
`;