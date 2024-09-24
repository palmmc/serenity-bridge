import { resolve } from "node:path";

import { Events } from "discord.js";
import { type Serenity, Properties } from "@serenityjs/serenity";

import { BRIDGE_PROPERTIES_TEMPLATE } from "./template/bridge.properties";
import { DiscordBridge } from "./bridge";

import type { BridgeProperties } from "./types/properties";
import type { Plugin } from "@serenityjs/plugins";

export function onInitialize(serenity: Serenity, plugin: Plugin): void {
	// Set the logger of the bridge
	DiscordBridge.logger = plugin.logger;

	// Create or load the properties file
	const properties = new Properties<BridgeProperties>(
		resolve(plugin.path, "bridge.properties"),
		BRIDGE_PROPERTIES_TEMPLATE
	);

	// Set the properties of the bridge
	DiscordBridge.properties = properties;

	// Get the login token from the properties
	const token = properties.getValue("token");

	// Log in to the discord client
	DiscordBridge.login(token);

	// Wait for the client to be ready
	DiscordBridge.client.once(Events.ClientReady, () => hookEvents(serenity));
}

function hookEvents(_serenity: Serenity): void {
	// TODO: Implement event hooks
	DiscordBridge.sendMessage("Hello, world!");
}

// Export the DiscordBridge class
// This will also other plugins to use the bridge
export { DiscordBridge };
