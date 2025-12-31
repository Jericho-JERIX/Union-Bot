import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { BaseInteraction } from "discord.js";
import { SlashCommandObject } from "./types/DiscordSlashCommand/SlashCommandObject";
import { slashCommandList } from "./commands";
import { getSlashCommandObject } from "./utils/slash-command";
import MessageCreateEvent from "./events/MessageCreateEvent";

dotenv.config();
let commands: SlashCommandObject;
let messageCreateEvent = new MessageCreateEvent();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMessages,
  ],
});

client.once(Events.ClientReady, async (client) => {
  console.log(`✅ Ready! Logged in as ${client.user?.tag}`);
  commands = getSlashCommandObject(slashCommandList);
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
  if (interaction.isChatInputCommand()) {
    await commands[interaction.commandName].onCommandExecuted(interaction);
  } else if (interaction.isButton()) {
    await commands[
      String(interaction.message.interaction?.commandName)
    ].onButtonPressed?.(interaction);
  } else if (interaction.isStringSelectMenu()) {
    await commands[
      String(interaction.message?.interaction?.commandName)
    ].onMenuSelected?.(interaction);
  } else if (interaction.isAutocomplete()) {
    await commands[String(interaction.commandName)].onAutoCompleteInputed?.(
      interaction
    );
  }
});

client.on("messageCreate", async (message) => {
  await messageCreateEvent.handle(message);
});

client.login(process.env.TOKEN);
