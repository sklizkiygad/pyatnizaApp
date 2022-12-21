<template>
    <div class="filter-content chats-holder">
        <div class="item order" v-for="item in chatList">
            <div class="media" >
                <img @click="$router.push(`/candidate/${item.id}`)" :src="item.photo && item.photo !== 'N/A' ? `${$store.state.mainServer}/${item.photo}`: require('../assets/images/user/1.png')" class="img-fluid">
                <div class="media-body" @click="$router.push(`/chat/${item.id}`)">
                    <h4>{{item.name}}</h4>
                    <h5 class="mt-2 mb-2">Привет</h5>
                    <h6 class="content-color">10 July, 2021</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {

        data(){
            return{
                chatList:[]
            }
        },

        methods:{
            async getChatList(){
                this.$store.commit('setIsLoading',true)
                const userToken={
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
                    },
                    params:{
                        status:10
                    }
                }

                await axios.get(`${this.$store.state.mainServer}/api/user-profile/joint`,userToken).then(res=>{
                    console.log(res)
                    this.chatList=res.data.candidateProfiles;

                }).catch(err=>{
                    console.log(err)
                    this.$store.commit('setError',{typeErr:3,textErr:'Проблемы с сервером!'})
                })
                this.$store.commit('setIsLoading',false)
            }

        },

        mounted() {
            this.$store.commit('setIsHeaderSidebar',false)
            this.getChatList()
        }


    }
</script>

<style scoped>
    .chats-holder{
        padding: 65px 0;
    }

    .media-body{
        width: 100%;
        cursor: pointer;
    }
</style>