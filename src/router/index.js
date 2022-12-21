import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import RecoverPasswordPage from "@/pages/RecoverPasswordPage";
import FirstBlankPage from "@/pages/FirstBlankPage";
import MainSliderPage from "@/pages/MainSliderPage";
import ProfilePage from "@/pages/ProfilePage";
import AddPhotoPage from "@/pages/AddPhotoPage";
import ChatsPage from "@/pages/ChatsPage";
import ChatPage from "@/pages/ChatPage";
import CandidatePage from "@/pages/CandidatePage";



Vue.use(VueRouter)


function checkAuthAndBlank() {
  if(localStorage.getItem('accTinder')){
    if('accInfo' in JSON.parse(localStorage.getItem('accTinder'))){
      if(JSON.parse(localStorage.getItem('accTinder')).accInfo.photo!=='N/A'){
        return MainSliderPage;
      }
      else{
        return AddPhotoPage
      }

    }
    else {
      return FirstBlankPage;
    }
  }
  else{
    return LoginPage;
  }
}



const routes = [
  {
    path: '/',
    component: checkAuthAndBlank()
  },
  {
    path: '/sign-up',
    component: RegistrationPage
  },
  {
    path: '/otp',
    component: RecoverPasswordPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/chats',
    component: ChatsPage
  },
  {
    path: '/chat/:id',
    component: ChatPage
  },
  {
    path: '/candidate/:id',
    component: CandidatePage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
