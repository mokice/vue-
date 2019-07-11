<template>
    <div class="goods-info">
       <transition @before-enter="beforeEnter"
       @enter="enter"
       @after-enter="afterEnter">
           <div class="ball" v-show="ballFlag" ref="ball"></div>
       </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :lunbotuList="lunBo" :isfull="false"></swiper>
            </div>
    </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner cart">
                    <p class="price">
                        <span>市场价：<del>￥{{goodsInfo.market_price}}</del></span>
                        <span>销售价：<span>￥{{goodsInfo.sell_price}}</span></span>
                    </p>
                    <div class="number">
                        购买数量：<numbox @getcount="getCount" :max="goodsInfo.stock_quantity"></numbox>
                    </div>
                    <mt-button type="primary" size="small" >立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="ballShowToCart" >加入购物车</mt-button>
                </div>
            </div>

        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>

                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(id)">商品评价</mt-button>
            </div>
        </div>
    </div>
</template>
<script>


    import numbox from '../subcomponents/goodsinfo-numbox.vue'
    import swiper from '../subcomponents/swiper.vue'
    export default{
        data(){
           return {
               id:this.$route.params.id,
               lunBo:[],
               goodsInfo:{},
               ballFlag:false,
               selectCount:1
           }
        },

        created(){
            this.getLunBo()
            this.getGoodsinfo()
        },
        methods:{
            getLunBo(){
                this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status===0){
                        result.body.message.forEach(item=>{
                            item.img=item.src
                        })
                        this.lunBo=result.body.message
                    }
                })
            },
            getGoodsinfo(){
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id).then(result=>{
                    if (result.body.status===0){
                        this.goodsInfo=result.body.message[0]
                    }
                })
            },
            getDesc(id){
                this.$router.push({name:"goodsdesc",params:{id}})
            },
            getComment(id){
                this.$router.push({name:"goodscomment",params:{id}})
            },
            ballShowToCart(){
                this.ballFlag=!this.ballFlag

                //创建一个对象，加入购物车
                var goods={
                    id:this.id,
                    price:this.goodsInfo.sell_price,
                    number:this.selectCount,
                    selected:true
                }
            this.$store.commit("goodsToCar",goods);
            },
            beforeEnter(el){
                el.style.transform="translate(0,0)"
            },
            enter(el,done){
                el.offsetWidth
                const ballPosition=this.$refs.ball.getBoundingClientRect()
                const cartPosition=document.getElementById('badge').getBoundingClientRect()
                const x=cartPosition.left-ballPosition.left
                const y=cartPosition.top-ballPosition.top
                el.style.transform='translate('+x+'px,'+y+'px)'
                el.style.transition='1s all cubic-bezier(.4,-0.5,1,.68) '
                done()
            },
            afterEnter(el){
                this.ballFlag=!this.ballFlag
            },
            getCount(count){
            this.selectCount=count
            }
        },
        components:{
            'swiper':swiper,
            'numbox':numbox
        },

    }
</script>
<style lang="scss" scoped>
    .goods-info{
        background-color: #eeeeee;
        .ball{
            width: 15px;
            height: 15px;
            position: absolute;
            top: 370px;
            left: 150px;
            background-color: red;
            border-radius: 50%;
            z-index: 999;
        }
        .cart{
            .price{
                margin: 0;
                span{
                    color: #000;
                    del{
                        color: #8f8f94;

                    }
                    span{
                        color: red;
                       font-weight: 900;
                    }
                }
            }
            .number{
                padding: 5px 0;

            }
        }
        .mui-card-footer{
            display: block;
            button{
                margin-bottom: 10px;
            }
        }
    }
</style>