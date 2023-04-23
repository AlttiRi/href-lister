import {computed, ref, Ref, ComputedRef, reactive, UnwrapNestedRefs} from "vue";
import {urlFilter} from "./core-filters";

export const inputText: Ref<string> = ref("");

if (location.href === "http://localhost:5173/") {
    inputText.value =
        "http://localhost:5173/ asdf\n" +
        "http://localhost:5173/#qwe #qwerty1qwerty2qwerty3qwerty4qwerty5qwerty6\n" +
        "http://localhost:5173/#qqq"
}

export const INITIAL_VISIT_TIME = -1;
export const NEVER_VISITED_TIME = -2;

export type UrlEntry = {
    url: string,
    comment?: string,
    commentFromStore?: string,
}

export const popupEntry: Ref<UrlEntry | null> = ref(null);
export const lastClickedEntry: Ref<UrlEntry | null> = ref(null);

export const urlEntryList: ComputedRef<UnwrapNestedRefs<UrlEntry[]>> = computed(() => {
    const urlEntries = parseUrlEntries(inputText.value);
    const reactiveUrlEntries = reactive(urlEntries);
    console.log(urlEntries, reactiveUrlEntries);
    return reactiveUrlEntries;
});
export const urlEntryListFiltered: ComputedRef<UrlEntry[]> = computed(() => {
    return urlEntryList.value.filter(ue => urlFilter.value(ue.url));
});

export const urls: ComputedRef<string[]> = computed(() => {
    return urlEntryList.value.map(ue => ue.url);
});
export const urlsFiltered: ComputedRef<string[]> = computed(() => {
    return urlEntryListFiltered.value.map(ue => ue.url);
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
