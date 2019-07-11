<template>
    <div class="cmt-container" >
    <h3>评论列表</h3>
    <hr>
    <textarea name="" id=""  placeholder="请输入评论" maxlength="140" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">评论</mt-button>
        <div class="cmt-lists" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-item">
                <div class="cmt-title">
                    <span>第{{i+1}}楼 用户：{{item.user_name}}</span> <span> 发表时间：{{item.add_time |dateFormat}}</span>
                </div>
                <div class="cmt-body">
                {{item.content===''?'我什么都不想说':item.content}}
                </div>
            </div>

        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                pageIndex:1,
                comments:[],
                msg:''
            }
        },
        created(){
            this.getComments();

        },
        methods:{
            getComments(){
                this.$http.get('http://www.liulongbin.top:3005/api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(
                    result=>{
                        if(result.body.status===0){
                        this.comments=this.comments.concat(result.body.message)
                        }else {
                            alert("获取失败")
                        }
                    }
                )
            },
            getMore(){
                this.pageIndex++;
                this.getComments()
            },
            postComment(){
                if (this.msg.trim().length===0){
                   return alert("你没有输入任何内容")
                }
                this.$http.post('http://www.liulongbin.top:3005/api/postcomment/'+this.$route.params.id,{content:this.msg.trim()})
                    .then(result=>{
                        if(result.body.status===0){
                            var cmt={
                                user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg=''
                        }
                    })
            }
        },
        props:['id']
    }
</script>
<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 20px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin:0;
        }
        .cmt-item{
            .cmt-title{
                font-size: 13px;
                background-color: #8f8f94;
                height: 30px;
                display: flex;
                justify-content: space-between;
                line-height: 30px;
            }
            .cmt-body{
                font-size: 15px;
                height: 30px;
                line-height: 30px;
            }
        }

    }
</style>