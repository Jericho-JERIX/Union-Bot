import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { getRelativeHour } from "../utils/time";

const timeRegex = /[0-9]{1,2}(:|\.)[0-9]{2}/g;

export default class MessageCreateEvent {
    constructor() { }

    async handle(message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
        if (message.author.bot) return;
        if (message.content.match(timeRegex)) {
            await this.replyRelatedTimezone(message);
        }
    }

    async replyRelatedTimezone(message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {

        let userGmt = 7;
        if (message.author.id === "240689299975176193") {
            userGmt = 0;
        } else if (message.author.id === "215459503846457354") {
            userGmt = 11;
        }

        const matches = message.content.matchAll(timeRegex);
        const matchTimes = [...matches].map(match => match[0]);
        const targetTimezone = [
            {
                label: "UTC",
                relative: 0,
                icon: ":england:"
            },
            {
                label: "GMT+7",
                relative: 7,
                icon: ":flag_th:"
            },
            {
                label: "GMT+11",
                relative: 11,
                icon: ":flag_au:"
            }
        ]
        for (const time of matchTimes) {
            const [hour, minute] = time.split(/[:.]/);

            const text = []
            for (const tz of targetTimezone) {
                let relativeHour = getRelativeHour(Number(hour), userGmt, tz.relative)
                let suffix = undefined
                if (relativeHour < 0) {
                    suffix = "เมื่อวาน"
                    relativeHour += 24
                } else if (relativeHour >= 24) {
                    suffix = "พรุ่งนี้"
                    relativeHour -= 24
                } else {
                    suffix = "วันนี้"
                }
                text.push(`${tz.icon} \`${relativeHour}:${minute} (${suffix} / ${tz.label})\``)
            }
            await message.reply(text.join("\n"));
        }

    }
}