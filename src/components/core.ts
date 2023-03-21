import {computed, ref, Ref, ComputedRef, reactive, UnwrapNestedRefs} from "vue";

export const inputText: Ref<string> = ref("");

export type UrlEntry = {
    url: string,
    comment?: string,
    commentFromStore?: string,
}

export const popupEntry: Ref<UrlEntry | null> = ref(null);

export const urlEntryList: ComputedRef<UnwrapNestedRefs<UrlEntry[]>> = computed(() => {
    const urlEntries = parseUrlEntries(inputText.value);
    const reactiveUrlEntries = reactive(urlEntries);
    console.log(urlEntries, reactiveUrlEntries);
    return reactiveUrlEntries;
});

export const urls: ComputedRef<string[]> = computed(() => {
    return urlEntryList.value.map(ue => ue.url);
});


// todo add tests
export function parseUrlEntries(text: string) {
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    const urls: UrlEntry[] = [];
    for (const line of lines) {
        const [main, ...comments] = line.split(/\s+(#|\/\/)/);
        const [firstWord, ...words] = main.trim().split(/\s+/);

        if (firstWord.startsWith("http")) {
            const url = matchUrl(firstWord);
            if (url && words.every(word => !matchUrl(word))) {
                urls.push({
                    url,
                    comment: [...words, ...comments].join(" ")
                });
                continue;
            }
            if (url) {
                urls.push({url});
            }
        } else {
            words.unshift(firstWord);
        }

        for (const word of words) {
            const url = matchUrl(word);
            if (url) {
                urls.push({url});
            }
        }
    }
    return urls;
}

function matchUrl(word: string) {
    const match = word.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);
    console.log(match);
    if (match?.groups) {
        return match.groups.url;
    }
}

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
