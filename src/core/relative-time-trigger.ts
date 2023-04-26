import {onUnmounted, Ref, triggerRef, watch} from "vue";

const MINUTE = 1000 * 60;
const TEN_MINUTES = MINUTE * 10;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export class RefTriggerTimer {
    private readonly timeRef: Ref<number>;
    private timerId?: number;
    constructor(timeRef: Ref<number>) {
        this.timeRef = timeRef;
        watch(timeRef,(value) => { // Ignores `triggerRef` in comparison with `watchEffect`, watches only direct `.value` changing
            if (value > 0) {
                this.setTimer();
            }
        });
        onUnmounted(() => {
            this.clearTimer()
        });
    }
    setTimer() {
        this.clearTimer();
        const diff = Date.now() - this.timeRef.value;
        let time: number;
        if (diff < TEN_MINUTES) {
            time = MINUTE;
        } else if (diff < HOUR) {
            time = TEN_MINUTES;
        } else if (diff < DAY) {
            time = HOUR;
        } else {
            return;
        }
        this.timerId = setTimeout(() => {
            triggerRef(this.timeRef);
            this.setTimer();
        }, time);
    }
    clearTimer() {
        clearTimeout(this.timerId);
    }
    forceTrigger() {
        triggerRef(this.timeRef);
        this.setTimer();
    }
}


// import {Ref, watchEffect} from "vue";
//
// const less_minute_refs: Ref<number>[] = [];
// const less_hour_refs: Ref<number>[] = [];
// const less_day_refs: Ref<number>[] = [];
// const other_refs: Ref<number>[] = [];
// export function addTimeRef(timeRef: Ref<number>) {
//     const now = Date.now();
//     watchEffect(() => {
//         if (timeRef.value > 0 && !refs.includes(timeRef)) {
//             refs.push(timeRef);
//         }
//     });
// }
