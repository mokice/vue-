<template>
   <div>
       <div class="desc-info">{{info.title}}</div>
       <hr>
       <div class="content" v-html="info.content"></div>
   </div>
</template>
<script>
    export default{
        data(){
            return{
                info:{},
                id:this.$route.params.id

            }
        },
        created(){
            this.getDesc()
        },
        methods:{
        getDesc(){
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.id).then(result=>{
                if (result.body.status===0){
                    this.info=result.body.message[0]
                }
            })
        }
        }
    }
</script>
<style lang="scss" scoped></style>
