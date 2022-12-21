<template>
    <div>
        <!-- user avtar section -->
<!--        <section class="user-avtar-section top-space pt-0 px-15">-->
<!--            <img :src="inputPhoto ? inputPhoto : require('../assets/images/user/1.png')" class="img-fluid" />-->
<!--            <label for="profileImg"> <span class="edit-icon"><i class="iconly-Edit-Square icli"></i></span></label>-->

<!--            <input id="profileImg" type="file" accept='image/*' @change="previewFiles">-->
<!--        </section>-->
        <!-- user avtar end -->


        <!-- detail form start -->
        <section class="detail-form-section px-15">
            <h2 class="page-title mb-4">Ваша анкета</h2>
            <form>

                <div class="form-floating mb-4">
                    <select class="form-select" v-model="inputGender">
                        <option selected disabled>Пол</option>
                        <option value="20">Женский</option>
                        <option value="30">Мужской</option>
                    </select>
                    <label>Пол</label>
                </div>

                <div class="form-floating mb-4">
                    <select class="form-select" v-model="inputOrientation">
                        <option selected disabled>Ориентация</option>
                        <option value="90">Гетеро</option>
                        <option value="40">Гей</option>
                        <option value="50">Лесбиянка</option>
                        <option value="60">Бисексуал</option>
                    </select>
                    <label>Ориентация</label>
                </div>

                <div class="form-floating mb-4">
                    <input type="text" class="form-control"  placeholder="Имя" v-model="inputFirstName">
                    <label >Имя</label>
                </div>
                <div class="form-floating mb-4">
                    <input type="date" class="form-control" placeholder="Дата рождения" v-model="inputBirthDate">
                    <label>Дата Рождения</label>
                </div>

                <div class="form-floating mb-4">
                    <select class="form-select" v-model="inputCity">
                        <option selected disabled>Город</option>
                        <option v-for="city in citiesList" :key="city.id" :value="city.id">{{city.title}}</option>
                    </select>
                    <label>Город</label>
                </div>

                    <div class="mb-4">
                        <label>Диапазон поиска</label>
                        <div class="slider-range-count">

                            <p>От:{{inputRangeFrom}}</p>
                            <p>До:{{inputRangeTo}}</p>

                        </div>
                        <input type="range" min="18" max="60" v-model="inputRangeFrom" @change="checkRange" class="slider" id="lower">
                        <input type="range" min="18" max="60" v-model="inputRangeTo" @change="checkRange" class="slider" id="higher">
                    </div>

                <div class="form-floating mb-4">
                    <textarea v-model="inputAbout" class="form-textarea" cols="30" rows="10"></textarea>
                    <label>О себе:</label>
                </div>

            </form>
        </section>
        <div class="divider"></div>
        <section class="detail-form-section pt-0 px-15">
        </section>
        <!-- detail form end -->


        <!-- panel space start -->
        <section class="panel-space"></section>
        <!-- panel space end -->


        <!-- bottom panel start -->
        <div class="cart-bottom row m-0 align-content-center" v-show="isShowButton">

                <a class="btn btn-solid col-12 text-uppercase w-100" @click="sendBlank">Сохранить</a>
        </div>
        <!-- bottom panel end -->
    </div>
</template>

