window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js-form')
    new FormHandler(form);
})

class FormHandler {
    constructor(form){
        if(form === null) return

        this.body = document.body
        this.form = form
        this.input = {
            email: {
                elem: this.form.querySelector('input[type="email"]'),
                value: '',
                valid: false
            },
            password: {
                elem: this.form.querySelector('input[type="password"]'),
                value: '',
                valid: false
            }
        }
        this.submit = this.form.querySelector('.js-submit')

        
        this.input.email.elem.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                this.validateInput(this.input.email.elem)
            }
        })
        this.input.password.elem.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                this.validateInput(this.input.password.elem)
            }
        })
        this.input.email.elem.addEventListener('keydown', (e) => {
            if(e.which === 9) {
                this.validateInput(this.input.email.elem)
            }
        })
        this.input.password.elem.addEventListener('keydown', (e) => {
            if(e.which === 9) {
                this.validateInput(this.input.password.elem)
            }
        })
        
        this.input.email.elem.addEventListener('focus', () => {
            this.removeError(this.input.email.elem)
        })
        
        this.input.password.elem.addEventListener('focus', () => {
            this.removeError(this.input.password.elem)
        })
        
        this.body.addEventListener('click' , (e) => {
            if(!e.target.classList.contains('js-submit')){
                this.removeError(this.input.email.elem)
                this.removeError(this.input.password.elem)
            }
        })
        this.submit.addEventListener('click', (e) => {
            e.preventDefault()
            this.sendForm(this.input)
        })
    }

    validateInput(elem){
        const type = elem.dataset.type;
        const value = elem.value;
        let isValid = false;
        switch (type) {
            case 'email':
                const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;
                const match = value.match(pattern);

                if(match === null || value === '') {
                    console.log(elem);
                    this.input.email.valid = false
                    this.toggleError(this.input.email.valid, elem)
                } else {
                    this.input.email.valid = true
                    this.toggleError(this.input.email.valid, elem)
                    isValid = true
                }

                return isValid;

                case 'password':
                    value === '' ? this.input.password.valid = false : this.input.password.valid = true

                    if(value === ''){
                        this.input.password.valid = false
                        this.toggleError(this.input.password.valid, elem)
                    } else {
                        this.input.password.valid = true
                        this.toggleError(this.input.password.valid, elem)
                        isValid = true
                    }
                    return isValid;
        
            default:
                this.input.password.valid = false
                this.toggleError(this.input.password.valid, elem)
                return isValid;
        }
    }

    toggleError(isValid, elem){
        if(!isValid){
            elem.classList.add('error')
            elem.nextElementSibling.classList.add('active')
        } else {
            elem.classList.remove('error')
            elem.nextElementSibling.classList.remove('active')
        }
    }

    removeError(elem){
        elem.classList.remove('error')
        elem.nextElementSibling.classList.remove('active')
    }

    async sendForm(){

        if( this.validateInput(this.input.email.elem) === true &&
            this.validateInput(this.input.password.elem) === true ) {
                alert('data sended')
                this.form.submit()
            }
        
        // const data = new FormData

        // data.append('email', this.input.email.value)
        // data.append('password', this.input.password.value)

        // const req = await fetch(url, {
        //     method: 'post',
        //     body: data
        // });

        // const resp = await req.json()
    }
}