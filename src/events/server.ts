import { Properties, Serenity } from "@serenityjs/serenity";
import { DiscordBridge } from "../bridge";
import { BridgeMessages } from "../types/messages";
import { BridgeProperties } from "../types/properties";
import { Player, WorldEvent } from "@serenityjs/world";

class BridgeEvents {
  /**
   * Creates a new instance of the BridgeEvents class.
   * @param serenity The serenity server instance to use for sending messages.
   */
  constructor(serenity: Serenity) {
    this.serenity = serenity;
  }

  /**
   * The serenity server instance to use for sending messages.
   */
  public serenity: Serenity;

  onStart() {
    // Server start message.
    if (
      DiscordBridge.properties.getValue("enableServerStartMessage") === true
    ) {
      let message = DiscordBridge.messages.getValue("serverStartFormat");
      DiscordBridge.sendMessage(message);
    }
  }

  onChat() {
    // Log chat messages.
    this.serenity.worlds.on(WorldEvent.PlayerChat, (data) => {
      if (DiscordBridge.properties.getValue("enableChatLogging") === true) {
        let message = DiscordBridge.messages
          .getValue("chatFormat")
          .replace("{USERNAME}", data.player.username)
          .replace("{MESSAGE}", data.message);
        DiscordBridge.sendMessage(message);
      }
    });
  }

  onJoin() {
    // Log player join messages.
    this.serenity.worlds.on(WorldEvent.PlayerJoin, (data) => {
      if (DiscordBridge.properties.getValue("enableJoinLogging") === true) {
        let message = DiscordBridge.messages
          .getValue("joinFormat")
          .replace("{USERNAME}", data.player.username);
        DiscordBridge.sendMessage(message);
      }
    });
  }

  onLeave() {
    // Log player leave messages.
    this.serenity.worlds.on(WorldEvent.PlayerLeave, (data) => {
      if (DiscordBridge.properties.getValue("enableLeaveLogging") === true) {
        let message = DiscordBridge.messages
          .getValue("leaveFormat")
          .replace("{USERNAME}", data.player.username);
        DiscordBridge.sendMessage(message);
      }
    });
  }

  onConsoleMessage() {
    // Log console messages.
    this.serenity.worlds.on(WorldEvent.WorldMessage, (data) => {
      if (
        DiscordBridge.properties.getValue("enableConsoleMessageLogging") ===
        true
      ) {
        let message = DiscordBridge.messages
          .getValue("consoleMessageFormat")
          .replace("{MESSAGE}", data.message);
        DiscordBridge.sendMessage(message);
      }
    });
  }

  onDeath() {
    // Log player death messages.
    this.serenity.worlds.on(WorldEvent.EntityDie, (data) => {
      if (
        DiscordBridge.properties.getValue("enableDeathMessageLogging") === true
      ) {
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
        if (DiscordBridge.messages.getValue("deathFormat") && !attacker)
          message = DiscordBridge.messages
            .getValue("deathFormat")
            .replace("{USERNAME}", entity.username);
        else if (DiscordBridge.messages.getValue("killedByFormat") && attacker)
          message = DiscordBridge.messages
            .getValue("killedByFormat")
            .replace("{USERNAME}", entity.username)
            .replace("{ATTACKER}", attacker.username);
        DiscordBridge.sendMessage(message);
      }
    });
  }

  onCommand() {
    // Log player command messages.
    this.serenity.worlds.on(WorldEvent.PlayerExecuteCommand, (data) => {
      if (DiscordBridge.properties.getValue("enableCommandLogging") === true) {
        let message = DiscordBridge.messages
          .getValue("commandExecutedFormat")
          .replace("{USERNAME}", data.player.username)
          .replace("{COMMAND}", data.command);
        DiscordBridge.sendMessage(message);
      }
    });
  }
}

export { BridgeEvents };
