export class Validator {
    // Nome, nome do meio e sobrenome:
    checkName(name) {
        const nameRegex = /^([A-Z]{1}[a-z]*)[ ]([A-Z]{1}[a-z]*[ ])?([A-Z]{1}[a-z]*)$/;
        const matche = name.match(nameRegex);
        return matche !== null;
    }

    // Email
    checkEmail(email) {
        const emailRegex = /^[a-z]+@[a-z]+\.(com\.br|br)$/;
        const matche = email.match(emailRegex);
        return matche !== null;
    }

    // Senha
    checkPassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8}$/;
        const matche = password.match(passwordRegex);
        return matche !== null;
    }

    // CPF
    checkCPF(cpf) {
        const cpfRegex = /^((\d{3}\.){2}\d{3}-\d{2})$/;
        const matche = cpf.match(cpfRegex);
        return matche !== null;
    }

    // Telefone
    checkPhoneNumber(phoneNumber) {
        const phoneNumberRegex = /^(^\(\d{2}\)[ ]9\d{4}-?\d{4})|(^\d{2}[ ]{1}9\d{4}\d{4})$/;
        const matche = phoneNumber.match(phoneNumberRegex);
        return matche !== null;
    }

    // Data e horário
    checkDateAndTime(dateAndTime) {
        const dateAndTimeRegex = /^\d{2}\/\d{2}\/\d{4}[ ]\d{2}:\d{2}:\d{2}$/;
        const matche = dateAndTime.match(dateAndTimeRegex);
        return matche !== null;
    }

    // Número real
    checkRealNumber(number) {
        const realNumberRegex = /^[+-]?\d+(\.\d+)?$/;
        const matche = number.match(realNumberRegex);
        return matche !== null;
    }
}
