export function throttle<A extends any[]>(runnable: (...args: A) => any, time = 50): (...args: A) => void {
    let waiting = false;
    let queued  = false;
    let context: any;
    let args: A;

    return function(this: any, ..._arguments: A) {
        if (!waiting) {
            waiting = true;
            setTimeout(function() {
                if (queued) {
                    runnable.apply(context, args);
                }
                waiting = queued = false;
            }, time);
            runnable.apply(this, _arguments);
        } else {
            context = this;
            args = _arguments;
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
