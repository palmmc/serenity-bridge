import {
  Channel,
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
import { Serenity } from "@serenityjs/serenity";
import { Player, WorldEvent } from "@serenityjs/world";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

function sendToConsole(message: string, isError?: boolean) {
  console.log(
    "[\x1b[34mSERENITY\x1b[90m-\x1b[35mBRIDGE\x1b[0m] " +
      (isError ? "\x1b[31m" : "") +
      message
  );
}

// Discord Setup

const fs = require("node:fs");
let config: any = null;
try {
  config = JSON.parse(
    fs
      .readFileSync("./plugins/serenity-bridge/config.scfg", "utf8")
      .replace(/\/\/*.*/g, "")
  );
} catch (e) {
  sendToConsole("Invalid config file.", true);
}

const channelId = config.channel;

export function onStartup(serenity: Serenity) {
  // World Setup
  const world = serenity.worlds.get("default");

  if (config == null) sendToConsole("Invalid config file.", true);

  client.once(Events.ClientReady, (readyClient: any) => {
    sendToConsole(`Logged in as ${readyClient.user.tag}`);

    // EVENT LOGGING

    // Server Start
    if (config.enableServerStartMessage === true) {
      const channel = client.channels.cache.get(channelId)!! as TextChannel;
      let message = config.serverStartFormat;
      channel.send(message);
    }

    // Log Player Chat
    if (config.enableChatLogging === true) {
      serenity.worlds.on(WorldEvent.PlayerChat, (data) => {
        const channel = client.channels.cache.get(channelId)!! as TextChannel;
        let message = `**${data.player.username}** » ${data.message}`;
        if (config.chatFormat)
          message = config.chatFormat
            .replace("{USERNAME}", data.player.username)
            .replace("{MESSAGE}", data.message);
        channel.send(message);
      });
    }

    // Log Player Join/Leave
    if (config.enableJoinLogging === true) {
      serenity.worlds.on(WorldEvent.PlayerJoin, (data) => {
        const channel = client.channels.cache.get(channelId)!! as TextChannel;
        let message = `**${data.player.username}** has joined the game`;
        if (config.joinFormat)
          message = config.joinFormat.replace(
            "{USERNAME}",
            data.player.username
          );
        channel.send(message);
      });
    }

    if (config.enableLeaveLogging === true) {
      serenity.worlds.on(WorldEvent.PlayerLeave, (data) => {
        const channel = client.channels.cache.get(channelId)!! as TextChannel;
        let message = `**${data.player.username}** has left the game`;
        if (config.leaveFormat)
          message = config.leaveFormat.replace(
            "{USERNAME}",
            data.player.username
          );
        channel.send(message);
      });
    }

    if (config.enableServerMessageLogging === true) {
      serenity.worlds.on(WorldEvent.WorldMessage, (data) => {
        const channel = client.channels.cache.get(channelId)!! as TextChannel;
        let message = `**[SERVER]** ${data.message}`;
        if (config.serverMessageFormat)
          message = config.serverMessageFormat.replace(
            "{MESSAGE}",
            data.message
          );
        channel.send(message);
      });
    }

    if (config.enableDeathMessageLogging === true) {
      serenity.worlds.on(WorldEvent.EntityDie, (data) => {
        const channel = client.channels.cache.get(channelId)!! as TextChannel;
        if (
          data.entity.type.identifier != "minecraft:player" ||
          (data.attacker && data.attacker.type.identifier != "minecraft:player")
        )
          return;
        const entity = <Player>data.entity;
        const attacker = <Player | undefined>data.attacker;
        let message = attacker
          ? `**${entity.username}** was killed by **${attacker.username}`
          : `**${entity.username}** died`;
        if (config.deathFormat && !attacker)
          message = config.deathFormat.replace("{USERNAME}", entity.username);
        else if (config.killedByFormat && attacker)
          message = config.killedByFormat
            .replace("{USERNAME}", entity.username)

            .replace("{ATTACKER}", attacker.username);
        channel.send(message);
      });
    }

    if (config.enableCommandLogging === true) {
      serenity.worlds.on(WorldEvent.PlayerExecuteCommand, (data) => {
        const channel = client.channels.cache.get(channelId)!! as TextChannel;
        let message = `**${data.player.username}** *executed*: \`${data.command}\``;
        if (config.commandFormat)
          message = config.commandFormat
            .replace("{USERNAME}", data.player.username)
            .replace("{COMMAND}", data.command);
        channel.send(message);
      });
    }
  });

  client.login(config.token);

  /*
  client.on("messageCreate", (data) => {
    //console.log(data.channelId);
    console.log(data.content);
    if (data.author.bot === true) return;
    world.sendMessage(
      `[§9D§f] §7${data.author.username} §9>> §f${data.content}`
    );
  });
  */
}

export function onShutdown(serenity: Serenity): void {
  // Server Stop
  if (config.enableServerStopMessage === true) {
    const channel = client.channels.cache.get(channelId)!! as TextChannel;
    let message = config.serverStopFormat;
    channel.send(message);
  }
}
