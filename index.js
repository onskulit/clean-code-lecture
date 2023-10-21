// Создание элемента

const createElement = (tag, classNames, child, parent) => {
    if (tag) {
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
    }
};

// Валидация

const MIN_GRADE = 1;
const MAX_GRADE = 5;
const russianLettersRegex = /[а-яё]/i;

const validate = (type, value) => {
    switch (type) {
        case 'name': {
            if (!value) {
                return 'Введите имя';
            }
            if (!russianLettersRegex.test(value)) {
                return 'Имя должно содержать только буквы русского алфавита';
            }
            break;
        }
        case 'surname': {
            if (!value) {
                return 'Введите фамилию';
            }
            if (!russianLettersRegex.test(value))
                return 'Фамилия должна содержать только буквы русского алфавита';

            break;
        }
        case 'grade':
            if (
                !value ||
                value > MAX_GRADE ||
                value < MIN_GRADE ||
                !parseInt(value)
            ) {
                if (!value) {
                    return 'Введите оценку';
                }
                if (!parseInt(value)) {
                    return 'Оценка должна быть цифрой от 1 до 5';
                }
                if (value > 5) return 'Оценка не должна быть больше 5';
                if (value < 1) {
                    return 'Оценка не должна быть меньше 1';
                }
            }
            break;
        default:
            return undefined;
    }
};

const validateForm = (form) => {
    const { name, surname, grade } = form;

    const nameError = validate('name', name);
    const surnameError = validate('surname', surname);
    const gradeError = validate('grade', grade);

    return {
        nameError,
        surnameError,
        gradeError,
    };
};

const showValidationErrors = ({ nameError, surnameError, gradeError }) => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    const containers = [nameContainer, surnameContainer, gradeContainer];
    for (let i = 0; i < containers.length; i += 1) {
        const error = containers[i].querySelector('.error');
        if (error) {
            error.remove();
        }
    }

    if (nameError) {
        createElement('p', 'error', nameError, nameContainer);
    }
    if (surnameError) {
        createElement('p', 'error', surnameError, surnameContainer);
    }
    if (gradeError) {
        createElement('p', 'error', gradeError, gradeContainer);
    }
};

// Точка входа в программу

const getList = () => document.getElementById('list');

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

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

    const list = getList();

    const isBadGrade = grade < 3;

    const item = createElement(
        'li',
        [
            'list-item',
            isBadGrade === true ? 'list-item_yellow' : undefined,
        ].filter((className) => Boolean(className)),
        undefined,
        list,
    );
    item.textContent = `${name} ${surname} - ${grade}`;

    nameInput.value = '';
    surnameInput.value = '';
    gradeInput.value = '';
});
