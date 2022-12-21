<template>
    <div class="profile-blank">
        <!-- user avtar section -->
        <PhotoWatch :imgSrc="changePhoto ? changePhoto : (inputPhoto && inputPhoto !== 'N/A' ? `${this.$store.state.mainServer}/${inputPhoto}`: require('../assets/images/user/1.png'))"/>
        <section class="top-space pt-0 px-15">

<!--            <label for="profileImg">-->
<!--                <img :src="changePhoto ? changePhoto : (inputPhoto && inputPhoto !== 'N/A' ? `${this.$store.state.mainServer}/${inputPhoto}`: require('../assets/images/user/1.png'))" class="img-fluid" />-->
<!--            </label>-->
            <img  @click="openPhoto" :src="changePhoto ? changePhoto : (inputPhoto && inputPhoto !== 'N/A' ? `${this.$store.state.mainServer}/${inputPhoto}`: require('../assets/images/user/1.png'))" class="profile-img-big" />
            <label
                   for="profileImg"
            >
                <a class="btn btn-outline mt-2">Сменить фото</a>

            </label>
            <input id="profileImg" type="file" accept='image/*' @change="previewFiles">


        </section>
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


                <div class="form-floating mb-4">
                    <label>Диапазон поиска</label>
                    <div class="slider-range-count">

                        <p>От:{{inputRangeFrom}}</p>
                        <p>До:{{inputRangeTo}}</p>

                    </div>
                    <div class="slider-range-count__ranges">
                        <input type="range" min="18" max="60" v-model="inputRangeFrom" @change="checkRange" class="slider" id="lower">
                        <input type="range" min="18" max="60" v-model="inputRangeTo" @change="checkRange" class="slider" id="higher">
                    </div>

                </div>

                <div class="form-floating mb-5 mt-5">
                    <textarea v-model="inputAbout" class="form-textarea" cols="30" rows="10"></textarea>
                    <label>О себе:</label>
                </div>


            </form>
        </section>
        <div class="divider"></div>
        <section class="detail-form-section pt-0 px-15">
        </section>
        <!-- detail form end -->

<!--        <div class="justify-content-center d-flex w-100"> <a class="btn btn-danger text-uppercase" @click="isShowExitAlert=true">Выйти</a></div>-->

        <!-- panel space start -->
        <section class="panel-space"></section>
        <!-- panel space end -->


        <!-- bottom panel start -->

        <div class="cart-bottom row m-0 align-content-center" v-show="isChangeForm">
            <div>
                <button class="btn btn-outline left-content col-5">Отмена</button>
                <button class="btn btn-solid col-6 text-uppercase" @click="postSendChangeForm">Сохранить</button>
            </div>
        </div>

<!--        <transition name="fade">-->
<!--        <div class="is-exit-block" @click="isShowExitAlert=false" v-show="isShowExitAlert">-->
<!--            <div class="is-exit-block__content w-100" @click.stop>-->
<!--            <div class="offcanvas-body small">-->
<!--                <div class="content">-->
<!--                    <h4>Выход из аккаунта:</h4>-->
<!--                    <p>Уверены что хотите выйти из аккаунта?</p>-->
<!--                </div>-->
<!--                <div class="bottom-cart-panel">-->
<!--                    <div class="row">-->
<!--                        <div class="col-7">-->
<!--                            <a class="btn btn-outline" @click="isShowExitAlert=false">Отмена</a>-->
<!--                        </div>-->
<!--                        <div class="col-5">-->
<!--                            <a class="btn btn-solid" @click="exitAccount">Выйти</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        </transition>-->
        <!-- bottom panel end -->
    </div>
</template>

