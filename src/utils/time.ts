import { RelatedTimezone } from "../types/time";

function getRelatedTimezone(hhmm: string, gmt: number): RelatedTimezone[] {
    const [hh, mm] = hhmm.split(/[:.]/);
    const timezoneList = [0,7,11]

    const result: RelatedTimezone[] = [];
    for (const timezone of timezoneList) {
        const utc = gmt * 60;
        const totalMinutes = parseInt(hh) * 60 + parseInt(mm);
        const relatedTimezone = totalMinutes - utc;
        result.push({
            time: `${hh}:${mm}`,
            gmt: timezone,
            isYesterday: false,
            isTomorrow: false,
        });
    }
    return result;
}