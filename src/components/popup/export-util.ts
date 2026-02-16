import {hashString} from "@alttiri/util-js";

export function entriesToLineJsonParts(entries: [string, any][]): string[] {
    const jsonParts: string[] = [];
    jsonParts.push("[\n");
    for (const [k, v] of entries) {
        jsonParts.push(`["${k}",${JSON.stringify(v)}],\n`);
    }
    if (jsonParts.length > 1) {
        jsonParts[jsonParts.length - 1] = jsonParts[jsonParts.length - 1].replace(",\n", "\n");
    }
    jsonParts.push("]");
    return jsonParts;
}

export function hashUrls(urls: string[]): string {
    const joinedUrls = [...new Set(urls)].sort().join(" ");
    return Math.abs(hashString(joinedUrls)).toString(16).slice(-8).padStart(8, "0").toUpperCase();
}
export function getListHostname(urls: string[]): string {
    if (!urls.length) {
        return "";
    }
    const firstHostname = getMainHostname(urls[0]);
    if (urls.length === 1) {
        return firstHostname;
    }
    for (const url of urls) {
        if (firstHostname !== getMainHostname(url)) {
            return "";
        }
    }
    return firstHostname;
}
function getMainHostname(url: string): string {
    const hostname = new URL(url).hostname;
    return hostname.split(".").slice(-2).join(".");
}
