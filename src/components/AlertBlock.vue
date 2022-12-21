<template>
    <transition name="fade">
    <div class="fixed-bottom w-100" v-show="this.$store.state.isError">
<!--        <div class="alert alert-primary d-flex align-items-center" role="alert">-->
<!--            <i class="iconly-Info-Square icli"></i>-->
<!--            <div>-->
<!--                An example alert with an icon-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="alert alert-success d-flex align-items-center" role="alert">-->
<!--            <i class="iconly-Tick-Square icli"></i>-->
<!--            <div>-->
<!--                An example success alert with an icon-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="alert alert-warning d-flex align-items-center" role="alert">-->
<!--            <i class="iconly-Danger icli"></i>-->
<!--            <div>-->
<!--                An example warning alert with an icon-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="alert alert-danger d-flex align-items-center w-100" role="alert">-->
<!--            <i class="iconly-Danger icli"></i>-->
<!--            <div>-->
<!--                {{$store.state.textError}}-->
<!--            </div>-->
<!--        </div>-->

        <div class="alert d-flex align-items-center w-100"
             :class="{ 'alert-danger':this.$store.state.typeError===3,
                       'alert-warning':this.$store.state.typeError===2,
                       'alert-primary':this.$store.state.typeError===1,
                       'alert-success':this.$store.state.typeError===0}"
             role="alert">
            <i class="icli"
               :class="{'iconly-Danger':this.$store.state.typeError===3,
                        'iconly-Tick-Square':this.$store.state.typeError===2,
                        'iconly-Info-Square':this.$store.state.typeError===1,
                        'iconly-Tick-Square':this.$store.state.typeError===0}"
            >
            </i>
            <div>
                {{$store.state.textError}}
            </div>
        </div>

    </div>
    </transition>
</template>

<script>
    export default {



    }
</script>

<style scoped>
.alert{
    margin-bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>