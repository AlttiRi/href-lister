export type InputUrlEntry = {
    url: string,
    inputComment?: string,
}

// todo add tests
export function parseUrlEntries(text: string): InputUrlEntry[] {
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    const urls: InputUrlEntry[] = [];
    for (const line of lines) {
        const [main, ...comments] = line.split(/\s+(#|\/\/)/);
        const [firstWord, ...words] = main.trim().split(/\s+/);

        if (firstWord.startsWith("http")) {
            const url = matchUrl(firstWord);
            if (url && words.every(word => !matchUrl(word))) {
                urls.push({
                    url,
                    inputComment: [...words, ...comments].join(" ")
                });
                continue;
            }
            if (url) {
                urls.push({url});
            }
        } else {
            words.unshift(firstWord);
        }

        for (const word of words) {
            const url = matchUrl(word);
            if (url) {
                urls.push({url});
            }
        }
    }
    return urls;
}

function matchUrl(word: string) {
    const match = word.match(/(['"]?)(?<url>https?:\/\/[^\s"]+)(\1)/);
    console.log(match);
    if (match?.groups) {
        return match.groups.url;
    }
}