<script>
    import checkFormMixin from "@/mixins/checkFormMixin";
    import PhotoWatch from "@/components/PhotoWatch";
    import axios from "axios";

    export default {
        mixins:[checkFormMixin],
        components:{
            PhotoWatch
        },
        data(){
            return{
                citiesList:[],
                inputPhoto:null,
                changePhoto:null,
                inputGender:'',
                inputFirstName:'',
                inputBirthDate:'',
                inputCity:'',
                inputRangeFrom:18,
                inputRangeTo:30,
                isChangeForm:false,
                isShowExitAlert:false,
                inputAbout:'',
                inputOrientation:'',
                interval:50,
                count:0
            }
        },
        methods:{
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
            async postSendChangeForm(){
                if(this.checkFirstName(this.inputFirstName) &&
                        this.checkAbout(this.inputAbout)
                )
                {
                    this.isChangeForm=false;
                    this.$store.commit('setIsLoading',true);
                    const regInfo={
                        name:this.inputFirstName,
                        gender:this.inputGender,
                        city_id:this.inputCity,
                        birthday:this.inputBirthDate,
                        min_age:this.inputRangeFrom,
                        max_age: this.inputRangeTo,
                        about:this.inputAbout,
                        orientation:this.inputOrientation
                    }
                    await axios.post(`${this.$store.state.mainServer}/api/user-profile/update`,regInfo, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                        },

                    }).then((res)=>{
                        console.log(res);
                        this.$store.commit('setIsLoading',false);
                        this.$store.commit('setError',{typeErr:0,textErr:'Успешно изменена анкета!'})
                    }).catch(err=>{
                        console.log(err.response);
                        this.$store.commit('setIsLoading',false);
                        if(err.response.data.error.birthday){
                            this.$store.commit('setError',{typeErr:3,textErr:'Слишком юный возраст!'})
                        }

                        this.getAccountInfo()

                    })

                }
            },
            checkRange(){
                if(this.inputRangeFrom>this.inputRangeTo){
                    this.inputRangeFrom=this.inputRangeTo;
                }
            },
           async previewFiles(e){
                const file = e.target.files[0];
                this.changePhoto = URL.createObjectURL(file);
                let formData = new FormData();
                formData.append('photo', file);
                let sendPhoto={
                    photo:e.target.files[0]
                }

                await axios.post(`${this.$store.state.mainServer}/api/user-profile/set-photo`,sendPhoto,{
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    }}).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err.response)
                })
               await this.getAccountInfo()
            },
            // exitAccount(){
            //     localStorage.removeItem('accTinder');
            //     this.$router.push('/');
            // },
           async getAccountInfo(){
               this.$store.commit('setIsLoading',true);
               const userToken={
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                       Authorization:`Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                   },

               }
                await axios.get(`${this.$store.state.mainServer}/api/user-profile/profile`,userToken).then(res=>{
                    console.log(res.data.data)
                    this.inputFirstName=res.data.data.name;
                    this.inputBirthDate=res.data.data.birthday.substring(0,10);
                    this.inputCity=res.data.data.city_id;
                    this.inputRangeFrom=res.data.data.min_age;
                    this.inputRangeTo=res.data.data.max_age;
                    this.inputPhoto=res.data.data.photo;
                    this.inputGender=res.data.data.gender;
                    this.inputAbout=res.data.data.about;
                    this.inputOrientation=res.data.data.orientation;

                    this.$watch('inputFirstName', this.dataWatcher);
                    this.$watch('inputBirthDate', this.dataWatcher);
                    this.$watch('inputCity', this.dataWatcher);
                    this.$watch('inputRangeFrom', this.dataWatcher);
                    this.$watch('inputRangeTo', this.dataWatcher);
                    this.$watch('inputPhoto', this.dataWatcher);
                    this.$watch('inputGender', this.dataWatcher);
                    this.$watch('inputAbout', this.dataWatcher);
                    this.$watch('inputOrientation', this.dataWatcher);
                    let addAccInfo=JSON.parse(localStorage.getItem('accTinder'));
                    addAccInfo.accInfo=res.data.data;
                    localStorage.setItem('accTinder',JSON.stringify(addAccInfo))


                    this.$store.commit('setIsLoading',false);
                }).catch(err=>{
                    console.log(err)
                    this.$store.commit('setIsLoading',false);
                })
               if(this.inputGender === 20){
                   document.documentElement.style.setProperty('--main-color', this.$store.state.femaleColor);
               }
               else{
                   document.documentElement.style.setProperty('--main-color',  this.$store.state.maleColor);
               }
            },
            openPhoto(){
                this.$store.commit('setIsWatchPhoto',true)
            },

            dataWatcher(){
                this.isChangeForm=true;
                if(this.inputGender == 20){
                    document.documentElement.style.setProperty('--main-color', this.$store.state.femaleColor);
                }
                else{
                    document.documentElement.style.setProperty('--main-color',  this.$store.state.maleColor);
                }
            }
        },
        mounted() {
            this.getCitiesList();
            this.getAccountInfo();
        },




    }
</script>

<style scoped>
    @import "../assets/css/vendors/range-slider.css";

    #profileImg{
        display: none;
    }


    .profile-img-big{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        cursor: pointer;
    }
    .form-floating > label{
        background-color: var(--main-color) !important;
        padding: 0px 3px !important;
        border-radius: 8px !important;
        color: whitesmoke !important;
    }

    .btn-solid{
        background-color: var(--main-color) !important;
    }

    .btn-outline{
        border: 1px solid var(--main-color) !important;
        color:var(--main-color) !important;
        background: rgba(0,0,0,0);
    }


    .slider-range-count__ranges{
        position: relative;
        bottom: 35px;
        width: 90%;
        left: 5%;
    }

    .edit-icon{
        color:var(--main-color) !important;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

</style>