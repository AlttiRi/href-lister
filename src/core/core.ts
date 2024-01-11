import {computed, ref, Ref, ComputedRef, watchEffect} from "vue";
import {UrlEntry} from "./url-entry";
import {InputUrlEntry, parseUrlEntries} from "./url-parser";
import {urlFilter} from "./filters";
import {sleep} from "@alttiri/util-js";


export const NEVER_VISITED_TIME = -1;

export const inputText: Ref<string> = ref("");
export const messagePopupEntry: Ref<UrlEntry | null> = ref(null);
export const tagsPopupEntry:    Ref<UrlEntry | null> = ref(null);
export const clickedUrls = ref(new Set<string>());
export const showAutoClickPopup = ref<boolean>(false);
export const resetAutoClickPopupRequested = ref<boolean>(false);
export async function resetPopup() {
    resetAutoClickPopupRequested.value = true;
    if (showAutoClickPopup.value) {
        showAutoClickPopup.value = false;
        await sleep();
        showAutoClickPopup.value = true;
    }
}

export type LastClickedInfo = {
    index: number,
    entry: UrlEntry,
    elem:  HTMLTableRowElement,
};
export const lastClickedInfo: Ref<LastClickedInfo | null> = ref(null);

export const urlEntryList: Ref<UrlEntry[]> = ref([]);
watchEffect(async () => {
    const urlEntries: InputUrlEntry[] = parseUrlEntries(inputText.value);
    const urlInfos: UrlEntry[] = [];
    for (const urlEntry of urlEntries) {
        urlInfos.push(await UrlEntry.getInstance(urlEntry));
    }
    urlEntryList.value = urlInfos;
});

export const urlEntryListFiltered: ComputedRef<UrlEntry[]> = computed(() => {
    return urlEntryList.value.filter(ue => urlFilter.value(ue.url));
});

export const urlsFiltered: ComputedRef<string[]> = computed(() => {
    return urlEntryListFiltered.value.map(ue => ue.url);
});


if (location.href === "http://localhost:5173/") {
    inputText.value =
          "http://localhost:5173/ asdf\n"
        + "http://localhost:5173/#qqq\n"
        + "http://localhost:5173/#qqq\n"
        + "http://localhost:5173/#www\n"
     // + "http://localhost:5173/#qwe #qwerty1qwerty2qwerty3qwerty4qwerty5qwerty6\n"
}