<script>




    import checkFormMixin from "@/mixins/checkFormMixin";
    import axios from "axios";

    export default {
        mixins:[checkFormMixin],
        data(){
            return{
                citiesList:[],
                inputPhoto:null,
                inputGender:'',
                inputFirstName:'',
                inputBirthDate:'',
                inputCity:'',
                inputRangeFrom:18,
                inputRangeTo:30,
                isShowButton:true,
                inputOrientation:'',
                inputAbout:''
                //sendPhoto:null

            }
        },
        methods:{
            // async checkIsProfileExist(){
            //     this.$store.commit('setIsLoading',true);
            //     const userToken={
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //             Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
            //         },
            //     }
            //     await axios.get(`${this.$store.state.mainServer}/api/user-profile/profile`,userToken).then(res=>{
            //         console.log(res);
            //
            //         if(res.data.error){
            //             this.$store.commit('setIsLoading',false);
            //             this.$store.commit('setError',{typeErr:1,textErr:'Заполните анкету!'})
            //         }
            //         else{
            //             let localStorageAcc = JSON.parse(localStorage.getItem('accTinder'));
            //             localStorageAcc.accInfo=res.data.data;
            //             localStorageAcc.darkTheme=false;
            //             localStorage.setItem('accTinder',JSON.stringify(localStorageAcc));
            //
            //             //this.$store.commit('setError',{typeErr:0,textErr:'С возвращением!'})
            //             this.$router.go();
            //            // this.$store.commit('setIsLoading',false);
            //         }
            //     }).catch(err=>{
            //         console.log(err.response);
            //         this.$store.commit('setIsLoading',false);
            //     })
            // },
            async getCitiesList(){
                this.$store.commit('setIsLoading',true);
                const userToken={
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    },
                }
                await axios.get(`${this.$store.state.mainServer}/api/city/city`,userToken).then(res=>{
                    console.log(res);
                    this.citiesList=res.data.data;

                    this.$store.commit('setIsLoading',false);

                }).catch(err=>{
                    console.log(err.response);
                    this.$store.commit('setIsLoading',false);
                    this.$store.commit('setError',{typeErr:3,textErr:'Проблемы с сервером. Попробуйте зайти позже!'})

                })
            },
            checkRange(){
                if(this.inputRangeFrom>this.inputRangeTo){
                    this.inputRangeFrom=this.inputRangeTo;
                }
            },
           async postSendBlank(){
               this.$store.commit('setIsLoading',true);
               const regInfo={
                   name:this.inputFirstName,
                   gender:this.inputGender,
                   city_id:this.inputCity,
                   birthday:this.inputBirthDate,
                   min_age:	this.inputRangeFrom,
                   max_age: this.inputRangeTo,
                   about:'ghghghgh',
                   orientation:this.inputOrientation
               }
               await axios.post(`${this.$store.state.mainServer}/api/user-profile/create`,regInfo, {
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                       Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                   },

               }).then(async (res)=>{
                   console.log(res);
                   this.$store.commit('setIsLoading',false);

                       let localStorageAcc = JSON.parse(localStorage.getItem('accTinder'));
                       localStorageAcc.accInfo=res.data.data;
                       localStorage.setItem('accTinder',JSON.stringify(localStorageAcc));
                        this.$router.go();
                       // await axios.post(`${this.$store.state.mainServer}/api/user-profile/set-photo`,this.sendPhoto,{
                       //     headers: {
                       //         'accept': 'application/json',
                       //         'Accept-Language': 'en-US,en;q=0.8',
                       //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                       //         Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                       //     }}).then(res=>{
                       //     console.log(res)
                       //     this.$router.go();
                       // }).catch(err=>{
                       //     console.log(err.response)
                       // })
                   // this.$store.commit('setError',{typeErr:0,textErr:'Успешно!'});
                   // this.$router.push('/');
               }).catch(err=>{
                   console.log(err);
                   this.$store.commit('setIsLoading',false);
                   this.isShowButton=false;
                   setTimeout(()=>{
                       this.isShowButton=true
                   },2000)


                   if(err.response.data.error.birthday){
                       this.$store.commit('setError',{typeErr:3,textErr:'Вы слишком юны!'})
                   }

               })


           },

            sendBlank(){
                if(
                        this.checkFirstName(this.inputFirstName) &&
                        this.checkBirthDate(this.inputBirthDate) &&
                        this.checkCity(this.inputCity) &&
                        this.checkGender(this.inputGender) &&
                        this.checkOrientation(this.inputOrientation) &&
                        this.checkAbout(this.inputAbout)
                )
                {
                    this.postSendBlank();

                }

            },
            // previewFiles(e){
            //     const file = e.target.files[0];
            //     this.inputPhoto = URL.createObjectURL(file);
            //     let formData = new FormData();
            //     formData.append('photo', file);
            //     this.sendPhoto={
            //         photo:e.target.files[0]
            //     }
            // }
        },
        beforeMount() {
            this.$store.commit('setIsLoading',true);
            // this.checkIsProfileExist();
            this.getCitiesList();
        }

    }
</script>

<style scoped>
    @import "../assets/css/vendors/range-slider.css";
    #profileImg{
        display: none;
    }
</style>