window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js-form')
    new FormHandler(form);
})

class FormHandler {
    constructor(form){
        if(form === null) return

        this.form = form
        this.email = this.form.querySelector('input[name="email"]')
        this.password = this.form.querySelector('input[name="password"]')
        this.submit = this.form.querySelector('.js-submit')
        this.error = this.form.querySelectorAll('.form__error')
        this.isValid = false
        this.data = {
            email: this.email.value,
            password: this.password.value,
        }

        this.submit.addEventListener('click', (e) => {
            e.preventDefault()

            if(this.isValid === true){
                this.sendForm()
            }
        })

        Array.from([this.email, this.password]).forEach(elem => {

            elem.addEventListener('keypress', (e) => { this.validateOnKeyPress(e, elem) })

            elem.addEventListener('click', () => { this.handleFocus(elem) })

            elem.addEventListener('focusout', () => {
                elem.classList.remove('focus')

                this.validator(elem)
                
                this.setValidiry(this.isValid, elem)

            })
        })
    }

    handleFocus(elem){
        elem.classList.add('focus')
    }

    validator(input){
        let pattern;
        const type = input.dataset.type
        type === 'email' ? pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/ : pattern = ''
        const value = input.value
        const match = value.match(pattern)

        if(input.value === '' || match === null){
            return this.isValid = false
            
        }
        return this.isValid = true
        
    }

    validateOnKeyPress(e, input){
        if(e.key === 'Enter'){
            e.preventDefault()
            this.validator(input)
            this.setValidiry(this.isValid, input)
        }

    };

    setValidiry(isValid, elem){
        if(isValid === false){
            elem.classList.add('error')
            elem.nextElementSibling.classList.add('active')
        } else {
            elem.classList.remove('error')
            elem.nextElementSibling.classList.remove('active')
        }
    }
    sendForm(){
        this.data.email = this.email.value
        this.data.password = this.password.value
        this.form.submit()
    }
}