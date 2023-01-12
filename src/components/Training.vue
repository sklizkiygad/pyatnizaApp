<template>
    <transition name="fade">


    <div class="training" @click="$store.commit('setIsTraining', false)" v-show="$store.state.isTraining">

        <div class="training__text-arrows">
        <div class="training__text">


                <div class="btn btn--decline" >
                    <p>Отменить оценку</p>
                    <img src="../assets/tinimg/rewind.png" alt="">

                </div>
                <div class="btn btn--skip" >
                    <p>Не понравился</p>
                    <img src="../assets/tinimg/nope.png" alt="">

                </div>
                <div class="btn btn--like" >
                    <p>Понравился</p>
                    <img src="../assets/tinimg/like.png" alt="">

                </div>
                <div class="btn btn--super" >
                    <p>Суперлайк</p>
                    <img src="../assets/tinimg/super-like.png" alt="">

                </div>




<!--           <h1 class="text-back">Отменить оценку</h1>-->
<!--           <h1 class="text-diss">Не понравился</h1>-->
<!--            <h1 class="text-like">Понравился</h1>-->
<!--           <h1 class="text-super">Суперлайк</h1>-->

        </div>
<!--        <div class="training__arrows">-->
<!--        <div class="arrow-3 back"></div>-->
<!--        <div class="arrow-3 diss"></div>-->
<!--            <div class="arrow-3 like"></div>-->
<!--        <div class="arrow-3 super"></div>-->

<!--        </div>-->
        </div>
    </div>
    </transition>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.training{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 6;
    display: flex;
    align-items: flex-end;
}
.training__arrows{
    position: relative;
    bottom: 75px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.arrow-3 {
    width:78px;
    height:30px;
    display: flex;
    bottom: 100px;
    transform: rotate(270deg);

}

.arrow-3:after {
    content: "";
    flex: 1;
    margin: 0 5px;
    background: #ca9702;
    clip-path: polygon(0 10px,calc(100% - 15px) 10px,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,calc(100% - 15px) calc(100% - 10px),0 calc(100% - 10px));
    animation: a3 .5s infinite alternate;
}

.arrow-3:after {
    --s:-1;
}
@keyframes a3 {
    0%  {transform: scaleX(var(--s,1)) translate(-4px)}
    100%{transform: scaleX(var(--s,1)) translate( 4px)}
}

.back:after {
    background: #ca9702;
}
.diss:after{
    background: #d41e2e;
}
.super:after{
    background: #257dff;
}
.like:after{
    background: #67b992;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.training__text-arrows{
    width: 100%;
}

.training__text{
    position: absolute;
    padding-top: 10px;
    top: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.text-back {
    color: #ca9702;
}
.text-diss{
    color: #d41e2e;
}
.text-super{
    color: #257dff;
}
.text-like{
    color: #67b992;
}

.btn{
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
}
.btn p{
    color: whitesmoke;

}
    .btn img{
        height: 20px;
        width: 20px;
    }


</style>