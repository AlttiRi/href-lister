import {watchEffect} from "vue";
import {urlEntryListFiltered} from "./core";

watchEffect(() => {
    const length = urlEntryListFiltered.value.length;
    if (!length) {
        document.title = "HrefLister";
        return;
    }
    document.title = "HrefLister — " + length.toString();
});
