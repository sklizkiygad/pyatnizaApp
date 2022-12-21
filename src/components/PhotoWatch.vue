<template>
    <transition>
    <div class="photo-watch" @click="closePhoto" v-show="this.$store.state.isWatchPhoto">
        <img :src="imgSrc" alt="main">
    </div>
    </transition>
</template>

<script>
    export default {

        props:{
            imgSrc:{
                type:String,
                default:''

            }
        },

        methods:{
            closePhoto(){
                this.$store.commit('setIsWatchPhoto',false)
            }
        }

    }
</script>

<style scoped>
.photo-watch{
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(1,1,1,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

    .photo-watch img{
        width: 100%;
        object-fit: cover;
        object-position: center;
    }


</style>