import VueRouter from 'vue-router'
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import CartContainer from './components/tabber/CartContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'
import NewsListContainer from  './components/news/NewsList.vue'
import NewsInfoContainer from './components/news/NewsInfo.vue'
import PhotoLists from  './components/photos/photolists.vue'
import PhotoInfo from  './components/photos/photoinfo.vue'
import GoodsLists from  './components/goods/goodslist.vue'
import GoodsInfo from  './components/goods/goodinfo.vue'
import GoodsDesc from  './components/goods/goodsdesc.vue'
import GoodsCommnet from  './components/goods/goodscomment.vue'
var router=new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer },
        {path:'/member',component:MemberContainer },
        {path:'/cart',component:CartContainer },
        {path:'/search',component:SearchContainer },
        {path:'/home/newsList',component:NewsListContainer },
        {path:'/home/newsList/:id',component:NewsInfoContainer },
        {path:'/home/photoLists',component:PhotoLists },
        {path:'/home/photoInfo/:id',component:PhotoInfo },
        {path:'/home/goodsLists',component:GoodsLists },
        {path:'/home/goodsInfo/:id',component:GoodsInfo },
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc' },
        {path:'/home/goodscomment/:id',component:GoodsCommnet,name:'goodscomment' },



    ],
    linkActiveClass:'mui-active'
})

export default router;