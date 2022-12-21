<template>
    <section class="user-avtar-section top-space pt-0 px-15">
        <h1 class="mt-2 mb-2">Добавьте свое фото</h1>
        <label for="photo-profile"><img  :src="inputPhoto !==null ? (inputPhoto):(require('../assets/images/user/1.png'))" class="img-fluid" alt=""></label>

        <input id="photo-profile"type="file" accept='image/*' @change="previewFiles">
        <h1 class="mt-2 mb-2">(Нажмите на иконку для того, чтобы загрузить изображение)</h1>
        <button v-show="inputPhoto !== null" @click="postSendPhoto" class="btn btn-solid">Установить фото</button>
    </section>
</template>

<script>
    import axios from "axios";

    export default {
        data(){
            return{
                inputPhoto:null,
                sendPhoto:null
            }

        },
        methods:{
            async previewFiles(e){
                const file = e.target.files[0];
                this.inputPhoto = URL.createObjectURL(file);
                this.sendPhoto=file;
            },
           async checkIsAccPhoto(){
               const userToken={
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                       Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                   },
               }
               await axios.get(`${this.$store.state.mainServer}/api/user-profile/profile`,userToken).then(res=>{
                       console.log(res);
                   this.$store.commit('setIsLoading',false);
                   this.$router.go()
               }).catch(err=>{
                   console.log(err.response)
                   this.$store.commit('setIsLoading',false);
                   this.$router.go()
               })

            },
            async postSendPhoto(){

                this.$store.commit('setIsLoading',true);
                let formData = new FormData();
                formData.append('photo',  this.sendPhoto);
                let sendPhoto={
                    photo: this.sendPhoto
                }

                await axios.post(`${this.$store.state.mainServer}/api/user-profile/set-photo`,sendPhoto,{
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    }}).then(res=>{
                    console.log(res)
                    let atLocalStorage=JSON.parse(localStorage.getItem('accTinder'));
                    atLocalStorage.accInfo.photo=res.data.data;
                    localStorage.setItem('accTinder',JSON.stringify(atLocalStorage));
                    this.checkIsAccPhoto()
                }).catch(err=>{
                    console.log(err.response)
                    this.$store.commit('setError',{typeErr:3,textErr:'Не удалось установить фото!'})
                })
            }
        },



    }
</script>

<style scoped>
.img-fluid{
    width: 50vh;
    height: 50vh;
    cursor: pointer;
}
    #photo-profile{
        display: none;
    }
</style>