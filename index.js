// Создание элемента

const createElement = (tag, { classNames, child, parent }) => {
    if (!tag) {
        return;
    }

    const element = document.createElement(tag);

    if (classNames) {
        if (Array.isArray(classNames)) {
            element.classList.add(...classNames);
        } else if (typeof classNames === 'string')
            element.classList.add(classNames);
    }

    if (child) {
        if (Array.isArray(child)) {
            child.forEach((childElem) => {
                element.append(childElem);
            });
        } else if (typeof child === 'string') {
            element.innerHTML = child;
        } else {
            element.append(child);
        }
    }

    if (parent) {
        parent.append(element);
    }

    return element;
};

// Валидация

const MIN_GRADE = 1;
const MAX_GRADE = 5;
const russianLettersRegex = /[а-яё]/i;

const validateCommonName = (name) => {
    if (!name) {
        return 'name-not-defined';
    }
    if (!russianLettersRegex.test(name)) {
        return 'only-russian-letters';
    }
};

const nameErrorsMapper = {
    'name-not-defined': 'Введите имя',
    'only-russian-letters':
        'Имя должно содержать только буквы русского алфавита',
};

const validateName = (name) => {
    const errorCode = validateCommonName(name);

    return nameErrorsMapper[errorCode];
};

const surnameErrorsMapper = {
    'name-not-defined': 'Введите фамилию',
    'only-russian-letters':
        'Фамилия должна содержать только буквы русского алфавита',
};

const validateSurname = (surname) => {
    const errorCode = validateCommonName(surname);

    return surnameErrorsMapper[errorCode];
};

const validateGrade = (grade) => {
    if (!grade) {
        return 'Введите оценку';
    }
    if (!parseInt(grade)) {
        return 'Оценка должна быть цифрой от 1 до 5';
    }
    if (grade > MAX_GRADE) {
        return 'Оценка не должна быть больше 5';
    }
    if (grade < MIN_GRADE) {
        return 'Оценка не должна быть меньше 1';
    }
};

const validateForm = (form) => {
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

const clearValidationErrors = () => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    [nameContainer, surnameContainer, gradeContainer].forEach((container) => {
        const error = container.querySelector('.error');
        if (error) {
            error.remove();
        }
    });
};

const showValidationErrors = ({ nameError, surnameError, gradeError }) => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    if (nameError) {
        createElement('p', {
            classNames: 'error',
            child: nameError,
            parent: nameContainer,
        });
    }
    if (surnameError) {
        createElement('p', {
            classNames: 'error',
            child: surnameError,
            parent: surnameContainer,
        });
    }
    if (gradeError) {
        createElement('p', {
            classNames: 'error',
            child: gradeError,
            parent: gradeContainer,
        });
    }
};

// Добавить пункт к списку

const createListItem = ({ name, surname, grade }) => {
    const list = document.getElementById('list');

    const isBadGrade = grade < 3;
    const listItemClasses = [
        'list-item',
        isBadGrade ? 'list-item_yellow' : undefined,
    ].filter((className) => Boolean(className));

    const item = createElement('li', {
        classNames: listItemClasses,
        child: undefined,
        parent: list,
    });
    item.textContent = `${name} ${surname} - ${grade}`;
};

// Точка входа в программу

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    clearValidationErrors();

    const name = nameInput.value;
    const surname = surnameInput.value;
    const grade = gradeInput.value;

    const { nameError, surnameError, gradeError } = validateForm({
        name,
        surname,
        grade,
    });

    if (nameError || surnameError || gradeError) {
        showValidationErrors({
            nameError,
            surnameError,
            gradeError,
        });

        return;
    }

    createListItem({ name, surname, grade });

    nameInput.value = '';
    surnameInput.value = '';
    gradeInput.value = '';
});
