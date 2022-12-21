<template>
    <transition name="fade">
    <div class="react-screen" v-show="isShow">
        <img v-if="isLike" src="../assets/tinimg/likebig.png" alt="like">
        <img v-else src="../assets/tinimg/dislikebig.png" alt="like">
    </div>
    </transition>
</template>

<script>

    export default {
        props:{
            isLike:{
                type:Boolean,
                default:false
            },
            isShow:{
                type:Boolean,
                default: false
            }
        }

    }
</script>

<style scoped>
.react-screen{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(1,1,1,0.6);
}
.react-screen img{
    width: 90%;
    max-width: 500px;
    height: 60%;
    max-height: 600px;
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