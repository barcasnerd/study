function isMutant(dna: string[]): boolean {
    dna = validateDNA(dna);
    let found = [...findVerticalAndHorizontal(dna), ...findDiagonal(dna)]
    console.log(found);
    return found.length > 1 ? true : false;
}

function findDiagonal(matrix: string[]): string[] {
    let result: string[] = [];
    for (let i = 0; i < matrix.length; i++) {
        let mainWord: string | null = ""
        let _2ndTraversalmainWord: string | null = ""
        let secondaryWord: string | null = ""
        let _2ndTraversalsecondaryWord: string | null = ""
        let k = 0;
        for (let j = matrix.length - i - 1; j < matrix[i].length; j++) {
            mainWord += matrix[j][k]
            _2ndTraversalmainWord += matrix[j][matrix.length - k - 1]
            secondaryWord += matrix[k][j]
            _2ndTraversalsecondaryWord += matrix[matrix.length - k - 1][j]
            k++;
        }
        mainWord = findValidSequence(mainWord);
        _2ndTraversalmainWord = findValidSequence(_2ndTraversalmainWord);
        secondaryWord = findValidSequence(secondaryWord);
        _2ndTraversalsecondaryWord = findValidSequence(_2ndTraversalsecondaryWord);
        if (mainWord !== null) {
            result.push(mainWord);
        }
        if (_2ndTraversalmainWord !== null && !result.find(el => el === _2ndTraversalmainWord)) {
            result.push(_2ndTraversalmainWord);
        }
        if (secondaryWord !== null && !result.find(el => el === secondaryWord)) {
            result.push(secondaryWord);
        }
        if (_2ndTraversalsecondaryWord !== null && !result.find(el => el === _2ndTraversalsecondaryWord)) {
            result.push(_2ndTraversalsecondaryWord);
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
        "AGAATG",
        "CCCTTA",
        "TCTCTG"
    ]));
} catch (e: any) {
    console.log(e.message);
}