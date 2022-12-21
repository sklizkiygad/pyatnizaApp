<template>
    <transition name="fade">
    <div class="match-screen" v-show="this.$store.state.isMatch" @click="closeMatch">
        <div class="match-screen__content" @click.stop>
            <h1>Взаимная симпатия с {{accInfo.name}}</h1>
            <img :src="accInfo.imgSrc && accInfo.imgSrc !== 'N/A'? `${this.$store.state.mainServer}/uploads/profile-photo/${accInfo.imgSrc}`:require('../assets/images/user/1.png')">
            <div class="match-screen__content__buttons">
                <button @click="goToChat" class="btn btn-solid">Написать</button>
                <button @click="closeMatch" class="btn btn-secondary">Продолжить просмотр</button>
            </div>

        </div>
    </div>
    </transition>
</template>

<script>
    export default {

        props:{
            accInfo:{
                type:Object,
            }
        },
        methods:{
            closeMatch(){
                this.$store.commit('setIsMatch',false)
            },
            goToChat(){
                this.$store.commit('setIsMatch',false)
                this.$router.push(`/chat/${this.accInfo.id}`)
            }
        }
    }
</script>

<style scoped>
.match-screen{
    position: fixed;
    z-index: 50;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(1,1,1, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;

}

.match-screen__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;


}

.match-screen__content img{
    height: 300px;
    width: 250px;
    object-fit: cover;
    border-radius: 10px;

}

.match-screen__content__buttons{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.match-screen__content h1{
   color: white;
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