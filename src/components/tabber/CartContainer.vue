<template>
    <div class="shopCar" >
        <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                    @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <div class="head">{{item.title}}</div>
                        <div class="body">
                            <span class="price">￥{{item.sell_price}}</span>
                            <number :initCount="$store.getters.getCarCount[item.id]" :goodsId="item.id"></number>
                            <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner calculate">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品<span>{{$store.getters.getAllCountAndAllValue.count}}</span>件，总价￥<span>{{
                            $store.getters.getAllCountAndAllValue.value}}</span></p>
                    </div>
                    <div class="right">
                        <mt-button type="danger" class="button">去结算</mt-button>
                    </div>
                </div>
            </div>

        </div>
        <p>{{$store.getters.getGoodsSelected}}</p>

    </div>
</template>
<script>
    import number from '../subcomponents/shopcar-numbox.vue'
    export default{
        data(){
            return {
                goodslist:[]
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                var idArr=[];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id)
                })
                if (idArr.length <=0){
                    return;
                }

                this.$http.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/"+idArr.join(","))
                    .then(result=>{
                        if (result.body.status===0){
                            this.goodslist=result.body.message;
                            console.log(this.goodslist)
                        }
                    })

                console.log(idArr)
            },
            remove(id,index){
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCard',id)
            },
            selectedChange(id,val){
            this.$store.commit('updateSelect',{id:id,selected:val})
            }
        },
        components:{
            number
        }
    }
</script>
<style lang="scss" scoped>



        .shopCar{
            background-color: #eeeeee;
            overflow: hidden;
            .mui-card-content-inner{
                display: flex;
                align-items: center;

                img{
                    width: 60px;
                    height: 60px;
                    margin: 0 5px;

                }
                .info{
                    font-size: 13px;
                    .head{
                        font-weight: 700;

                    }
                    .body{
                        display: flex;
                        line-height: 27px;

                        .price{
                            color: red;
                        }
                    }
                }
            }
            .calculate{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    p{
                        font-size: 15px;
                        margin: 3px 0;
                        span{
                            color: red;
                            font-weight: bold;

                        }
                    }
                }
                .right{
                    .button{
                        width: 100px;
                    }
                }
            }
        }



</style>