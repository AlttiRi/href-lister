import {computed, ref, Ref} from "vue";

export const inputText: Ref<string> = ref("");

export const urls: Ref<string[]> = computed(() => {
    const lines = inputText.value.split("\n").map(line => line.trim()).filter(line => line);
    const urls: string[] = [];
    for (const line of lines) {
        const main = line.split(/\s+(#|\/\/)/)[0]; // trim comments
        const words = main.trim().split(/\s+/);
        for (const word of words) {
            const match = word.match(/(['"]?)(?<url>https?:\/\/\S+)(\1)/);
            if (match?.groups) {
                urls.push(match.groups.url);
            }
        }
    }
    return urls;
});

export function getCodeArrays(items: string[], size = 100) {
    const jsonArray = (a: string[]) => `${a.length ? "[\"" + a.join(`", "`) + "\"]" : "[]"}`;
    if (items.length <= size) {
        return `/* ${items.length.toString().padStart(3)} */ ${jsonArray(items)},`;
    }
    const len = (n: number) => n.toString().length;
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
