<template>
    <div class="newsInfo-container">
        <h3 class="title">{{ newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsInfo.click}}次</span>
        </p>

        <hr>
        <div class="content" v-html="newsInfo.content"></div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>


    import comment from "../subcomponents/comment.vue"
    export default{
        data(){
            return {
                id:this.$route.params.id,
                newsInfo:{}
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result =>{
                    if(result.body.status==0){
                        this.newsInfo=result.body.message[0]
                        console.log(this.newsInfo)
                    }else {
                        alert('获取失败！')
                    }
                })
            }
        },
        components:{
            "comment-box":comment
        }
    }
</script>
<style lang="scss" scoped>
    .newsInfo-container{
        padding:0 4px;
        .title{
            font-size: 16px;
           text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{

        }
    }
</style>