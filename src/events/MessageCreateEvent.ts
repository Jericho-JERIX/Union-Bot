import { Message, OmitPartialGroupDMChannel } from "discord.js";

const timeRegex = /[0-9]{2}(:|.)[0-9]{2}/g;

export default class MessageCreateEvent {
    constructor() {}

    async handle(message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
        if (message.content.match(timeRegex)) {
            await this.replyRelatedTimezone(message);
        }
    }

    async replyRelatedTimezone(message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
        const matches = message.content.matchAll(timeRegex);
        console.log("Reply related timezone", Array.from(times));
        
    }
}