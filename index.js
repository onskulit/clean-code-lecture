import {
    clearGradeListValidationErrors,
    validateGradeListForm,
    createGradesListItem,
    showGradeListValidationErrors,
} from './src/features/gradesList';

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    const name = nameInput.value;
    const surname = surnameInput.value;
    const grade = gradeInput.value;

    clearGradeListValidationErrors();

    const { nameError, surnameError, gradeError } = validateGradeListForm({
        name,
        surname,
        grade,
    });

    if (nameError || surnameError || gradeError) {
        showGradeListValidationErrors({
            nameError,
            surnameError,
            gradeError,
        });

        return;
    }

    createGradesListItem({ name, surname, grade });

    nameInput.value = '';
    surnameInput.value = '';
    gradeInput.value = '';
});
