import {sleep} from "@alttiri/util-js";

export function getColorPairs(startTime: number): {rgbFromToPairs: NumPair[], endTime: number} {
    const now = Date.now();
    const min0 = [45, 255, 45];
    const min1 = [228, 228, 0];
    let endTime = startTime + 1000 * 2;
    if (now < endTime) {
        return {rgbFromToPairs: zip(min0, min1), endTime};
    }
    const min60 = [45, 45, 228];
    endTime = startTime + 1000 * 5;
    if (now < endTime) {
        return {rgbFromToPairs: zip(min1, min60), endTime};
    }
    return {rgbFromToPairs: zip(min1, min60), endTime: -1};
}


type NumPair = [number, number];

export function getCurrentNums(fromToPairs: NumPair[], startTime: number, endTime: number, offset: number = 0): number[] {
    let now = Date.now();
    let progress = (now - startTime - offset) / (endTime - startTime - offset);
    console.log(endTime - startTime);
    if (progress > 1) {
        progress = 1;
    }
    const newValues = fromToPairs.map(([startValue, endValue]) => {
        return Math.trunc(startValue + (endValue - startValue) * progress);
    });
    return [...newValues, progress];
}

function zip(a: number[], b: number[]): NumPair[] {
    return a.map((a, index) => [a, b[index]]);
}

// const backgroundColor = ref("transparent");
// <div class="color-demo" :style="`background-color: ${backgroundColor}`"></div>
;(async function() {
    const startTime = Date.now();
    let {rgbFromToPairs, endTime} = getColorPairs(startTime);
    let offset = 0;
    while (endTime !== -1) {
        const [r, g, b, progress] = getCurrentNums(rgbFromToPairs, startTime, endTime, offset);
        console.log(`rgb(${r}, ${g}, ${b})`);
        // backgroundColor.value = `rgb(${r}, ${g}, ${b})`;
        if (progress === 1) {
            offset = Date.now() - startTime;
            ({rgbFromToPairs, endTime} = getColorPairs(startTime));
        }
        await sleep(100);
    }
})();

// .color-demo {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
// }
