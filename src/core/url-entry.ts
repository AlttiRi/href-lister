import {toRaw} from "vue";
import {isString} from "@alttiri/util-js";
import {createStore, del, get, set, entries, setMany} from "idb-keyval";
const idb = {createStore, del, get, set, entries, setMany};
import {InputUrlEntry} from "./url-parser";


const urlInfoStore = idb.createStore("HrefListerUrlInfo", "UrlInfo"); // todo rename to `UrlEntry`

export type UrlEntryState = {
    comment?: string,
    visited?: number,
    tags?: string[],
}

export function exportUrlEntryStore(): Promise<[string, UrlEntryState][]> {
    return idb.entries(urlInfoStore);
}
export async function importUrlEntryStore(entries: [string, UrlEntryState][]): Promise<boolean> {
    if (!Array.isArray(entries)) {
        return false;
    }
    if (entries.length === 0) {
        return false;
    }
    const [k, v] = entries[0];
    if (!isString(k) || typeof v !== "object") {
        return false;
    }
    await idb.setMany(entries, urlInfoStore);
    return true;
}

export type UrlInit = {url: string, inputComment?: string, urlOrigin?: string};
export type InputUrlEntryEx = InputUrlEntry & {urlOrigin?: string};

export class UrlEntry {
    static stateMap = new Map<string, UrlEntryState>();
    private readonly state: UrlEntryState;
    readonly url: string;
    readonly inputComment?: string;
    readonly initialVisited?: number;
    readonly urlOrigin?: string;
    private constructor({url, inputComment, urlOrigin}: UrlInit, state: UrlEntryState, ) {
        this.url = url;
        this.state = state;
        if (inputComment) {
            this.inputComment = inputComment;
        }
        if (state.visited) {
            this.initialVisited = state.visited;
        }
        if (urlOrigin) {
            this.urlOrigin = urlOrigin;
        }
    }
    static async getInstance(init: InputUrlEntryEx): Promise<UrlEntry> {
        const url = init.urlOrigin || init.url;
        let state = UrlEntry.stateMap.get(url);
        if (state) {
            return new UrlEntry(init, state);
        }
        state = await idb.get(url, urlInfoStore);
        if (state === undefined) {
            state = {};
        }
        UrlEntry.stateMap.set(url, state);
        return new UrlEntry(init, state);
    }
    isEquals(target: UrlEntry | null): boolean {
        if (!target) {
            return false;
        }
        return this.state === target.state && this.inputComment === target.inputComment;
    }
    get comment() { return this.state.comment; }
    get visited() { return this.state.visited; }
    get tags()    { return this.state.tags;    }
    async setComment(comment: string) {
        this.state.comment = comment;
        await this.update();
    }
    async delComment() {
        delete this.state.comment;
        await this.update();
    }
    async setVisited(visited: number) {
        this.state.visited = visited;
        await this.update();
    }
    async delVisited() {
        delete this.state.visited;
        await this.update();
    }
    async addTag(tag: string) {
        if (!this.state.tags) {
            this.state.tags = [];
        }
        if (this.state.tags.includes(tag)) {
            return;
        }
        this.state.tags.push(tag);
        await this.update();
    }
    async delTag(tag: string) {
        if (!this.state.tags) {
            return;
        }
        const index = this.state.tags.indexOf(tag);
        if (index == -1) {
            return;
        }
        this.state.tags.splice(index, 1);
        if (this.state.tags.length === 0) {
            delete this.state.tags;
        }
        await this.update();
    }
    private update() {
        if (!Object.keys(this.state).length) {
            return idb.del(this.urlOrigin || this.url, urlInfoStore);
        }
        return idb.set(this.urlOrigin || this.url, toRaw(this.state), urlInfoStore);
    }
}


// The old stores
// const commentsStore = idb.createStore("HrefListerComments", "Comments");
// const visitsStore   = idb.createStore("HrefLister", "Visits");
Object.assign(globalThis, {
    idb: {
        createStore, del, get, set, entries,
        // commentsStore, visitsStore,
        urlInfoStore,
        // await idb.get("http://localhost:5173/", idb.urlInfoStore)
        // await idb.entries(idb.urlInfoStore)
    },
    UrlEntry,
});
