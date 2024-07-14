import {computed, ref, Ref, ComputedRef, watchEffect, reactive, watch, Reactive, toRefs} from "vue";
import {UCCompiledRules, UCRuleStrings, UrlCleaner} from "@alttiri/string-magic";
import {sleep} from "@alttiri/util-js";
import {InputUrlEntry, parseUrlEntries} from "./url-parser";
import {InputUrlEntryEx, UrlEntry} from "./url-entry";
import {urlFilter} from "./filters";


export const NEVER_VISITED_TIME = -1;

export const inputText: Ref<string> = ref("");
export const messagePopupEntry: Ref<UrlEntry | null> = ref(null);
export const tagsPopupEntry:    Ref<UrlEntry | null> = ref(null);
export const clickedUrls = ref(new Set<string>());
export const showAutoClickPopup  = ref<boolean>(false);
export const showUrlCleanerPopup = ref<boolean>(false);
export const resetAutoClickPopupRequested = ref<boolean>(false);
export const resetUrlCleanerPopupRequested = ref<boolean>(false);
export async function resetACPopup() {
    resetAutoClickPopupRequested.value = true;
    if (showAutoClickPopup.value) {
        showAutoClickPopup.value = false;
        await sleep();
        showAutoClickPopup.value = true;
    }
}
export async function resetUCPopup() {
    resetUrlCleanerPopupRequested.value = true;
    if (showUrlCleanerPopup.value) {
        showUrlCleanerPopup.value = false;
        await sleep();
        showUrlCleanerPopup.value = true;
    }
}

export const editable   = ref(true);
export const appendable = ref(true);

export type LastClickedInfo = {
    index: number,
    entry: UrlEntry,
    elem:  HTMLTableRowElement,
};
export const lastClickedInfo: Ref<LastClickedInfo | null> = ref(null);


// todo "inline"
function useLocalStorageObject<T extends object>(itemName: string, defaultValue: T): Reactive<T> {
    const lsValue: string | null = localStorage.getItem(itemName);
    const object = reactive(lsValue === null ? defaultValue : JSON.parse(lsValue));
    watch(object,() => {
        localStorage.setItem(itemName, JSON.stringify(object));
    });
    return object;
}

export const commonSettings = toRefs(useLocalStorageObject("href-lister-common-settings", {
    useCleaner:  true,
    useOriginer: true,
}));

export const clickerSettings = toRefs(useLocalStorageObject("href-lister-clicker-settings", {
    delay: 1,
    count: 0,
}));

export const urlCleanerSettings = toRefs(useLocalStorageObject("href-lister-url-cleaner-settings", {
    ucRuleStrings:   [] as UCRuleStrings,
    ucCompiledRules: {ruleRecords: {}, ruleRecordsWC: null} as UCCompiledRules,
}));
export type UCSettings = typeof urlCleanerSettings;

const cleaner = ref(UrlCleaner.fromRuleRecords(urlCleanerSettings.ucCompiledRules.value));
watch(urlCleanerSettings.ucCompiledRules, () => {
    cleaner.value = UrlCleaner.fromRuleRecords(urlCleanerSettings.ucCompiledRules.value);
});

// todo default: ["site:cdn.discordapp.com", "trim-search-params:ex is hm"]
export const urlOriginSettings = toRefs(useLocalStorageObject("href-lister-url-origin-settings", {
    ucRuleStrings:   [] as UCRuleStrings,
    ucCompiledRules: {ruleRecords: {}, ruleRecordsWC: null} as UCCompiledRules,
}));

const origin = ref(UrlCleaner.fromRuleRecords(urlOriginSettings.ucCompiledRules.value));
watch(urlOriginSettings.ucCompiledRules, () => {
    origin.value = UrlCleaner.fromRuleRecords(urlOriginSettings.ucCompiledRules.value);
});

const {useCleaner, useOriginer} = commonSettings;
export const urlEntryList: Ref<UrlEntry[]> = ref([]);
watchEffect(async () => {
    const urlEntries: InputUrlEntry[] = parseUrlEntries(inputText.value);
    const urlInfos: UrlEntry[] = [];
    for (const urlEntry of urlEntries) {
        urlEntry.url    = useCleaner.value  ? cleaner.value.clean(urlEntry.url) : urlEntry.url;
        const urlOrigin = useOriginer.value ?  origin.value.clean(urlEntry.url) : urlEntry.url;
        if (urlOrigin !== urlEntry.url) {
            (urlEntry as InputUrlEntryEx).urlOrigin = urlOrigin;
        }
        urlInfos.push(await UrlEntry.getInstance(urlEntry));
    }
    urlEntryList.value = urlInfos;
});

export const urlEntryListFiltered: ComputedRef<UrlEntry[]> = computed(() => {
    return urlEntryList.value.filter(ue => urlFilter.value(ue.url));
});

export const urlsFiltered: ComputedRef<string[]> = computed(() => {
    const urls = urlEntryListFiltered.value.map(ue => ue.url);
    // @ts-ignore
    globalThis.__urls = urls;
    return urls;
});


if (location.href === "http://localhost:5173/") {
    inputText.value =
          "http://localhost:5173/ asdf\n"
        + "http://localhost:5173/#qqq\n"
        + "http://localhost:5173/#qqq\n"
        + "http://localhost:5173/#www\n"
     // + "http://localhost:5173/#qwe #qwerty1qwerty2qwerty3qwerty4qwerty5qwerty6\n"
}
