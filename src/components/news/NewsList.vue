<template>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
            <router-link href="javascript:;" :to="'/home/newsList/'+item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h1>{{item.title}}</h1>
                    <p class='mui-ellipsis'>
                        <span>发表时间：{{item.add_time | dateFormat}}</span>
                        <span class="right">点击{{item.click}}次</span>
                    </p>
                </div>
            </router-link>
        </li>

    </ul>
</template>
<script>
    export default{
        data(){
            return{
                newsList:[]
            };
        },
        created(){
            this.getNewList();
        },
        methods:{
            getNewList(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(result=>{
                    if(result.body.status===0){
                        this.newsList=result.body.message;
                    }else {
                        alert("获取失败")
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mui-table-view li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis {
            font-size: 12px;
            color: #0062cc;
            display: flex;
            justify-content: space-between;
        }
    }
</style>