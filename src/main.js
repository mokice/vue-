import Vue from 'vue'
import  app from './app.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(VueResource)
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
})

import Vuex from 'vuex'
Vue.use(Vuex)
    var car=JSON.parse(localStorage.getItem('car')||'[]')
var store =new Vuex.Store({
    state:{//用来存储数据的 这个car里面储存的是商品列表的信息。
        car:car
    },
    mutations:{
        goodsToCar(state,goods){
            var flag=false;
            state.car.some(item=>{
                    if (item.id==goods.id){
                        item.number+=parseInt(goods.number);
                        flag=true;
                        return true
                    }

            })
            if (!flag){
                state.car.push(goods);

            }

            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateCar(state,goodsInfo){
            state.car.some(item=>{
                if (item.id==goodsInfo.id){
                    item.number=parseInt(goodsInfo.count);
                    return true;
                }
            })

            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCard(state,id){
            state.car.some((item,i)=>{
                if (item.id==id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateSelect(state,info){
            state.car.some(item=>{
                if (item.id==info.id){
                    item.selected=info.selected;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.number
            })
            return c
        },
        getCarCount(state){
            var o={

            };
            state.car.forEach(item=>{
                o[item.id]=item.number;
            })
            return o;
        },
        getGoodsSelected(state){
            var d={};
            state.car.forEach(item=>{
                d[item.id]=item.selected;
            })
            return d;
        },
        getAllCountAndAllValue(state){
            var a={
                count:0,
                value:0
            };
            state.car.forEach(item=>{
                if (item.selected){
                    a.count+=item.number;
                    a.value+=item.price*item.number;
                }

            })
            return a;
        }


    }
})
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
})

