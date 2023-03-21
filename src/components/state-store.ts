import {createStore, del, get, set} from "idb-keyval";

const commentsStore = createStore("HrefListerComments", "Comments");
export function saveComment(url: string, comment: string) {
    void set(url, comment, commentsStore);
}
export function loadComment(url: string) {
    return get(url, commentsStore);
}


const visitsStore = createStore("HrefLister", "Visits");
export function setVisit(url: string, value: number) {
    return set(url, value, visitsStore);
}
export function getVisit(url: string) {
    return get(url, visitsStore);
}
export function removeVisit(url: string) {
    return del(url, visitsStore);
}
