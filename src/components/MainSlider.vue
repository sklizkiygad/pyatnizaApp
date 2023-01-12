<template>

    <section class="main-slider">
        <ReactScreen :is-like="isReactLike" :is-show="isShowReact"/>
        <MatchScreen :acc-info="matchAccount"/>
        <div
                v-if="current"
                class="fixed fixed--center"
                style="z-index: 3"
                :class="{ 'transition': isVisible }">
            <Vue2InteractDraggable
                    v-if="isVisible"
                    :interact-out-of-sight-x-coordinate="500"
                    :interact-max-rotation="15"
                    :interact-x-threshold="100"
                    :interact-y-threshold="200"
                    :interact-event-bus-events="interactEventBus"
                    interact-block-drag-down
                    @draggedRight="emitAndNext('match')"
                    @draggedLeft="emitAndNext('reject')"
                    @draggedUp="emitAndNext('skip')"
                    class="rounded-borders card card--one">
                <div style="height: 100%">
                    <img
                            :src="current.photo && current.photo !== 'N/A'? `${this.$store.state.mainServer}/uploads/profile-photo/${current.photo}`:require('../assets/images/user/1.png')"
                            class="rounded-borders"/>
                    <div class="card__text">
                        <h2 @touchend="openProfile" @click="openProfile">{{current.name}}, {{getAge(current.birthday)}}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                        </svg>
                    </div>
                </div>
            </Vue2InteractDraggable>
        </div>
        <div
                v-if="next"
                class="rounded-borders card card--two fixed fixed--center"
                style="z-index: 2">
            <div style="height: 100%">
                <img
                        :src="current.photo && current.photo !== 'N/A'? `${this.$store.state.mainServer}/uploads/profile-photo/${next.photo}`:require('../assets/images/user/1.png')"
                        class="rounded-borders"/>
                <div class="card__text">
                    <h2>{{next.name}}, {{getAge(current.birthday)}}</h2>
                </div>
            </div>
        </div>
<!--        <div-->
<!--                v-if="index + 2 < cards.length"-->
<!--                class="rounded-borders card card&#45;&#45;three fixed fixed&#45;&#45;center"-->
<!--                style="z-index: 1">-->
<!--            <div style="height: 100%">-->
<!--            </div>-->
<!--        </div>-->

        <div class="reach-end-block" v-show="isReachEnd">
            <h1>На сегодня анкеты закончились</h1>
        </div>
        <div class="main-slider__footer" v-show="!isReachEnd">
            <div class="btn btn--decline" @click="toBackAcc">
                <img src="../assets/tinimg/rewind.png" alt="">
            </div>
            <div class="btn btn--skip" @click="reject">
                <img src="../assets/tinimg/nope.png" alt="">
            </div>
            <div class="btn btn--like" @click="match">
                <img src="../assets/tinimg/like.png" alt="">
            </div>
            <div class="btn btn--super" @click="skip">
                <img src="../assets/tinimg/super-like.png" alt="">
            </div>

        </div>
    </section>
</template>

