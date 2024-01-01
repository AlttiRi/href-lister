import {computed, ComputedRef, Ref, ref} from "vue";
import {UrlInfo} from "./url-info-entry";


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

export type TagProp = {
    tag: string,
    selected: boolean,
};

export class TagPropsHelper {
    public entry:   Ref<UrlInfo>;
    public tags:    ComputedRef<TagProp[]>;
    public allTags: ComputedRef<TagProp[]>;

    constructor(entry: Ref<UrlInfo>, filterText: Ref<string>) {
        this.entry = entry;
        this.allTags = computed(() => {
            return allTags.value.map(tag => ({
                tag,
                selected: false,
            }));
        });
        this.tags = computed(() => {
            const starts:   TagProp[] = [];
            const contains: TagProp[] = [];
            for (const tagProp of this.allTags.value) {
                const index = tagProp.tag.indexOf(filterText.value);
                if (index === -1) {
                    continue;
                }
                if (index === 0) {
                    starts.push(tagProp);
                } else {
                    contains.push(tagProp);
                }
            }
            return [starts, contains].flat();
        });
    }

    isSelected(tagAny: TagProp | string) {
        const tag: string = typeof tagAny === "string" ? tagAny : tagAny.tag;
        return this.entry.value.tags?.includes(tag);
    }

    toggleTag(tag: string): Promise<void> {
        if (this.isSelected(tag))  {
            return this.entry.value.delTag(tag);
        } else {
            return this.entry.value.addTag(tag);
        }
    }

}


// pass TagProps and TagProp in a loop

