const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const phoneRegex = /^(\+421|0)\s?\d{3}\s?\d{3}\s?\d{3}$/;

////////////////// FIELD VALIDATIONS ///////////////////////
export const validateEmailFormat = (email) => {
    if (!email) {
        console.log("Email je povinný!");
        return "Email je povinný!";
    }

    if (!emailRegex.test(email)) {
        console.log("Email je povinný!");
        return "Nesprávny formát emailu!";
    }

    return null;
};

export const validatePhoneFormat = (phone) => {
    if (!phone) return "Telefónne číslo (mobil) je povinné!";

    if (!phoneRegex.test(phone)) return "Telefónne číslo ma nesprávny formát";

    return null;
};

export const validateNameSurename = (nameSurename) => {
    if (!nameSurename) return "Meno je povinné";

    return null;
};
