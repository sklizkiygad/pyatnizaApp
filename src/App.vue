<template>
  <div id="app" @touchstart="touchStart" @touchEndMethod="touchEnd">
    <MyLoader/>
    <Training/>
    <NotificationModal/>
    <IsExitBlock/>
    <AlertBlock/>
    <HeaderSidebar/>
    <router-view/>
  </div>
</template>

<script>

  import AlertBlock from "@/components/AlertBlock";
  import MyLoader from "@/components/MyLoader";
  import HeaderSidebar from "@/components/HeaderSidebar";
  import IsExitBlock from "@/components/IsExitBlock";
  import Training from "@/components/Training";
  import NotificationModal from "@/components/NotificationModal";
  import axios from "axios";

  // require("./assets/css/vendors/bootstrap.css");
  // require("./assets/css/vendors/slick-theme.css");
  // require("./assets/css/vendors/slick.css");
  // require("./assets/css/vendors/iconly.css");

  export default {
    data(){
      return{
        biba:"assets/css/light-dark.css"
      }

    },
    components:{
      IsExitBlock,
      AlertBlock,
      MyLoader,
      HeaderSidebar,
      Training,
      NotificationModal
    },
    methods:{
      touchStart (touchEvent) {
        if(localStorage.getItem('accTinder')){
          if('accInfo' in JSON.parse(localStorage.getItem('accTinder'))){
            if (touchEvent.changedTouches.length !== 1) { // We only care if one finger is used
              return;
            }
            const posXStart = touchEvent.changedTouches[0].clientX;

              addEventListener('touchend', (touchEvent) => this.touchEnd(touchEvent, posXStart), {once: true});
          }
        }

      },

      touchEnd (touchEvent, posXStart) {
        if(localStorage.getItem('accTinder')){
          if('accInfo' in JSON.parse(localStorage.getItem('accTinder'))){
            if (touchEvent.changedTouches.length !== 1) { // We only care if one finger is used
              return;
            }
            const posXEnd = touchEvent.changedTouches[0].clientX;
            if (posXStart < posXEnd) {
              // if(posXStart<=25){
              // this.$store.commit('setIsHeaderSidebar',true);
              // }
            } else if (posXStart > posXEnd) {
              this.$store.commit('setIsHeaderSidebar',false);
            }
          }
        }
      },
     async toRefreshToken(){
       const userToken={
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
           Authorization: `Bearer ${JSON.parse(localStorage.getItem('accTinder')).access_token}`
         },
         params: {
           refreshToken:JSON.parse(localStorage.getItem('accTinder')).refresh_token
         }
       }
       await axios.get(`${this.$store.state.mainServer}/api/user/refresh-access-token`,userToken).then(res=>{
         console.log(res);
         let localStorageAcc = JSON.parse(localStorage.getItem('accTinder'));
         localStorageAcc.accInfo=res.data.data;
         localStorage.setItem('accTinder',JSON.stringify(localStorageAcc));
       }).catch((err)=>{
         console.log(err)
       })
      },

      checkIsTokenExpired(){
        let dateNow=new Date();
        let dateExpired=new Date(JSON.parse(localStorage.getItem('accTinder')).access_token_expired_at)
        if(dateNow< dateExpired){
          console.log('ок')
        }
        else{
          this.toRefreshToken();

        }

      },

      changeColorScheme(){

        const darkTheme={
          mainBgColor:'#2B2B2B',
          minorBgColor:'#232323',
          mainTextColor:'#ffffff'
        }

        const lightTheme={
          mainBgColor:'#ffffff',
          minorBgColor:'rgba(237, 239, 244, 0.6)',
          mainTextColor:'#222222'
        }

        let currentTheme=lightTheme;
        if(this.$store.state.isDarkTheme){
          currentTheme=darkTheme;
        }

        document.documentElement.style.setProperty('--main-bg-color', currentTheme.mainBgColor);
        document.documentElement.style.setProperty('--minor-bg-color', currentTheme.minorBgColor);
        document.documentElement.style.setProperty('--main-text-color', currentTheme.mainTextColor);
      },
      checkDarkTheme(){
        if(localStorage.getItem('accTinder') && JSON.parse(localStorage.getItem('accTinder')).darkTheme){
          this.$store.commit('setIsDarkTheme',true)
        }
        else{
          this.$store.commit('setIsDarkTheme',false)
        }

        this.changeColorScheme();
      },

    },

    mounted() {
      this.checkDarkTheme();

      if(localStorage.getItem('accTinder')){
        this.checkIsTokenExpired()
      }

    },
    watch:{
      '$store.state.isDarkTheme'(){
        this.changeColorScheme();
      },
      '$store.state.isShowExitAlert'(){
        this.$router.push('/');
      }
    }
  }



</script>

<style >
  @import "assets/css/vendors/bootstrap.css";
  @import "assets/css/vendors/slick-theme.css";
  @import "assets/css/vendors/slick.css";
  @import "assets/css/vendors/iconly.css";

  @import "assets/css/style.css";
  /*@import "assets/css/dark.css";*/
</style>




