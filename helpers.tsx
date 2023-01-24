const powerSet = (arr: number[]) => {
    // the power set of [] is [[]]
    if (arr.length === 0) {
        return [[]]
    }

    // remove and remember the last element of the array
    var lastElement = arr.pop()

    // take the powerset of the rest of the array
    var restPowerset = powerSet(arr)

    // for each set in the power set of arr minus its last element,
    // include that set in the powerset of arr both with and without
    // the last element of arr
    var powerset = []
    for (let i = 0; i < restPowerset.length; i++) {
        var set = restPowerset[i]

        // without last element
        powerset.push(set)

        // with last element
        set = set.slice() // create a new array that's a copy of set
        set.push(lastElement)
        powerset.push(set)
    }

    return powerset
}

export const sumEquals = (arr: number[], number: number) => {
    // all subsets of arr
    var powerset = powerSet(arr)

    // subsets summing less than or equal to number
    var subsets = []

    for (let i = 0; i < powerset.length; i++) {
        var subset = powerset[i]

        var sum = 0
        for (var j = 0; j < subset.length; j++) {
            sum += subset[j]
        }

        if (sum === number) {
            subsets.push(subset)
        }
    }

    return subsets
}
