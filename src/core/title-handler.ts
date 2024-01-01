import {computed, watchEffect} from "vue";
import {clickedUrls, urlsFiltered} from "./core";
import {hashString} from "./util";


const clickedUrlsCount = computed(() => {
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

watchEffect(() => {
    const urls = urlsFiltered.value;
    const count = urls.length;
    if (!count) {
        document.title = "HrefLister";
        return;
    }

    const joinedUrls = [...new Set(urls)].sort().join(" ");
    const hash = Math.abs(hashString(joinedUrls)).toString(16).slice(-8).padStart(8, "0").toUpperCase();

    const uniqueCount = new Set(urls).size;
    const mainText = `HrefLister — ${formatCounts(count, uniqueCount)} #${hash}`;

    if (clickedUrlsCount.value.count) {
        const {count, uniqueCount} = clickedUrlsCount.value;
        document.title = `${mainText} — [ ${formatCounts(count, uniqueCount)} ]`;
        return;
    }
    document.title = mainText;
});

function formatCounts(count: number, uniqueCount: number): string {
    let countText = count.toString();
    const hasDuplicates = uniqueCount !== length;
    if (hasDuplicates) {
        countText = `${countText} (${uniqueCount})`;
    }
    return countText;
}
