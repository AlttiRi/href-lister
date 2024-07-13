import {computed} from "vue";
import {clickedUrls, urlsFiltered} from "./core";
import {hashString} from "@alttiri/util-js";


export const hash = computed<string>(() => {
    const joinedUrls = [...new Set(urlsFiltered.value)].sort().join(" ");
    return Math.abs(hashString(joinedUrls)).toString(16).slice(-8).padStart(8, "0").toUpperCase();
});

export type UrlCount = {
    count: number,
    uniqueCount: number,
};

export const urlsCount = computed<UrlCount>(() => {
    const urls = urlsFiltered.value;
    const count = urls.length;
    const uniqueCount = new Set(urls).size;
    return {count, uniqueCount};
});

export const clickedUrlsCount = computed<UrlCount>(() => {
    let count = 0;
    const set = new Set();
    for (const url of urlsFiltered.value) {
        if (clickedUrls.value.has(url)) {
            count++;
            set.add(url);
        }
    }
    return {count, uniqueCount: set.size};
});
