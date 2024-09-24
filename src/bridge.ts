import {
  Client,
  type ClientOptions,
  GatewayIntentBits,
  type TextChannel,
} from "discord.js";

import { Logger } from "@serenityjs/logger";
import type { BridgeProperties } from "./types/properties";
import type { Properties } from "@serenityjs/serenity";
import { BridgeMessages } from "./types/messages";

class DiscordBridge {
  /**
   * The default client options for the Discord client.
   */
  public static readonly options: ClientOptions = {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
    ],
  };

  /**
   * The discord client instance for the bridge.
   */
  public static readonly client = new Client(this.options);

  /**
   * The logger for the bridge.
   */
  public static logger: Logger;

  /**
   * The properties for the bridge.
   */
  public static properties: Properties<BridgeProperties>;

  /**
   * The message formats for the bridge.
   */
  public static messages: Properties<BridgeMessages>;

  public static channel: TextChannel;

  /**
   * Log in to the discord client.
   * @param token The token to log in with.
   */
  public static login(token: string) {
    // Catch any errors that occur when logging in
    this.client.login(token).catch((reason) => this.logger.error(reason));
  }

  /**
   * Sends a message to the channel.
   * @param message The message to send.
   * @returns The message that was sent.
   */
  public static sendMessage(message: string): void {
    // Check if the channel exists
    if (!this.channel) {
      // Log an error if the channel does not exist
      return this.logger.error("Channel not found.");
    } else {
      // Send the message to the channel
      this.channel.send(message).catch((reason) => this.logger.error(reason));
    }
  }
}

export { DiscordBridge };
