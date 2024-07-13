export function getCodeArrays(items: string[], size = 100) {
    const jsonArray = (a: string[]) => `${a.length ? "[\"" + a.join(`", "`) + "\"]" : "[]"}`;
    if (items.length <= size) {
        return `/* ${items.length.toString().padStart(3)} */ ${jsonArray(items)},`;
    }
    const len = (num: number) => num.toString().length;
    const count = Math.trunc(items.length / size);
    const comment = items.length.toString().padStart(1 + len(items.length)) + " ".repeat(3 + len(count));
    const parts = [`/* ${comment} */`];
    for (let i = 0; i <= count; i++) {
        const part = items.slice(size * i, size + size * i);
        const page = `(${i + 1})`.padStart(2 + len(count));
        const pageCount = part.length.toString().padStart(1 + len(items.length));
        parts.push(`/* ${pageCount} ${page} */ ${jsonArray(part)},`);
    }
    return parts.join("\n");
}

export function timeAgo(ms: number) {
    const now = Date.now();
    const secs = Math.trunc((now - ms) / 1000);
    if (secs < 60) {
        return `${secs} second${secs > 1 ? "s" : ""} ago`;
    }

    if (secs < 60 * 60) {
        const m = Math.trunc(secs / 60);
        return `${m} minute${m > 1 ? "s" : ""} ago`;
    }
    if (secs < 60 * 60 * 24) {
        const m = Math.trunc(secs / 60 % 60).toString().padStart(2, "0");
        const h = Math.trunc(secs / 60 / 60);
        return `${h}:${m} ago`;
    }
    return Math.trunc(secs / 60 / 60 / 24) + " days ago";
}


const ordinals = [
    "1st", "2nd", "3rd"
];
export function ordinalIndicator(index: number | string) {
    index = Number(index);
    if (ordinals[index]) {
        return ordinals[index];
    }
    return index + 1 + "th";
}


export function downloadBlob(blob: Blob, name: string, url?: string): void {
    const anchor = document.createElement("a");
    anchor.setAttribute("download", name || "");
    const blobUrl = URL.createObjectURL(blob);
    anchor.href = blobUrl + (url ? ("#" + url) : "");
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
}

Object.assign(globalThis, {downloadBlob});

/*
// back up href-lister
let json = {};
for (const [url, value] of await idb.entries(idb.urlInfoStore)) {
    console.log([url, value])
    json[url] = value;
}
let text = JSON.stringify(json, null, " ");
downloadBlob(new Blob([text]), `[href-lister] urlInfoStore-${Date.now()}.json`);
*/
