function isMutant(dna: string[]): boolean {
    dna = validateDNA(dna);
    let found = [...findVerticalAndHorizontal(dna), ...findDiagonal(dna)]
    return found.length > 1 ? true : false;
}

function findDiagonal(matrix: string[]): string[] {
    let result: string[] = [];
    for (let i = 0; i < matrix.length; i++) {
        let mainWord: string | null = ""
        let secondaryWord: string | null = ""
        let k = 0;
        for (let j = matrix.length - i - 1; j < matrix[i].length; j++) {
            mainWord += matrix[j][k]
            secondaryWord += matrix[k][j]
            k++;
        }
        mainWord = findValidSequence(mainWord);
        secondaryWord = findValidSequence(secondaryWord);
        if (mainWord !== null) {
            result.push(mainWord);
        }
        if (secondaryWord !== null && !result.find(el => el === secondaryWord)) {
            result.push(secondaryWord);
        }
    }
    return result;
}

function findVerticalAndHorizontal(matrix: string[]): string[] {
    const result: string[] = []
    for (let i = 0; i < matrix.length; i++) {
        let currentverticalWord = "";
        for (let j = 0; j < matrix[i].length; j++) {
            currentverticalWord += matrix[j][i]
            const currentHorizontalWord = matrix[i].substring(j, j + 4);
            if (currentHorizontalWord.length === 4 && !(currentHorizontalWord.split("").find(el => el !== currentHorizontalWord[0]))) {
                result.push(currentHorizontalWord);
            }
        }

        const _foundSequence = findValidSequence(currentverticalWord);
        if (_foundSequence !== null) {
            result.push(_foundSequence);
        }
    }
    return result;
}

function findValidSequence(sequence: string): string | null {
    for (let x = 0; x < sequence.length; x++) {
        const _found = sequence.substring(x, x + 4);
        if (_found.length === 4 && !(_found.split("").find(el => el !== _found[0]))) {
            return _found
        }
    }
    return null;
}

function validateDNA(dna: string[]): string[] {
    // validate length
    const N = dna.length;
    // valudate valid letters
    const regex = /^[ATCG]+$/
    for (let letter of dna) {
        if (!regex.test(letter.toUpperCase())) {
            throw new Error("Las letras de los String solo pueden ser: (A,T,C,G)")
        }
        if (!(letter.length === N)) {
            throw new Error("La tabla debe ser cuadrada NxN")
        }
    }
    return dna;
}

try {
    console.log(isMutant([
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]));
} catch (e: any) {
    console.log(e.message);
}