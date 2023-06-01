function Validator (options) {
    const validator = (inputEle , messageEle , rule) => {
            const errorMessage = rule.test(inputEle.value)
            if (errorMessage) {
                messageEle.innerText = errorMessage
                inputEle.parentElement.classList.add('invalid')
            } else {
                inputEle.parentElement.classList.remove('invalid')
                messageEle.innerText = ''
            }
    }
    const formEle = $(options.formSelector)
    if (formEle) {
        options.rules.forEach(rule => {
            const inputEle = $(rule.selector)
            const messageEle = inputEle.parentElement.querySelector(options.formMessage)
            if(inputEle) {
                inputEle.onblur = () => {
                    validator(inputEle, messageEle, rule)
                }
                inputEle.oninput = () => {
                    inputEle.parentElement.classList.remove('invalid')
                    messageEle.innerText = ''
                }
            }
        });
    }
}
Validator.isRequired = (selector) => {
    return {
        selector: selector ,
        test : (value) => {
            return value.trim() ? undefined : 'Please fill in this blank!'
        }
    }
} 
Validator.isEmail = (selector) => {
    return {
        selector : selector ,
        test : (value) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return regex.test(value) ? undefined : 'Data must be an email'
        }
    }
}
Validator.isPassword = (selector) => {
    return {
        selector : selector ,
        test : (value) => {
            return value.trim().length > 6 ? undefined : 'Password must have at least 6 characters!'
        }
    }
}