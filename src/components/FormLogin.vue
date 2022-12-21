<template>
    <section class="form-section px-15 top-space section-b-space">
        <h1>Войти в аккаунт</h1>
        <form @submit="sendLogForm">
            <div class="form-floating mb-4">
                <input type="email" class="form-control" placeholder="Email" v-model="inputEmail">
                <label>Email</label>
            </div>
            <div class="form-floating mb-2">
                <input type="password" class="form-control" placeholder="пароль" v-model="inputPassword">
                <label >Пароль</label>
            </div>
            <div class="text-end mb-4">
                <router-link to="/otp" class="theme-color">Восстановить пароль</router-link>
            </div>
            <button type="submit" class="btn btn-solid w-100">Войти</button>
        </form>

        <div class="bottom-detail text-center mt-3 ">
            <h4 class="content-color">Нет аккаунта?</h4>
            <router-link to="/sign-up" class="btn btn-outline mt-2">Зарегистрироваться</router-link>
        </div>
    </section>
</template>

<script>
    import checkFormMixin from "@/mixins/checkFormMixin";
    import axios from "axios";

    export default {
        mixins:[checkFormMixin],
        data(){
            return{
                inputEmail:'',
                inputPassword: ''

            }
        },
        methods:{
            async checkIsBlankExist(){
                this.$store.commit('setIsLoading',true);
                const userToken={
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    },
                }
                await axios.get(`${this.$store.state.mainServer}/api/user-profile/profile`,userToken).then(res=>{
                    console.log(res);

                    if(res.data.error){
                        this.$store.commit('setIsLoading',false);
                        this.$store.commit('setError',{typeErr:1,textErr:'Заполните анкету!'})
                    }
                    else{
                        let localStorageAcc = JSON.parse(localStorage.getItem('accTinder'));
                        localStorageAcc.accInfo=res.data.data;
                        localStorageAcc.darkTheme=false;
                        localStorage.setItem('accTinder',JSON.stringify(localStorageAcc));

                        //this.$store.commit('setError',{typeErr:0,textErr:'С возвращением!'})

                        // this.$store.commit('setIsLoading',false);
                    }
                    this.$router.go();
                }).catch(err=>{
                    console.log(err.response);
                    this.$store.commit('setIsLoading',false);
                })
            },

           async getSendLogForm(){
                this.$store.commit('setIsLoading',true);
                const logInfo={
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params:{
                        email:this.inputEmail,
                        password:this.inputPassword
                    }
                }
                await axios.get(`${this.$store.state.mainServer}/api/user/login`,logInfo)
                    .then(res=>{
                        console.log(res);
                        this.$store.commit('setIsLoading',false);
                        this.$store.commit('setError',{typeErr:0,textErr:'Вы авторизованы!'});
                        let toLocal=res.data.data;
                        toLocal.darkTheme=false;
                        localStorage.setItem('accTinder',JSON.stringify(toLocal));
                        this.checkIsBlankExist()
                        //this.$router.go();
                })
                    .catch(err=>{
                        console.log(err.response);
                        this.$store.commit('setIsLoading',false);

                        if(err.response.data.error.email){
                            this.$store.commit('setError',{typeErr:3,textErr:'Нет пользователя с такой почтой!'})
                        }
                        if(err.response.data.error.password){
                            this.$store.commit('setError',{typeErr:3,textErr:'Неправильный пароль!'})
                        }
                    })

            },
            sendLogForm(e){
                e.preventDefault();
                if(this.checkEmail(this.inputEmail) &&
                        this.checkPassword(this.inputPassword)
                ){
                   this.getSendLogForm();

                }
            }

        }

    }
</script>

<style scoped>

</style>