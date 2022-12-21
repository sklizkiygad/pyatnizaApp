<template>
    <div>
        <LoginHeader/>
        <FormRecoverPassword/>
    </div>
</template>

<script>
    import FormRecoverPassword from "@/components/FormRecoverPassword";
    import LoginHeader from "@/components/LoginHeader";
    export default {
        components:{
            FormRecoverPassword,
            LoginHeader
        }

    }
</script>

<style scoped>

</style>