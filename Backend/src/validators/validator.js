const isValid = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x !== "string") return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true;
}


const isValidStr = function (x) {
    let strRegex = /^[a-zA-Z,\-.\s|]*$/
    if (strRegex.test(x)) return true
}

const isValidBody = function (y) {
    return Object.keys(y).length > 0
}

const isValidEmail = function (y) {
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if (emailRegex.test(y)) return true
}

const isValidPassword = (y) => {
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    if(passwordRegex.test(y)) return true
}

const isValidMobile = function (y) {
    let mobileRegex = /^(?:\+\d{1,3}[- ]?)?\d{10}$/
    if (mobileRegex.test(y)) return true
}

module.exports = {isValid, isValidBody, isValidEmail, isValidMobile, isValidStr, isValidPassword}