<template>
    <div>
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll" >
                    <a :class="['mui-control-item', item.id===0?'mui-active':'']" href="#item1mobile"
                       data-wid="tab-top-subpage-1.html"
                       v-for="item in cates" :key="item.id" @click="getPhotoListsByCateId(item.id)">
                       {{item.title}}
                    </a>

                </div>
            </div>

        </div>

        <ul class="post-list">
            <router-link v-for="item in lists" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url" >
                <div class="info">
                    <h4 class="info-title">{{item.title}}</h4>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js';
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    export default{
        data(){
            return {
                cates:[],
                lists:[]
            }
        },
        created(){
            this.getAllCategory()
            this.getPhotoListsByCateId(0)
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllCategory(){
                this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result=>{
                    if (result.body.status===0){
                        result.body.message.unshift({title:'全部',id:0});
                        this.cates=result.body.message
                    }else {
                        alert("获取失败")
                    }
                })
            },
            getPhotoListsByCateId(cateId){
                this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+cateId).then(result=>{
                    if(result.body.status===0){
                        this.lists=result.body.message
                        console.log(this.lists)
                    }else {
                        alert("获取失败")
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    * { touch-action: pan-y; }
    .post-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0px;
        li{
            margin-bottom: 10px;
            background-color: #cccccc;
            text-align: center;
            box-shadow: 0 0 6px #999;
            border-radius: 10px;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
                border-radius: 10px;
            }
            img[lazy=loading]{
                width: 40px;
                height: 300px;
                margin: auto;

            }
            .info{
                position: absolute;
                bottom: 0;
                text-align: left;
                color: #ffffff;
                background-color: rgba(0,0,0,0.4);
                max-height: 85px;
                .info-title{
                    font-size: 13px;
                }
                .info-body{
                    font-size: 12px;
                }
            }
        }

    }

</style>