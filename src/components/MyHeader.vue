<template>
    <header>
        <div class="nav-bar" @click="openSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-list burger" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
<!--            <img src="../assets/svg/bar.svg" class="img-fluid" alt="">-->
        </div>
        <router-link to="/" class="brand-logo">
            <img src="../assets/images/logo.png" class="img-fluid main-logo" alt="">
            <img src="../assets/images/logo-white.png" class="img-fluid white-logo" alt="">
        </router-link>
        <div class="header-option">
            <ul>

                <li @click="openNotificationsModal">
                    <i  class="iconly-Notification icli"></i>
                </li>
                <li @click="playTrain">
                    <i class="iconly-Info-Circle icli"></i>
                </li>

            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        methods:{
            openSidebar(){
                this.$store.commit('setIsHeaderSidebar',true)
            },
            playTrain(){
                this.$store.commit('setIsTraining',true)
                this.$router.push('/')
            },
            openNotificationsModal(){
                this.$store.commit('setIsNotificationModal',true)

            }
        }
    }

</script>

<style scoped>
i{
    font-size: 25px !important;
}

    .burger{
        fill:var(--main-text-color)
    }

</style>