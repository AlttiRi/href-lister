export function throttle<A extends any[]>(runnable: (...args: A) => any, time = 50): (...args: A) => void {
    let waiting = false;
    let queued  = false;
    let context: any;
    let args: A;

    return function(this: any, ..._arguments: A) {
        if (!waiting) {
            waiting = true;
            setTimeout(function() {
                if (queued) {
                    runnable.apply(context, args);
                }
                waiting = queued = false;
            }, time);
            runnable.apply(this, _arguments);
        } else {
            context = this;
            args = _arguments;
            queued = true;
        }
    }
}
