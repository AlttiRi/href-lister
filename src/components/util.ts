export function throttle(runnable: Function, time = 50): Function {
    let waiting = false;
    let queued  = false;
    let context: any;
    let args:    any;

    return function(this: any) {
        if (!waiting) {
            waiting = true;
            setTimeout(function() {
                if (queued) {
                    runnable.apply(context, args);
                    context = args = undefined;
                }
                waiting = queued = false;
            }, time);
            runnable.apply(this, arguments);
        } else {
            context = this;
            args = arguments;
            queued = true;
        }
    }
}
