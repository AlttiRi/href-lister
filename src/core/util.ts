export function throttle<A extends any[]>(runnable: (...args: A) => any, time = 50): (...args: A) => void {
    let waiting = false;
    let queued  = false;
    let context: any;
    let args: A;

    function cb() {
        if (queued) {
            setTimeout(cb, time);
            runnable.apply(context, args);
        } else {
            waiting = false;
        }
        queued = false;
    }

    return function(this: any, ...current_args: A) {
        if (!waiting) {
            waiting = true;
            setTimeout(cb, time);
            runnable.apply(this, current_args);
        } else {
            context = this;
            args = current_args;
            queued = true;
        }
    }
}

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

/**
 * `hashCode` like
 * @example
 * hashString("Qwerty") === -1862984904
 * hashString("A") === 65
 * @param {string} str
 * @return {number}
 */
export function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = Math.imul(Math.imul(31, hash) + str.charCodeAt(i), 1);
    }
    return hash;
}
