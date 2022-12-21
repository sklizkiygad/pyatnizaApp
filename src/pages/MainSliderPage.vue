<template>
    <div>
        <MyHeader/>
        <MainSlider/>
    </div>
</template>

<script>
    import MyHeader from "@/components/MyHeader";
    import MainSlider from "@/components/MainSlider";

    export default {
        components:{
            MyHeader,
            MainSlider
        },

        mounted() {
            this.$store.commit('setIsHeaderSidebar',false)
        }

    }
</script>

<style scoped>

</style>