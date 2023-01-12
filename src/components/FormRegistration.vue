<template>

    <section class="form-section px-15 top-space section-b-space">
        <h1>Регистрация</h1>
        <form @submit="sendRegForm">
            <div class="form-floating mb-4">
                <input type="email" class="form-control" placeholder="Email" v-model="inputEmail">
                <label>Email</label>
            </div>

            <div class="form-floating mb-4">
<!--                <input type="text" class="form-control" placeholder="Телефон" v-model="inputPhone">-->
<!--                <masked-input mask="\+\7 (111) 111-11-11" class="form-control" placeholder="Телефон" v-model="inputPhone" />-->
                <phone-mask-input
                        v-model="inputPhone"
                        inputClass="form-control"
                />
                <label>Телефон</label>

            </div>

            <div class="form-floating mb-4">
                <input ref="inputPass1" type="password" class="form-control" placeholder="пароль" v-model="inputPassword">
                <label>Пароль</label>
                <div class="password-hs">
                    <i @click="e=>showPassword(e,'inputPass1')" class="iconly-Hide icli hide"></i>
                </div>
            </div>

            <div class="form-floating mb-4">
                <input ref="inputPass2" type="password" class="form-control" placeholder="повторите пароль" v-model="inputPasswordRepeat">
                <label>Повторите пароль</label>
                <div  class="password-hs">
                    <i @click="e=>showPassword(e,'inputPass2')" class="iconly-Hide icli hide"></i>
                </div>
            </div>

            <button type="submit" class="btn btn-solid w-100">Создать аккаунт</button>
        </form>


        <div class="bottom-detail text-center mt-3">
            <h4 class="content-color">Есть аккаунт?</h4>
            <router-link to="/" class="btn btn-outline m-2">Войти</router-link>
        </div>

    </section>
</template>

<script>
    import checkFormMixin from "@/mixins/checkFormMixin";
    import axios from "axios";
    import PhoneMaskInput from  "vue-phone-mask-input";

    export default {
        mixins:[checkFormMixin],
        components:{PhoneMaskInput},
        data(){
            return{
                inputEmail:'',
                inputPhone:'',
                inputPassword:'',
                inputPasswordRepeat:''
            }
        },
        methods:{

           async postSendRegForm(){
               this.$store.commit('setIsLoading',true);
               const regInfo={
                   email:this.inputEmail,
                   password:this.inputPassword,
                   phone:this.inputPhone,

               }
               await axios.post(`${this.$store.state.mainServer}/api/user/create`,regInfo, {
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                   }
               }).then((res)=>{
                   console.log(res);
                   this.$store.commit('setIsLoading',false);
                   this.$store.commit('setError',{typeErr:0,textErr:'Успешно!'});
                   this.$router.push('/');
               }).catch(err=>{
                   console.log(err.response);
                   this.$store.commit('setIsLoading',false);

                   if(err.response.data.error.email){
                       this.$store.commit('setError',{typeErr:3,textErr:'Почта уже используется!'})
                   }
                   if(err.response.data.error.phone){
                       this.$store.commit('setError',{typeErr:3,textErr:'Телефон уже используется!'})
                   }
               })

            },
            sendRegForm(e){
                e.preventDefault();
                if(
                    this.checkEmail(this.inputEmail) &&
                    this.checkPhone(this.inputPhone) &&
                    this.checkPasswordRepeat(this.inputPassword,this.inputPasswordRepeat))
                {
                    this.postSendRegForm()
                }
            },

        },



    }
</script>

<style scoped>

</style>