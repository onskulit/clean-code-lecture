import { validateCommonName } from '../../../shared/validation/validateCommonName';

const nameErrorsMapper = {
    'name-not-defined': 'Введите имя',
    'only-russian-letters':
        'Имя должно содержать только буквы русского алфавита',
};

export const validateName = (name) => {
    const errorCode = validateCommonName(name);

    return nameErrorsMapper[errorCode];
};
