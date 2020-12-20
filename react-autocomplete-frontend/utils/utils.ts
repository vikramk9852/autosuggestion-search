
export function findAllOccurences(str: string, substr: string) {
    let regex = new RegExp(substr);
    let result, indices = [];
    while ((result = regex.exec(str))) {
        indices.push(result.index);
    }

    return indices;
}
