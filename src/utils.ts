import {
    TJsonaIncludeNamesChain,
    TJsonaNormalizedIncludeNamesTree
} from './JsonaTypes';

export function createIncludeNamesTree(
    namesChain: TJsonaIncludeNamesChain,
    includeTree: TJsonaNormalizedIncludeNamesTree,
): void {
    const namesArray = namesChain.split('.');
    const currentIncludeName = namesArray.shift();
    const chainHasMoreNames = namesArray.length;

    let subTree = null;

    if (chainHasMoreNames) {
        subTree = includeTree[currentIncludeName] || {};
        createIncludeNamesTree(namesArray.join('.'), subTree);
    }

    includeTree[currentIncludeName] = subTree;
}

export function jsonParse(stringified: string): Object {
    let parsed;

    try {
        parsed = JSON.parse(stringified);
    } catch (e) {
        parsed = {};
        console.warn(e);
    }

    return parsed;
}

// https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/isPlainObject.md
export const isPlainObject = (val) => !!val && typeof val === 'object' && val.constructor === Object;

// https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/transform.md
export const transform = (obj, fn, acc) => Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);