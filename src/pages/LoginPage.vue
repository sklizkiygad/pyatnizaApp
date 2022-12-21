<template>

    <div>
        <LoginHeader/>
        <FormLogin/>
    </div>

</template>

<script>
    import FormLogin from "@/components/FormLogin";
    import LoginHeader from "@/components/LoginHeader";

    export default {
        components:{
            FormLogin,
            LoginHeader
        }

    }
</script>

<style scoped>

</style>