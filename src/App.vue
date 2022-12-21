<template>
  <div id="app">
    <MyLoader/>
    <Training/>
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
      Training
    },
    methods:{
      // touchStart (touchEvent) {
      //   if(localStorage.getItem('accTinder')){
      //     if('accInfo' in JSON.parse(localStorage.getItem('accTinder'))){
      //       if (touchEvent.changedTouches.length !== 1) { // We only care if one finger is used
      //         return;
      //       }
      //       const posXStart = touchEvent.changedTouches[0].clientX;
      //
      //         addEventListener('touchend', (touchEvent) => this.touchEnd(touchEvent, posXStart), {once: true});
      //     }
      //   }
      //
      // },
      //
      // touchEnd (touchEvent, posXStart) {
      //   if(localStorage.getItem('accTinder')){
      //     if('accInfo' in JSON.parse(localStorage.getItem('accTinder'))){
      //       if (touchEvent.changedTouches.length !== 1) { // We only care if one finger is used
      //         return;
      //       }
      //       const posXEnd = touchEvent.changedTouches[0].clientX;
      //       if (posXStart < posXEnd) {
      //         if(posXStart<=25){
      //         this.$store.commit('setIsHeaderSidebar',true);
      //         }
      //       } else if (posXStart > posXEnd) {
      //         this.$store.commit('setIsHeaderSidebar',false);
      //       }
      //     }
      //   }
      // },

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
    },
    watch:{
      '$store.state.isDarkTheme'(){
        this.changeColorScheme();
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




