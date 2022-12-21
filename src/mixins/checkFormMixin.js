export default {
    methods:{

        checkFirstName(e){
            if(e.trim().length>0){

                return true;

            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Введите имя!'})
                return false;

            }
        },
        checkEmail(e){
            if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Неверный формат почты!'})
                return false;

            }
        },
        checkPhone(e){
            if(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(e)){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Неверный формат телефона!'})
                return false;

            }
        },
        checkPassword(e){
            if (e.trim().length>=8) {

                return true;
            }

            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Пароль должен содержать как минимум 8 символов!'})
                return false;

            }
        },
        checkPasswordRepeat(e,repe){
            if(this.checkPassword(e)){
                if(e===repe){
                    return true;
                }
                else{
                    this.$store.commit('setError',{typeErr:3,textErr:'Пароли не совпадают!'})
                    return false;
                }
            }
        },
        showPassword(e,inpRef){

            if(this.$refs[inpRef].type==='text'){
                this.$refs[inpRef].type='password'
                e.target.classList.value='iconly-Hide icli hide';
            }
            else{
                this.$refs[inpRef].type='text'
                e.target.classList.value='iconly-Hide icli hide iconly-Show';
            }

        },
        checkBirthDate(e){
            if(e.trim().length>0){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Укажите дату рождения!'})
                return false;
            }
        },
        checkCity(e){
            if(e!==''){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Укажите ваш город!'})
                return false;
            }
        },
        checkGender(e){
            if(e.trim().length>0){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Укажите ваш пол!'})
                return false;
            }
        },
        checkPhoto(e){
            if(e !== null){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Прикрепите своё фото!'})
                return false;
            }

        },
        checkSearchFor(e){
            if(e.trim().length>0){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Укажите кого хотите найти!'})
                return false;
            }
        },
        checkOrientation(e){
            if(e.trim().length>0){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Укажите вашу ориентацию!'})
                return false;
            }
        },
        checkAbout(e){
            if(e.trim().length>0){
                return true;
            }
            else{
                this.$store.commit('setError',{typeErr:3,textErr:'Напишите про себя!'})
                return false;
            }
        }




}
}