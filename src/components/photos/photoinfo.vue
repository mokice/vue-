<template>
    <div class="photo-info">
        <h3>{{info.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{info.add_time | dateFormat}}</span>
            <span>点击次数：{{info.click}}次</span>
        </p>
        <hr>
        <div class="thumbs">
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>
        <div class="content" v-html="info.content"></div>
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>

    import comment from '../../components/subcomponents/comment.vue'
    export default{
        data(){
            return {
                id:this.$route.params.id,
                info:{},
                list:[]
            }
        },
        created(){
           this.getPhotoInfo()
            this.getThumbs()
        },
        methods:{
            getPhotoInfo(){
                this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.info=result.body.message[0]
                    }else {
                        alert("上传失败")
                    }
                })
            },
            getThumbs(){
                    this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result=>{
                        if (result.body.status===0){
                            result.body.message.forEach(item=>{
                                item.w=600;
                                item.h=400;
                                item.msrc=item.src;
                            })
                            this.list=result.body.message
                        }else {
                            alert("上传失败")
                        }
                    })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{
            'cmt-box':comment
        }
    }
</script>
<style lang="scss" scoped>
    .photo-info{
        padding: 0 5px;
        h3{
            font-size: 14px;
            text-align: center;
            padding: 10px;
            color: #26a2ff;
        }
       /deep/ .content{
           text-indent: 2em;
            font-size: 13px;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
        }
        .thumbs{
         /deep/ .my-gallery{
              display: flex;
              flex-wrap:wrap;
              figure{
                  width: 30%;
                  margin: 5px;
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;
                      border-radius: 5px;
                  }
              }
          }
        }
    }
</style>