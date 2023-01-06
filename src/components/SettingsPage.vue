<template>
    <div>

        <MyHeader/>

        <section class="top-space pt-0 px-15 settings-block">
            <div class="content toggle-sec w-100">
                <div>
                    <h2 class="mb-0">Темная тема</h2>
                </div>
                <div class="button toggle-btn ms-auto">
                    <input type="checkbox" class="checkbox" @change="setDark" :checked="checkIsDark()">
                    <div class="knobs">
                        <span></span>
                    </div>
                    <div class="layer"></div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import MyHeader from "@/components/MyHeader";
    export default {
            name:'SettingsPage',
        components:{MyHeader},

        methods:{
            checkIsDark() {
                if (JSON.parse(localStorage.getItem('accTinder')).darkTheme) {
                    return true;
                }
                else{
                    return false;
                }
            },
            setDark(e) {
                let localTheme = JSON.parse(localStorage.getItem('accTinder'));
                localTheme.darkTheme = e.target.checked;
                localStorage.setItem('accTinder', JSON.stringify(localTheme))
                this.$store.commit('setIsDarkTheme',e.target.checked)
                // this.$router.go()
            },
        }
    }
</script>

<style scoped>

    .settings-block{
        margin-top: 75px;
    }

</style>