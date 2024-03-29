import {ref} from "vue";
import {UrlEntry} from "./url-entry";


function loadTags(): string[] {
    return JSON.parse(localStorage.getItem("href_lister_all_tags") || "[]");
}


export const allTags = ref(loadTags());
export function addTag(tag: string) {
    if (!allTags.value.includes(tag)) {
        allTags.value.push(tag);
    }
}
export function removeTag(tag: string) {
    const index = allTags.value.indexOf(tag);
    if (index !== -1) {
        allTags.value.splice(index, 1);
    }
}

/** An `entry` and one its `tag` */
export type TagWrap = {
    entry: UrlEntry,
    tag:   string,
};
