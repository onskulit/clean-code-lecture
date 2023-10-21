const russianLettersRegex = /[а-яё]/i;

export const validateCommonName = (name) => {
    if (!name) {
        return 'name-not-defined';
    }
    if (!russianLettersRegex.test(name)) {
        return 'only-russian-letters';
    }
};
