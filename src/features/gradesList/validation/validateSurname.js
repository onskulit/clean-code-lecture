import { validateCommonName } from '../../../shared/validation/validateCommonName';

const surnameErrorsMapper = {
    'name-not-defined': 'Введите фамилию',
    'only-russian-letters':
        'Фамилия должна содержать только буквы русского алфавита',
};

export const validateSurname = (surname) => {
    const errorCode = validateCommonName(surname);

    return surnameErrorsMapper[errorCode];
};
