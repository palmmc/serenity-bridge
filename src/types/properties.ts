interface BridgeProperties {
  /**
   * The login token for the discord client.
   */
  readonly token: string;

  /**
   * The channel identifier to log messages to.
   */
  readonly channel: string;

  /**
   * Whether or not to send a discord message when the server starts.
   */
  readonly enableServerStartMessage: boolean;

  /**
   * Whether or not to send a discord message when the server stops.
   */
  readonly enableServerStopMessage: boolean;

  /**
   * Whether or not to send a discord message when a player chats.
   */
  readonly enableChatLogging: boolean;

  /**
   * Whether or not to send a discord message when a player joins the game.
   */
  readonly enableJoinLogging: boolean;

  /**
   * Whether or not to send a discord message when a player leaves the game.
   */
  readonly enableLeaveLogging: boolean;

  /**
   * Whether or not to send a discord message when a console message is sent.
   */
  readonly enableConsoleMessageLogging: boolean;

  /**
   * Whether or not to send a discord message when a player dies.
   */
  readonly enableDeathMessageLogging: boolean;

  /**
   * Whether or not to send a discord message when a player uses a command.
   */
  readonly enableCommandLogging: boolean;

  /**
   * Enable the discord relay feature.
   */
  readonly enableRelay: boolean;
}

export { BridgeProperties };
