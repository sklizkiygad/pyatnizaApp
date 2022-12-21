<template>
    <div class="candidate-info">

        <PhotoWatch :imgSrc="accPhoto && accPhoto!=='N/A' ? `${this.$store.state.mainServer}/${accPhoto}`:require('../assets/images/user/1.png')"/>
        <img  @click="openPhoto" :src="accPhoto && accPhoto!=='N/A'? `${this.$store.state.mainServer}/${accPhoto}`:require('../assets/images/user/1.png')" class="profile-img-big" />

        <div class="product-detail-box">
            <div class="main-detail">

                <h1 class="text-capitalize">{{accName}}, {{getAge(accAge)}}</h1>
                <div class="candidate-info__details">


                <div>
                    <h2 class="page-title">Пол:</h2>
                    <h2 class="content-color">{{getGender(accGender)}}</h2>

                </div>

                <div>
                    <h2 class="page-title">Ориентация:</h2>
                    <h2 class="content-color">{{getOrientation(accOrientation)}}</h2>
                </div>

                <div>
                    <h2 class="page-title">Город:</h2>
                    <h2 class="content-color">{{accCity}}</h2>
                </div>


                </div>
                <div>
                    <h1 class="text-capitalize">Обо мне:</h1>
                    <h2 class="content-color mb-5">{{accAbout}}</h2>
                </div>
            </div>
            <button class="btn btn-solid w-100" @click="$router.push('/')">Вернуться к аккаунтам</button>

        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import PhotoWatch from "@/components/PhotoWatch";

    export default {
        components:{
            PhotoWatch
        },
        data(){


            return{
                accPhoto:'',
                accName:'',
                accAge:'',
                accGender:'',
                accAbout:'',
                accOrientation:'',
                accCity:''


            }
        },
        methods:{
                openPhoto(){
                    this.$store.commit('setIsWatchPhoto',true)
                },

            async getUserData(){

                this.$store.commit('setIsLoading',true);
                const userToken={
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    },
                    params:{
                        profile_id:this.$route.params.id
                    }
                }
                    await axios.get(`${this.$store.state.mainServer}/api/user-profile/candidate-profile`,userToken).then (async res=>{
                        console.log(res);

                        if(res.data.hasErrors){
                            this.$store.commit('setError',{typeErr:3,textErr:'Несуществующий аккаунт!'})
                        }
                        else{
                            this.accPhoto=res.data.data.photo;
                            this.accName=res.data.data.name;
                            this.accAge=res.data.data.birthday;
                            this.accGender=res.data.data.gender;
                            this.accAbout=res.data.data.about;
                            this.accOrientation=res.data.data.orientation;
                            await this.getCity(res.data.data.city_id);
                        }


                    }).catch(err=>{
                        console.log(err)
                        this.$store.commit('setError',{typeErr:3,textErr:'Проблемы с сервером. Попробуйте зайти позже!'})

                    })

            },
            getAge(e){
                let now = new Date(); //Текущя дата
                console.log(e)
                let birthYear=e.substring(0,4);
                let birthMonth=e.substring(6,7);
                let birthDay=e.substring(8,9);
                let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
                let dob = new Date(birthYear, birthMonth, birthDay); //Дата рождения
                let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
                let age; //Возраст


                age = today.getFullYear() - dob.getFullYear();

                if (today < dobnow) {
                    age = age-1;
                }
                return age;
            },
            getGender(e){
                    switch (e) {
                        case 20:
                           return 'Женский'

                        case 30:
                            return 'Мужской'

                    }
            },
            getOrientation(e){
                switch (e) {
                    case 90:
                        return 'Гетеро'
                    case 40:
                        return 'Гей'
                    case 50:
                        return 'Лесбиянка'
                    case 60:
                        return 'Бисексуал'

                }
            },
            async getCity(e){
                const userToken={
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    },
                    params: {
                        city_id:e
                    }
                }
                await axios.get(`${this.$store.state.mainServer}/api/city/city`,userToken).then(res=>{
                    console.log(res);
                    this.$store.commit('setIsLoading',false);
                    this.accCity = res.data.data.title
                }).catch(err=>{
                    console.log(err.response);
                    this.$store.commit('setIsLoading',false);
                    this.$store.commit('setError',{typeErr:3,textErr:'Проблемы с сервером. Попробуйте зайти позже!'})
                })
            },
            checkColor(){
                if(JSON.parse(localStorage.getItem('accTinder')).accInfo.gender===20){
                    document.documentElement.style.setProperty('--main-color', this.$store.state.femaleColor);
                }
                else{
                    document.documentElement.style.setProperty('--main-color',  this.$store.state.maleColor);
                }
            }

        },
        mounted() {
            this.getUserData();
            this.checkColor()
        }


    }
</script>

<style scoped>
    .profile-img-big{
        width: 100%;
        height: 50%;
        object-fit: cover;
        object-position: top;
        cursor: pointer;
        margin-top: 54px;
    }

.btn-solid{
    background-color: var(--main-color) !important;
}
.btn-outline{
    border: 1px solid var(--main-color) !important;
    color:var(--main-color) !important;
    background: rgba(0,0,0,0);
}

    .candidate-info__details{
        display: flex;
        flex-direction: column;
        margin: 15px 0;
    }

    .candidate-info__details div{
        display: flex;
        gap: 3px;
        align-items: flex-end;

    }

    .product-detail-box{
        padding: 20px 15px;
    }

</style>