<template>
    <transition name="fade">
        <div class="is-exit-block" @click="$store.commit('setIsShowExitAlert',false)" v-show="$store.state.isShowExitAlert">
            <div class="is-exit-block__content w-100" @click.stop>
                <div class="offcanvas-body small">
                    <div class="content">
                        <h4>Выход из аккаунта:</h4>
                        <p>Уверены что хотите выйти из аккаунта?</p>
                    </div>
                    <div class="bottom-cart-panel">
                        <div class="row">
                            <div class="col-7">
                                <a class="btn btn-outline" @click="$store.commit('setIsShowExitAlert',false)">Отмена</a>
                            </div>
                            <div class="col-5">
                                <a class="btn btn-solid" @click="exitAccount">Выйти</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {

        methods:{

            exitAccount(){
                localStorage.removeItem('accTinder');
                this.$router.go();
            },

        }

    }
</script>

<style scoped>
    .is-exit-block{
        position: fixed;
        bottom: 0;
        top:0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        background: rgba(1,1,1,0.5);
        z-index: 100;
    }
</style>