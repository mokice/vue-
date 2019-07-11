<template>
    <div class="goods-lists">
        <router-link :to="'/home/goodsInfo/'+item.id" class="goods-item" v-for="item in list" :key="item.id">
            <img :src="item.img_url" alt="">
            <h3>{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span>￥{{item.sell_price}}</span>
                    <span>￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data(){
        return{
            list:[],
            pageIndex:1
        }
        },
        created(){
            this. getGoodsList()
        },
        methods:{
            getGoodsList(){
                this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageIndex).then(result=>{
                    if(result.body.status===0){
                        this.list=this.list.concat(result.body.message)
                    }else {
                        alert("上传失败")
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getGoodsList();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .goods-lists{
        padding: 6px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #ffffff;
        .goods-item{
            border: 1px solid #cccccc;
            width: 49.3%;
            box-shadow: 0 0 6px #9999;
            margin: 3px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height:293px;
            padding: 2px;
            h3{
                font-size: 15px;
            }
            img{
                width: 100%;
            }
            .info{
                padding: 3px;
                background-color: #eeeeee;
                .price{
                    font-size: 12px;
                    margin: 0;
                    padding: 5px 0 2px;
                    span:nth-child(1){
                        color: red;
                        font-weight: 900;
                    }
                    span:nth-child(2){
                        text-decoration: line-through;
                    }
                }
                .sell{
                    padding: 2px 0;
                    font-size: 12px;
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>