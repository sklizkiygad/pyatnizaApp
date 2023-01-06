<template>
    <div id="ourHolder" class="filter-content">

        <div class="item order" v-for="item in notificationsArray" :key="item.id">
            <div class="media">
                <img src="@/assets/images/notification/1.jpg" class="img-fluid" alt="">
                <div class="media-body">
                    <h4>{{item.name}}</h4>
                    <h6 class="content-color">{{item.date}}</h6>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name:'Notifications',
        data(){
            return{
                notificationsArray:[
                    {id:0, name:'Новое сообщение',date:'06.01.2023'},
                    {id:0, name:'Вас оценили',date:'08.01.2023'},
                ]
            }
        },
    }
</script>

<style scoped>
    .filter-content{
        margin-top: 75px;
    }
</style>