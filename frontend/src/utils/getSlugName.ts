type WordDictionary = {
    [key: string]: string;
};

export const getSlugName = (word: string): string => {
    let answer = '';
    const dictionary: WordDictionary = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'zh',
        з: 'z',
        и: 'i',
        й: 'y',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'c',
        ч: 'ch',
        ш: 'sh',
        щ: 'sch',
        ь: '',
        ы: 'y',
        ъ: '',
        э: 'e',
        ю: 'yu',
        я: 'ya',
        ' ': '-',
    };

    const str = word
        .toLowerCase()
        .replace(/[~`!@#$%^&*()+={}[\];:'"<>.,/\\?№_|]/g, '');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < str.length; ++i) {
        if (dictionary[str[i]] !== undefined) {
            answer += dictionary[str[i]];
        } else {
            answer += str[i];
        }
    }

    return answer;
};
