<template>
    <transition name="fade">
    <div class="notifications-modal" @click="$store.commit('setIsNotificationModal', false)" v-show="$store.state.isNotificationModal">

        <div class="notifications-modal__content" @click.stop >
            <div class="cancel-icon">
                <i @click="$store.commit('setIsNotificationModal', false)" class="iconly-Close-Square icli cancel-icon"></i>
            </div>

            <Notifications/>
        </div>

    </div>
    </transition>
</template>

<script>
    import Notifications from "@/components/Notifications";
    export default {
        components:{Notifications}

    }
</script>

<style scoped>
.notifications-modal{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 6;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

}

    .notifications-modal__content{
        max-width: 500px;
        width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 3px;
        background: rgba(236, 233, 233, 1);
    }
    .filter-content{
        margin-top: 0;
    }
    .cancel-icon{
        text-align: right;
    }
.cancel-icon i{
   font-size: 24px;
}
</style>