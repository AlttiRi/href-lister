import {createStore, del, get, set, entries} from "idb-keyval";
import {InputUrlEntry} from "./url-parser";
import {toRaw} from "vue";


const urlInfoStore = createStore("HrefListerUrlInfo", "UrlInfo");

export type UrlInfoState = {
    comment?: string,
    visited?: number,
    tags?: string[],
}

export class UrlInfo {
    static stateMap = new Map<string, UrlInfoState>();
    private readonly state: UrlInfoState;
    readonly url: string;
    readonly inputComment?: string;
    readonly initialVisited?: number;
    constructor(url: string, state: UrlInfoState, inputComment?: string) {
        this.url = url;
        this.state = state;
        if (inputComment) {
            this.inputComment = inputComment;
        }
        if (state.visited) {
            this.initialVisited = state.visited;
        }
    }
    static async getInstance({url, inputComment}: InputUrlEntry): Promise<UrlInfo> {
        let state = UrlInfo.stateMap.get(url);
        if (state) {
            return new UrlInfo(url, state, inputComment);
        }
        state = await get(url, urlInfoStore);
        if (state === undefined) {
            state = {};
        }
        UrlInfo.stateMap.set(url, state);
        return new UrlInfo(url, state, inputComment);
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
            return del(this.url, urlInfoStore);
        }
        return set(this.url, toRaw(this.state), urlInfoStore);
    }
}


// The old stores
const commentsStore = createStore("HrefListerComments", "Comments");
const visitsStore = createStore("HrefLister", "Visits");
Object.assign(globalThis, {
    idb: {
        createStore, del, get, set, entries,
        commentsStore, // await idb.entries(idb.commentsStore)
        visitsStore,   // await idb.entries(idb.visitsStore)
        urlInfoStore,  // await idb.get("http://localhost:5173/")
    },
    UrlInfo,
});

