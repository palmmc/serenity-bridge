import { resolve } from "node:path";

import { Events, TextChannel } from "discord.js";
import { type Serenity, Properties } from "@serenityjs/serenity";

import { BRIDGE_PROPERTIES_TEMPLATE } from "./templates/properties";
import { DiscordBridge } from "./bridge";

import type { BridgeProperties } from "./types/properties";
import type { Plugin } from "@serenityjs/plugins";
import { BridgeMessages } from "./types/messages";
import { BRIDGE_MESSAGES_TEMPLATE } from "./templates/messages";
import { Logger } from "@serenityjs/logger";
import { Player, WorldEvent } from "@serenityjs/world";
import { BridgeEvents } from "./events/server";
import { DiscordRelay } from "./events/discord";

export function onInitialize(serenity: Serenity, plugin: Plugin): void {
  const { logger } = plugin;
  //@ts-ignore
  logger.name = "\x1b[35mSerenity\x1b[90m-\x1b[34mBRIDGE\x1b[0m";

  // Set the logger of the bridge
  DiscordBridge.logger = plugin.logger;

  // Create or load configuration files.
  // General properties
  const properties = new Properties<BridgeProperties>(
    resolve(plugin.path + "/config/", "properties.scfg"),
    BRIDGE_PROPERTIES_TEMPLATE
  );
  // Message formats
  const messages = new Properties<BridgeMessages>(
    resolve(plugin.path + "/config/", "messages.scfg"),
    BRIDGE_MESSAGES_TEMPLATE
  );

  // Set the properties of the bridge
  DiscordBridge.properties = properties;
  DiscordBridge.messages = messages;

  // Get the login token from the properties
  const token = properties.getValue("token");

  // Log in to the discord client
  DiscordBridge.login(token);

  // Wait for the client to be ready
  DiscordBridge.client.once(Events.ClientReady, () =>
    hookEvents(serenity, logger)
  );
}

function hookEvents(_serenity: Serenity, logger: Logger): void {
  // Login confirmation message.
  logger.info(`Logged in as ${DiscordBridge.client.user?.tag}`);

  // Cache configuration values.
  const properties = DiscordBridge.properties;
  const messages = DiscordBridge.messages;

  // Cache channel.
  DiscordBridge.channel = DiscordBridge.client.channels.cache.get(
    properties.getValue("channel")
  )!! as TextChannel;

  // Handle all event methods.
  const Events = new BridgeEvents(_serenity);
  for (let event of Object.getOwnPropertyNames(BridgeEvents.prototype)) {
    if (event.startsWith("on")) {
      //@ts-ignore
      Events[event]();
    }
  }

  // Handle discord relay.
  const Relay = new DiscordRelay(
    _serenity.worlds.get("default"),
    DiscordBridge.messages
  );
  if (properties.getValue("enableRelay") === true) Relay.handleRelay();
}

export function onShutdown(): void {
  // Server stop message.
  if (DiscordBridge.properties.getValue("enableServerStopMessage") === true) {
    let message = DiscordBridge.messages.getValue("serverStopFormat");
    DiscordBridge.sendMessage(message);
  }
  // Log out of the discord client
  DiscordBridge.client.destroy();
}

// Export the DiscordBridge class
// This will also other plugins to use the bridge
export { DiscordBridge };
