import {computed, ComputedRef, Ref, ref} from "vue";
import {defaultFilterSettings as settings} from "./settings";


export const input_only:   Ref<string> = ref(settings.input_only);
export const input_ignore: Ref<string> = ref(settings.input_ignore);

const matcher = computed(() => {
    let onlyParts   =   input_only.value.trim().split(/\s+/g).filter(o => o);
    let ignoreParts = input_ignore.value.trim().split(/\s+/g).filter(o => o);
    if (!settings.case_sensitive) {
        onlyParts   =   onlyParts.map(text => text.toLowerCase());
        ignoreParts = ignoreParts.map(text => text.toLowerCase());
    }

    let matchOnly:   (url: string) => boolean;
    let matchIgnore: (url: string) => boolean;
    if (!settings.case_sensitive) {
        matchOnly   = (url: string) =>   onlyParts.some(text => url.toLowerCase().includes(text));
        matchIgnore = (url: string) => ignoreParts.some(text => url.toLowerCase().includes(text));
    } else {
        matchOnly   = (url: string) =>   onlyParts.some(text => url.includes(text));
        matchIgnore = (url: string) => ignoreParts.some(text => url.includes(text));
    }
    return {matchOnly, matchIgnore, onlyParts, ignoreParts};
});

type FilterPredicate = (url: string) => boolean;
export const urlFilter: ComputedRef<FilterPredicate> = computed(() => {
    const {matchOnly, matchIgnore, onlyParts} = matcher.value;

    if (!settings.input_only_disabled && onlyParts.length) {
        if (!settings.reverse_input_only) {
            return (url: string) => matchOnly(url);
        } else {
            return (url: string) => !matchOnly(url);
        }
    }
    if (!settings.input_ignore_disabled) {
        return (url: string) => !matchIgnore(url);
    }

    return (url: string) => Boolean(url);
});
