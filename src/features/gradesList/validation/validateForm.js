import { validateGrade } from './validateGrade';
import { validateName } from './validateName';
import { validateSurname } from './validateSurname';

export const validateForm = (form) => {
    const { name, surname, grade } = form;

    const nameError = validateName(name);
    const surnameError = validateSurname(surname);
    const gradeError = validateGrade(grade);

    return {
        nameError,
        surnameError,
        gradeError,
    };
};
