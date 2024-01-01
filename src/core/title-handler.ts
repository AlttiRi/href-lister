import {computed, watchEffect} from "vue";
import {clickedUrls, urlsFiltered} from "./core";
import {hashString} from "./util";


const clickedUrlsCount = computed(() => {
    let count = 0;
    for (const url of urlsFiltered.value) {
        if (clickedUrls.value.has(url)) {
            count++;
        }
    }
    return count;
});

watchEffect(() => {
    const urls = urlsFiltered.value;
    const length = urls.length;
    if (!length) {
        document.title = "HrefLister";
        return;
    }

    const uniqueCount = new Set(urls).size;
    const hasDuplicates = uniqueCount !== length;

    let countText = length.toString();
    if (hasDuplicates) {
        countText = `${countText} (${uniqueCount})`;
    }

    const joinedUrls = [...new Set(urls)].sort().join(" ");
    const hash = Math.abs(hashString(joinedUrls)).toString(16).slice(-8).padStart(8, "0").toUpperCase();

    if (clickedUrlsCount.value) {
        document.title = `HrefLister — ${countText} #${hash} — [${clickedUrlsCount.value}]`;
        return;
    }
    document.title = `HrefLister — ${countText} #${hash}`;
});
