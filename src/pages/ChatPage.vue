<template>
    <div>
<MyHeader/>
        <div class="chat-section">
            <div class="chat-section__profile">
                <img
                        class="chat-section__profile__img"
                        src="../assets/images/user/1.png"
                        @click="$router.push(`/candidate/${$route.params.id}`)"
                />
                <h3 class="chat-section__profile__name">Baba</h3>
            </div>
            <div class="chat-section__messages">
                <div v-for="message in messagesArray"
                     :key="message.id"
                     class="chat-section__messages__message"
                     :class="(message.accId===0)?('send-message'):('get-message')"
                >
                    <p>{{message.text}}</p>
                </div>

            </div>


            <div class="chat-section__type-message">

                <textarea v-on:keyup.enter="sendMessage" v-model="newMessageText" class="chat-section__type-message__textarea" cols="30" rows="10" ></textarea>
                <i type="submit" class="iconly-Message send-icon" @click="sendMessage" ></i>


            </div>
        </div>
    </div>
</template>

<script>

    import MyHeader from "@/components/MyHeader";
    export default {
        components: {MyHeader},
        data(){

            return{
                messagesArray:[
                    {id:0,accId:1,text:'Привет'},
                    {id:1,accId:1,text:'Как дела?'},
                ],
                newMessageText:''
            }

        },
        methods:{
            checkGenderColor(){
                if(JSON.parse(localStorage.getItem('accTinder')).accInfo.gender){
                    document.documentElement.style.setProperty('--main-color', this.$store.state.femaleColor);
                    document.documentElement.style.setProperty('--minor-color', this.$store.state.maleColor);
                }
                else{
                    document.documentElement.style.setProperty('--main-color',  this.$store.state.maleColor);
                    document.documentElement.style.setProperty('--minor-color', this.$store.state.femaleColor);
                }
            },
            sendMessage(){
                if(this.checkTextMessage(this.newMessageText)){
                    let newMessage={
                        id:this.messagesArray[this.messagesArray.length-1].id+1,
                        accId:0,
                        text:this.newMessageText
                    }
                    this.messagesArray.push(newMessage);

                }
                else{
                    this.$store.commit('setError',{typeErr:1,textErr:'Введите сообщение!'})

                }
                this.newMessageText=''


            },
            checkTextMessage(e){
                if(e.trim() !== ''){
                    return true;
                }
                else{
                    return false;
                }

            }
        },

        mounted() {
            this.checkGenderColor();
        }
    }
</script>

<style scoped>
    :root{
        --minor-color:#6ba6c2;
    }
    .chat-section{

        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        padding: 60px 30px 0 30px;

    }
    .chat-section__messages{
        max-width: 600px;
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        flex:1;

    }

    .chat-section__profile__name{
        color: var(--main-text-color);
    }

    .chat-section__messages__message{
        max-width: 50%;
        border-radius: 8px;
        padding: 5px;
        margin: 10px 0;
    }
    .chat-section__messages__message p{
        margin: 0;
        word-break: break-all;
        color: var(--main-text-color);
    }
    .get-message{
        background-color: var(--minor-color);
        margin-right: auto;
    }
    .send-message{
        background-color: var(--main-color);
        margin-left: auto;
    }
    .chat-section__type-message{
        max-width: 600px;
        width: 100%;
        display: flex;
        gap: 20px;

        align-items: center;
        padding: 20px 10px;
    }

    .chat-section__type-message__textarea{
        resize: none;
        max-height: 40px;
        flex: 1;
        border-radius: 8px;
        color: var(--main-text-color);
        border:2px solid var(--main-color);
        background: none;
    }

    .send-icon{
        font-size: 32px;
        cursor: pointer;
        color: var(--main-text-color);
    }

    .chat-section__profile{
        display: flex;
        width: 100%;
        max-width: 600px;
        gap: 20px;
        align-items: center;
    }

    .chat-section__profile__img{
        height: 50px;
        width: 50px;
        border-radius: 8px;
        object-fit: cover;
    }

</style>