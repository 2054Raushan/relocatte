/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
const Validate = {
    email(input, validateChar) {
        if (validateChar) {
            return true;
        }
        if (input.length > 96) {
            return false;
        }
        const re = /.+@.+[.]([a-zA-Z]){2,3}/;
        return re.test(input);
    },
    telephone(input, validateChar) {
        if (validateChar) {
            const re = /[0-9]$/;
            return re.test(input);
        }
        const re = /^[1-9][0-9]{9}$/;
        return re.test(input);
    },
    card(input, validateChar) {
        if (validateChar) {
            const re = /[0-9]$/;
            return re.test(input);
        }
        const re = /^[0-9]{13,21}$/;
        return re.test(input);
    },
    bankAccount(input, validateChar) {
        if (validateChar) {
            const re = /[0-9]$/;
            return re.test(input);
        }
        const re = /^[0-9]{7,21}$/;
        return re.test(input);
    },
    pan(input, validateChar) {
        if (validateChar) {
            const re = /[0-9a-zA-Z]$/;
            return re.test(input);
        }
        const re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        return re.test(input);
    },
    adhaar(input, validateChar) {
        if (validateChar) {
            const re = /[0-9]$/;
            return re.test(input);
        }
        const re = /^\d{12}$/;
        return re.test(input);
    },
    dl(input, validateChar) {
        if (validateChar) {
            const re = /[A-Za-z0-9]$/;
            return re.test(input);
        }
        const re = /^[a-zA-Z]{2}[A-Za-z0-9]{11,19}$/;
        return re.test(input);
    },
    passport(input, validateChar) {
        if (validateChar) {
            const re = /[A-Za-z0-9]$/;
            return re.test(input);
        }
        const re = /^([a-zA-Z]){1}([0-9]){7}$/;
        return re.test(input);
    },
};

export default Validate;
