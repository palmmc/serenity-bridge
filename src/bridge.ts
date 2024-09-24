/* eslint-disable @typescript-eslint/no-extraneous-class */
import {
	Client,
	type ClientOptions,
	GatewayIntentBits,
	type TextChannel
} from "discord.js";

import type { Logger } from "@serenityjs/logger";
import type { BridgeProperties } from "./types/properties";
import type { Properties } from "@serenityjs/serenity";

class DiscordBridge {
	/**
	 * The default client options for the Discord client.
	 */
	public static readonly options: ClientOptions = {
		intents: [GatewayIntentBits.Guilds]
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
		// Get the channel from the properties
		const channelId = this.properties.getValue("channel");

		// Get the channel from the client
		const channel = this.client.channels.cache.get(channelId) as TextChannel;

		// Check if the channel exists
		if (!channel) {
			// Log an error if the channel does not exist
			return this.logger.error("Channel not found");
		} else {
			// Send the message to the channel
			channel.send(message).catch((reason) => this.logger.error(reason));
		}
	}
}

export { DiscordBridge };
