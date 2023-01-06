<template>

    <transition name="slide-fade">
    <div class="header-sidebar-handler" @click="closeSidebar" v-if="this.$store.state.isHeaderSidebar">

    <div class="header-sidebar" @click.stop>
        <router-link to="/profile" class="user-panel">
            <img :src="getPhoto()" class="img-fluid user-img" alt="">
            <span>Привет, {{getAccName()}}</span>
            <i class="iconly-Arrow-Right-2 icli"></i>
        </router-link>
        <div class="sidebar-content">
            <ul class="link-section" @click="closeSidebar">
                <li @click.stop>
                    <div>
                        <i class="iconly-Setting icli"></i>
                        <div class="content toggle-sec w-100">
                            <div>
                                <h4 class="mb-0">Темная тема</h4>
                            </div>
                            <div class="button toggle-btn ms-auto">
                                <input type="checkbox" class="checkbox" @change="setDark" :checked="checkIsDark()">
                                <div class="knobs">
                                    <span></span>
                                </div>
                                <div class="layer"></div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <router-link to="/">
                        <i class="iconly-Heart icli"></i>
                        <div class="content">
                            <h4>На главную</h4>
                            <h6>Выбирать вторую половинку</h6>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/chats">
                        <i class="iconly-Chat icli"></i>
                        <div class="content">
                            <h4>Мои чаты</h4>
                            <h6>Список чатов</h6>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/profile">
                        <i class="iconly-Profile icli"></i>
                        <div class="content">
                            <h4>Ваш аккаунт</h4>
                            <h6>Настройки профиля, анкета</h6>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/notifications">
                        <i class="iconly-Notification icli"></i>
                        <div class="content">
                            <h4>Уведомления</h4>
                            <h6>Сообщения, уведомления</h6>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/settings">
                        <i class="iconly-Setting icli"></i>
                        <div class="content">
                            <h4>Настройки</h4>
                            <h6>Общие настройки приложения</h6>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="divider"></div>
            <ul class="link-section">
                <li>
                    <router-link to="/about">
                        <i class="iconly-Info-Square icli"></i>
                        <div class="content">
                            <h4>О нас</h4>
                            <h6>Про наше приложение</h6>
                        </div>
                    </router-link>
                </li>

                <li>
                    <div class="justify-content-center d-flex w-100">
                        <a class="btn btn-danger text-uppercase" @click="isExit">Выйти</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    </div>
    </transition>
</template>

<script>
    export default {


        methods: {
            closeSidebar() {
                this.$store.commit('setIsHeaderSidebar', false)
            },
            getAccName() {
                return JSON.parse(localStorage.getItem('accTinder')).accInfo.name
            },
            getPhoto() {
                return JSON.parse(localStorage.getItem('accTinder')).accInfo.photo !== 'N/A' ? `${this.$store.state.mainServer}/${JSON.parse(localStorage.getItem('accTinder')).accInfo.photo}` : require('../assets/images/user/1.png')
            },
            setDark(e) {
                let localTheme = JSON.parse(localStorage.getItem('accTinder'));
                localTheme.darkTheme = e.target.checked;
                localStorage.setItem('accTinder', JSON.stringify(localTheme))
                this.$store.commit('setIsDarkTheme',e.target.checked)
               // this.$router.go()
            },
            checkIsDark() {
                if (JSON.parse(localStorage.getItem('accTinder')).darkTheme) {
                    return true;
                }
                else{
                    return false;
                }
            },
            isExit(){
                this.$store.commit('setIsShowExitAlert',true)
            }





        }
    }
</script>

<style scoped>

    .header-sidebar-handler{
        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 10;
        background: rgba(1,1,1,0.6);
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(-25px);
        opacity: 0;
    }
</style>