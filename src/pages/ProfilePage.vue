<template>
    <div>
        <MyHeader/>
        <ProfileInfo/>
    </div>
</template>

<script>
    import MyHeader from "@/components/MyHeader";
    import ProfileInfo from "@/components/ProfileInfo";
    export default {
        components:{
            MyHeader,
            ProfileInfo
        },
        mounted() {
            this.$store.commit('setIsHeaderSidebar',false)
        }

    }
</script>

<style scoped>

</style>