<script>
    import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
    import MatchScreen from "@/components/MatchScreen";
    import ReactScreen from "@/components/ReactScreen";
    import axios from "axios";

    const EVENTS = {
        MATCH: 'match',
        SKIP: 'skip',
        REJECT: 'reject'
    }
    export default {
        name: 'SwipeableCards',
        components: {MatchScreen, Vue2InteractDraggable, ReactScreen },
        data() {
            return {
                isVisible: true,
                index: 0,
                interactEventBus: {
                    draggedRight: EVENTS.MATCH,
                    draggedLeft: EVENTS.REJECT,
                    draggedUp: EVENTS.SKIP
                },
                matchAccount:{},
                cards: [],
                isShowReact:false,
                isReactLike:false,
                isReachEnd:false,
                counterClick: 0
            }
        },
        computed: {
            current() {
                return this.cards[this.index]
            },
            next() {
                return this.cards[this.index + 1]
            },


        },
        watch:{
            index(){
                 this.checkIsEnd()
            },
            '$store.state.isTraining'(){
                if(this.$store.state.isTraining && !this.cards.length){

                    this.cards.push({"id": 9,
                        "name": "Woman1",
                        "gender": 20,
                        "photo": null,
                        "user_id": 6,
                        "city_id": 3,
                        "birthday": "2000-10-24 13:06:47",
                        "created_at": "2022-10-24 13:07:04",
                        "updated_at": "2022-10-24 13:07:13",
                        "min_age": 18,
                        "max_age": 34,
                        "about": null,
                        "orientation": 50})

                    this.isReachEnd=false;
                }
                else{
                    this.cards=[]
                    this.isReachEnd=true;
                }

            }
        },
        methods: {
            match() {
                this.isReactLike=true;
                this.isShowReact=true;
                setTimeout(()=>{
                    this.isShowReact=false;
                },1000)
                InteractEventBus.$emit(EVENTS.MATCH)
            },

            reject() {
                this.isReactLike=false;
                this.isShowReact=true;
                setTimeout(()=>{
                    this.isShowReact=false;
                },1000)
                InteractEventBus.$emit(EVENTS.REJECT)

            },
            skip() {

                InteractEventBus.$emit(EVENTS.SKIP)

            },
            async postSendReaction(reac){
                const myId=JSON.parse(localStorage.getItem('accTinder')).accInfo.id
                const likeInfo={
                    status: reac,
                    candidate_profile_id: this.cards[this.index].id	,
                    user_profile_id: myId,
                }
                await axios.post(`${this.$store.state.mainServer}/api/watched-profiles/viewed-profile`,likeInfo,{headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                }}).then(res=>{
                    console.log(res.data.data.mutual + reac)
                    if(reac===10){
                        if(res.data.data.mutual){
                            this.matchAccount=this.cards[this.index-1];
                            this.$store.commit('setIsMatch',true);
                        }
                        else{
                            this.$store.commit('setIsMatch',false);
                        }
                    }
                    else{
                        this.$store.commit('setIsMatch',false);
                    }

                }).catch(err=>{
                    console.log(err)
                })


            },
            openProfile(){
                this.$router.push(`/candidate/${this.cards[this.index].id}`)
            },

            emitAndNext(event) {
                if(event==='match'){
                    this.isReactLike=true;
                    this.postSendReaction(10);
                }
                else{
                    this.isReactLike=false;
                    this.postSendReaction(30);
                }
                this.isShowReact=true;
                setTimeout(()=>{
                    this.isShowReact=false;
                },1000)
                this.$emit(event, this.index)
                setTimeout(() => this.isVisible = false, 200)
                setTimeout(() => {
                    this.index++
                    this.isVisible = true
                }, 200)
            },
            checkIsAuth(){
                if(!localStorage.getItem('accTinder')){
                    this.$router.go();
                }
            },
           async getCardsCandidates(){
                this.$store.commit('setIsLoading',true);
               const userToken={
                   headers: {
                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                       Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                   },
               }
                await axios.get(`${this.$store.state.mainServer}/api/user-profile/candidates`,userToken).then(res=>{
                    console.log(res.data.candidateProfiles)
                    if(res.data.candidateProfiles.length>0){
                        res.data.candidateProfiles.forEach(item=>{
                            this.cards.push(item)
                        })

                    }


                }).catch(err=>{
                    console.log(err)
                    this.$store.commit('setError',{typeErr:3,textErr:'Проблемы с сервером!'})
                    if(err.response.status===401){
                        localStorage.removeItem('accTinder');
                        this.$router.go()
                    }
                    }
                )
               this.$store.commit('setIsLoading',false);
               this.checkIsEnd();
            },
            async toBackAcc(){
                if(this.index>0) {
                    const myId=JSON.parse(localStorage.getItem('accTinder')).accInfo.id
                    const deleteMark = {
                        candidate_profile_id:this.cards[this.index-1].id,
                        user_profile_id:myId
                    }


                    await axios.post(`${this.$store.state.mainServer}/api/watched-profiles/delete-view`, deleteMark, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                        }
                    }).then((res)=>{
                        console.log(res);
                        this.$store.commit('setError',{typeErr:1,textErr:'Отменена оценка!'})
                    }).catch(err=>{
                        console.log(err);
                        this.$store.commit('setError',{typeErr:3,textErr:'Проблемы с сервером!'})
                    })


                    this.index = this.index - 1;
                }

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
            checkIsEnd(){
                console.log(this.cards.length)
                if(this.index === this.cards.length){
                    this.isReachEnd=true;
                }
            }

        },
        mounted() {
            this.checkIsAuth();
            this.getCardsCandidates();

        }
    }
