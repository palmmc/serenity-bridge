interface BridgeMessages {
  /**
   * Server Start Message Format
   */
  readonly serverStartFormat: string;
  /**
   * Server Stop Message Format
   */
  readonly serverStopFormat: string;
  /**
   * Chat Message Format
   */
  readonly chatFormat: string;
  /**
   * Join Message Format
   */
  readonly joinFormat: string;
  /**
   * Leave Message Format
   */
  readonly leaveFormat: string;
  /**
   * Console Message Format
   */
  readonly consoleMessageFormat: string;
  /**
   * Standard Death Message Format
   */
  readonly deathFormat: string;
  /**
   * Death by Player Message Format
   */
  readonly killedByFormat: string;
  /**
   * Command Executed Message Format
   */
  readonly commandExecutedFormat: string;
  /**
   * Discord Relay Message Format
   */
  readonly discordRelayFormat: string;
}

export { BridgeMessages };
