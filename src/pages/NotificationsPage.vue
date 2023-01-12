<template>
    <div>
<MyHeader/>
        <Notifications/>

    </div>
</template>

<script>
    import MyHeader from "@/components/MyHeader";
import Notifications from "@/components/Notifications";
    export default {
        name:'NotificationsPage',
        components:{MyHeader, Notifications},

        methods:{

        },
        mounted() {
            this.$store.commit('setIsHeaderSidebar',false)
        }
    }
</script>

<style scoped>



</style>