</script>

<style scoped>
    .main-slider {
        width: 100%;
        height: 100vh;
    }



    .main-slider__footer {
        /*width: 77vw;*/
        /*bottom: 0;*/
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
        /*display: flex;*/
        /*padding-bottom: 30px;*/
        /*justify-content: space-around;*/
        /*align-items: center;*/
        position: fixed;
        bottom: 0;
        background: var(--main-bg-color);
        /*background: rgba(0,0,0,0.8);*/
        /*-webkit-box-shadow: 0px -2px 21px 20px rgba(0, 0, 0, 0.8);*/
        /*-moz-box-shadow: 0px -2px 21px 20px rgba(0, 0, 0, 0.8);*/
        /*box-shadow: 0px -2px 21px 20px rgba(0, 0, 0, 0.8);*/
        -webkit-box-shadow: 0px 0px 21px 20px var(--main-bg-color);
        -moz-box-shadow: 0px 0px 21px 20px var(--main-bg-color);
        box-shadow: 0px 0px 21px 20px var(--main-bg-color);
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 5;

    }
    .main-slider__footer img{
        height: 35px;
        width: 35px;
        border-radius: 50%;
        -webkit-box-shadow: 0px 7px 24px 3px rgba(0, 0 ,0,  0.2);
        -moz-box-shadow: 0px 7px 24px 3px rgba(0, 0 ,0,  0.2);
        box-shadow: 0px 7px 24px 3px rgba(0, 0 ,0,  0.2);

    }

    .flex {
        display: flex;
    }
    .flex--center {
        align-items: center;
        justify-content: center;
    }

    .fixed {
        position: fixed;
    }

    .fixed--center {
        /*left: 50%;*/
        /*top: 45%;*/
        /*transform: translate(-50%, -50%);*/
        top: 54px;
    }

    .rounded-borders {
        /*border-radius: 0 0 12px 12px;*/
    }

    .reach-end-block{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .reach-end-block h1{
        color:var(--main-text-color)
    }

    .card {
        /*width: 80vw;*/
        /*height: 70vh;*/
        /*color: white;*/
        /*max-width: 600px;*/
        width: 100vw;
        height: calc(100vh - 54px);
        color: white;
        max-width: 600px;
    }

    .card img {
        object-fit: cover;
        object-position: top;
        display: block;
        width: 100%;
        height: 100%;
    }

    .card--one {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
    }

    .card--two {
        /*transform: translate(-48%, -48%);*/
        /*box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);*/
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
    }

    .card--three {
        background: rgba(0, 0, 0, 0.8);
        transform: translate(-46%, -46%);
        box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
    }

    .card__text {
        display: flex;
        position: absolute;
        gap: 5px;
        align-items: center;
        bottom: 55px;
        width: 100%;
        padding: 25px;
    }

    .card__text h2{
        color:white;
        text-shadow: 5px 1px 11px black;
        font-size: 25px;
    }
    .card__text svg{
        text-shadow: 5px 1px 11px black;
    }

    .btn--skip img, .btn--like img{
        height: 45px;
        width: 45px;
    }

    .transition {
        animation: appear 100ms ease-in;
    }

    @keyframes appear {
        from {
            transform: translate(-48%, -48%);
        }
        to {
            transform: translate(-50%, -50%);
        }
    }


</style>