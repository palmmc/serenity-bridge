import { World } from "@serenityjs/world";
import { DiscordBridge } from "../bridge";
import { Properties } from "@serenityjs/serenity";
import { BridgeMessages } from "../types/messages";

class DiscordRelay {
  /**
   * Creates a new instance of the DiscordRelay class.
   * @param world The world instance to use for sending messages.
   * @param messages The messages to use for formatting.
   */
  constructor(world: World, messages: Properties<BridgeMessages>) {
    this.world = world;
    this.messages = messages;
  }

  /*
   * The world instance to use for sending messages.
   */
  public world: World;

  /*
   * The messages to use for formatting.
   */
  public messages: Properties<BridgeMessages>;

  /**
   * Handles the discord relay feature.
   */
  handleRelay() {
    DiscordBridge.client.on("messageCreate", (data) => {
      if (data.author.bot === true) return;
      this.world.sendMessage(
        this.messages
          .getValue("discordRelayFormat")
          .replace("{USERNAME}", data.author.username)
          .replace("{MESSAGE}", data.content)
      );
    });
  }
}

export { DiscordRelay };
