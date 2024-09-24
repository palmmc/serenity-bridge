interface BridgeProperties {
	/**
	 * The login token for the discord client.
	 */
	readonly token: string;

	/**
	 * The channel identifier to log messages to.
	 */
	readonly channel: string;
}

export { BridgeProperties };
