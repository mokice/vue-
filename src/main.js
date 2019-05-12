import Vue from 'vue'
import  app from './app.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
Vue.use(MintUI)

var vm=new Vue({
    el:'#app',
    render:c=>c(app)
})

