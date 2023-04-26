import {computed, ref, Ref, ComputedRef, watchEffect} from "vue";
import {urlFilter} from "./filters";
import {InputUrlEntry, parseUrlEntries} from "./url-parser";
import {UrlInfo} from "./url-info-entry";


export const NEVER_VISITED_TIME = -1;

export const inputText: Ref<string> = ref("");
export const popupEntry:       Ref<UrlInfo | null> = ref(null);
export const lastClickedEntry: Ref<UrlInfo | null> = ref(null);
export const clickedUrls = ref(new Set<string>());

export const urlEntryList: Ref<UrlInfo[]> = ref([]);
watchEffect(async () => {
    const urlEntries: InputUrlEntry[] = parseUrlEntries(inputText.value);
    const urlInfos: UrlInfo[] = [];
    for (const urlEntry of urlEntries) {
        urlInfos.push(await UrlInfo.getInstance(urlEntry));
    }
    urlEntryList.value = urlInfos;
});

export const urlEntryListFiltered: ComputedRef<UrlInfo[]> = computed(() => {
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
     // + "http://localhost:5173/#qwe #qwerty1qwerty2qwerty3qwerty4qwerty5qwerty6\n"
}
