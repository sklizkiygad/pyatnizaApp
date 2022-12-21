import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainServer:'https://api-friday.itguild.info',
    isError:false,
    typeError:0,
    textError:'',
    isLoading:false,
    isMatch:false,
    isHeaderSidebar:false,
    isDarkTheme:false,
    femaleColor:'#eb7f98',
    maleColor:'#6ba6c2',
    isWatchPhoto:false,
    isShowExitAlert:false,
    isTraining:false

  },
  getters: {
  },
  mutations: {

    setError(state,{typeErr=0,textErr=''}){
        state.typeError=typeErr;
        state.textError=textErr;
        state.isError=true;
        setTimeout(()=>{
          state.isError=false;
        },2000)
    },

      setIsLoading(state,isIt){
        state.isLoading=isIt
      },

    setIsMatch(state,isIt){
      state.isMatch=isIt;
    },

    setIsHeaderSidebar(state,isIt){
      state.isHeaderSidebar=isIt;
    },

    setIsDarkTheme(state,isIt){
      state.isDarkTheme=isIt;
    },

    setIsWatchPhoto(state,isIt){
      state.isWatchPhoto=isIt;
    },

    setIsShowExitAlert(state,isIt){
      state.isShowExitAlert=isIt;
    },

    setIsTraining(state,isIt){
      state.isTraining=isIt;
    },


  },
  actions: {

  },
  modules: {
  },


})
