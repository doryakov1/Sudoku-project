// Random numbers

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// Random array numbers

function getRandomArr() {
    let arr = [];
    while (arr.length < 9) {
        let num = getRandomIntInclusive(1, 9);
        if (arr.indexOf(num) == -1) {
            arr.push(num);
        } else {
            num = getRandomIntInclusive(1, 9);
        }
    }
    return arr;
}