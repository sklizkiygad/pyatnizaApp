<template>
    <div>
        <MyHeader/>

        <section class="top-space pt-0 px-15 about-us">
            <h2>О приложении</h2>
            <h2>Пятница - простой и понятный сервис для общения созможность знакомиться без лишних сложностей.</h2>
            <h2>Алгоритм предлагает фотографии людей, которые подходят под ваши запросы и находятся недалеко от вас. Вы пальцем смахиваете их влево, если кандидатура так себе, и вправо, если человек вас заинтересовал. Если пара совпала, вы можете начать переписываться, а дальше всё зависит только от вас.</h2>
        </section>
    </div>
</template>

<script>
    import MyHeader from "@/components/MyHeader";
    export default {
        name:'AboutUsPage',
        components:{MyHeader}

    }
</script>

<style scoped>
.about-us{
    margin-top: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
}
</style>