<template>
    <section class="form-section px-15 top-space section-b-space">
        <h1>Восстановление пароля</h1>
        <form @submit="postRequestPasswordReset">
            <div class="form-floating mb-4">
                <input v-model="inputEmail" type="email" class="form-control" placeholder="Email">
                <label >Email</label>
            </div>
            <button type="submit" class="btn btn-solid w-100">Отправить код</button>
        </form>
        <div class="bottom-detail text-center mt-3">
            <h4 class="content-color">Вернуться и </h4>
            <router-link to="/" class="btn btn-outline mt-2">Войти</router-link>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    import checkFormMixin from "@/mixins/checkFormMixin";

    export default {
        data(){
            return{
                inputEmail:''
            }

        },
        mixins:[checkFormMixin],
        methods:{

           async postRequestPasswordReset(e){
               e.preventDefault()
               if(this.checkEmail(this.inputEmail)){
                   const requestPasswordResetData={
                       email: this.inputEmail
                   }
                   await axios.post(`${this.$store.state.mainServer}/api/user-profile/create`,requestPasswordResetData, {
                       headers: {
                           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                       },

                   }).then(res=>{
                       console.log(res)
                   }).catch(err=>{
                       console.log(err)
                       this.$store.commit('setError',{typeErr:3,textErr:'Не удалось сбросить пароль!'})
                   })
               }


            }

        }


    }
</script>

<style scoped>

</style>