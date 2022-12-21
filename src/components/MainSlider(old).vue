<template>
    <div class="main-slider">

        <MatchScreen :acc-info="matchAccount"/>
        <div class="reach-end-block" v-show="isReachEnd">
            <h1>Просмотрены все анкеты</h1>
        </div>

        <Tinder  ref="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
            <template slot-scope="scope">
                <div
                        class="pic"
                        :style="{
            'background-image': `url(${scope.data.imgSrc})`
          }"
                >
                    <div class="slide-info">
                        <a>{{source[scope.data.id].accName}}, {{source[scope.data.id].accAge}}</a>
                        <a>{{source[scope.data.id].accWork}}</a>

                    </div>
                </div>
            </template>

            <img class="like-pointer" slot="like" src="../assets/tinimg/like-txt.png"/>
            <img class="nope-pointer" slot="nope" src="../assets/tinimg/nope-txt.png"/>
            <img class="super-pointer" slot="super" src="../assets/tinimg/super-txt.png"/>
            <img class="rewind-pointer" slot="rewind" src="../assets/tinimg/rewind-txt.png"/>
        </Tinder>
        <div class="btns">
            <img src="../assets/tinimg/rewind.png" @click="decide('rewind')"/>
            <img src="../assets/tinimg/nope.png" @click="decide('nope')"/>
            <img src="../assets/tinimg/super-like.png" @click="decide('super')"/>
            <img src="../assets/tinimg/like.png" @click="decide('like')"/>
        </div>
    </div>

</template>

<script>
    import Tinder from "vue-tinder";
    import MyHeader from "@/components/MyHeader";
    import MatchScreen from "@/components/MatchScreen";


    export default {
        components: { Tinder, MyHeader, MatchScreen},
        data: () => ({
            queue: [],
            offset: 0,
            history: [],
            source:[
                {id:0, imgSrc: "https://sun9-61.userapi.com/impg/8jRVJBSZoQBNaaE4bRo6IcSbloX_G5GFHtDXSw/xdFY7Om4bHI.jpg?size=960x1280&quality=95&sign=7139b174b08893b65785b488161e0a75&type=album",accName:'Biba',accWork:'Frontend',accAge:'15',isLike:true},
                {id:1, imgSrc: "https://sun9-21.userapi.com/impg/uczLlMr8jOupTHQJwwEx_8s3ouJuzrL_OMlJKA/0N21Rx9u3dI.jpg?size=720x1080&quality=96&sign=6694e6ccaf56e6beb85a6c8d93434e4a&type=album",accName:'Boba',accWork:'Backend',accAge:'10',isLike:false},
                {id:2, imgSrc: "https://sun9-53.userapi.com/impg/c857436/v857436906/16f243/JjG90QOzbQQ.jpg?size=1440x1440&quality=96&sign=c35058b3a5f2c7ddf896c279b086be4e&type=album",accName:'Buba',accWork:'Fullend',accAge:'11',isLike:false},
                {id:3, imgSrc: "https://sun9-23.userapi.com/impf/c857524/v857524952/1fc07/CSUz1tcj_lU.jpg?size=1882x1707&quality=96&sign=9587c3ad31ec1cdea03a586b4070af90&type=album",accName:'Baba',accWork:'Fillend',accAge:'11',isLike:true},
                {id:4, imgSrc: "https://sun9-6.userapi.com/impf/c840720/v840720449/2ecc3/g_E43w-7-VE.jpg?size=600x400&quality=96&sign=8ae4dd220a3d072b16e7bd0465f94866&type=album",accName:'Beba',accWork:'End',accAge:'12',isLike:false},
            ],
            isReachEnd:false,
            matchAccount:{},
            isMatch:false
        }),
        created() {
            this.mock();
            console.log(this.source);
        },
        methods: {

            mock(count = this.source.length, append = true) {

                const list = [];
                for (let i = 0; i < count; i++) {

                    list.push({id:i,imgSrc: this.source[this.offset].imgSrc,isLike:this.source[this.offset].isLike,accName:this.source[this.offset].accName});

                    this.offset++;
                }
                if (append) {
                    this.queue = this.queue.concat(list);
                } else {
                    this.queue.unshift(...list);
                }
            },


            onSubmit({ item ,type}) {
                this.history.push(item);
                if(item.isLike && type==='like'){
                    this.matchAccount=item;
                    this.$store.commit('setIsMatch',true);
                }
            },
            async decide(choice) {


                if (choice === "rewind") {
                    if (this.history.length) {
                        this.$refs.tinder.rewind([this.history.pop()]);
                    }
                    this.isReachEnd=false;

                } else if (choice === "help") {
                    window.open("https://shanlh.github.io/vue-tinder");
                } else {
                    if (!this.isReachEnd) {
                        this.$refs.tinder.decide(choice);
                    }
                }
            }
        },

        watch:{
            queue(){

                if(!this.queue.length){
                    console.log(this.queue.length)
                    this.isReachEnd=true;
                }
            }
        }


    };
</script>

<style scoped>
    @import "../assets/css/vendors/main-slider.css";
</style>