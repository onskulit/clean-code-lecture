// Common Helpers

const compact = (array) => array.filter((item) => Boolean(item));

// Module Variables

const formFields = ['name', 'surname', 'grade'];

// Element creation

const createElement = (tag, { classNames, child, parent }) => {
    if (!tag) {
        return;
    }

    const element = document.createElement(tag);

    if (classNames) {
        if (Array.isArray(classNames)) {
            element.classList.add(...classNames);
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }
    }

    if (child) {
        element.append(child);
    }

    if (parent) {
        parent.append(element);
    }

    return element;
};

// Validation

const MIN_GRADE = 1;
const MAX_GRADE = 5;
const russianLettersRegex = /[а-яё]/i;

const validateName = (name) => {
    if (!name) {
        return 'Введите имя';
    }
    if (!russianLettersRegex.test(name)) {
        return 'Имя должно содержать только буквы русского алфавита';
    }
};

const validateSurname = (surname) => {
    if (!surname) {
        return 'Введите фамилию';
    }
    if (!russianLettersRegex.test(surname)) {
        return `Фамилия должна содержать только буквы русского алфавита`;
    }
};

const validateGrade = (grade) => {
    if (!grade) {
        return 'Введите оценку';
    }
    const gradeNumber = parseInt(grade, 10);
    if (!gradeNumber) {
        return `Оценка должна быть цифрой от ${MIN_GRADE} до ${MAX_GRADE}`;
    }
    if (gradeNumber > MAX_GRADE) return `Оценка не должна быть больше ${MAX_GRADE}`;
    if (gradeNumber < MIN_GRADE) {
        return `Оценка не должна быть меньше ${MIN_GRADE}`;
    }
};

const showErrors = ({ nameError, surnameError, gradeError }) => {
    const errorMapper = {
        name: nameError,
        surname: surnameError,
        grade: gradeError,
    };

    formFields.forEach((field) => {
        const container = document.getElementById(`${field}-container`);

        const errorElement = container.querySelector('.error');
        if (errorElement) {
            errorElement.remove();
        }

        const error = errorMapper[field];
        if (error) {
            createElement('p', { classNames: 'error', child: error, parent: container });
        }
    });
};

const validateForm = ({ name, surname, grade }) => {
    const nameError = validateName(name);
    const surnameError = validateSurname(surname);
    const gradeError = validateGrade(grade);

    showErrors({ nameError, surnameError, gradeError });

    return !(nameError || surnameError || gradeError);
};

// Form processing

const ACCEPTABLE_GRADE = 3;

const createListItem = ({ name, surname, grade }) => {
    const list = document.getElementById('list');

    const isBadGrade = grade < ACCEPTABLE_GRADE;
    const classNames = compact(['list-item', isBadGrade ? 'list-item_yellow' : undefined]);

    const item = createElement('li', { classNames, parent: list });
    if (item) {
        item.textContent = `${name} ${surname} - ${grade}`;
    }
};

const getFormValues = () => {
    const values = {};

    formFields.forEach((field) => {
        const input = document.querySelector(`input[name="${field}"]`);
        if (input) {
            values[field] = input.value;
        }
    });

    return values;
};

const clearFormInputs = () => {
    formFields.forEach((field) => {
        const input = document.querySelector(`input[name="${field}"]`);
        if (input) {
            input.value = '';
        }
    });
};

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const { name, surname, grade } = getFormValues();

    const isFormValid = validateForm({ name, surname, grade });

    if (!isFormValid) {
        return;
    }

    createListItem({ name, surname, grade });

    clearFormInputs();
});
