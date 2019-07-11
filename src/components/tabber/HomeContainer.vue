<template>
    <div>
        <!--<mt-swipe :auto="4000">-->
            <!--<mt-swipe-item v-for="item in lunbotuList" :key="item.id"><img :src="item.img" alt=""></mt-swipe-item>-->

        <!--</mt-swipe>-->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newsList">
                    <a href="#">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></a></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photoLists"><a href="#">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link
                        to="/home/goodsLists"><a
                        href="#">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></a></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import swiper from '../../components/subcomponents/swiper.vue'
    export default{
        data(){
            return {
                lunbotuList:[],
                msg:1
            };
        },
        created(){
        this.getLunbotu();
        },
        methods:{
            getLunbotu(){
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
                    var result=result.body;
                    if(result.status===0){
                        this.lunbotuList=result.message;
                        console.log(this.lunbotuList)
                    }else {
                       console.log(1)
                    }
                })
            }
        },
        components:{
            "swiper":swiper
        }

    }
</script>
<style lang="scss" scoped>
    /*.mint-swipe{*/
        /*height: 200px;*/
        /*.mint-swipe-item{*/
            /*&:nth-child(1){*/
            /*background-color: red;*/
            /*}*/
            /*&:nth-child(2){*/
            /*background-color: yellow;*/
            /*}*/
            /*&:nth-child(3){*/
            /*background-color: blue;*/
            /*}*/
            /*img{*/
                /*width: 100%;*/
                /*height: 100%;*/
            /*}*/
        /*}*/
    /*}*/
    .mui-content > .mui-table-view:first-child{
        margin-top:0;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #ffffff;
        li{
            border: 0;
        }
        img{
            height: 60px;
            width: 60px;
        }
    }
</style>