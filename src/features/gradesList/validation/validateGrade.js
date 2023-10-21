const MIN_GRADE = 1;
const MAX_GRADE = 5;

export const validateGrade = (grade) => {
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
