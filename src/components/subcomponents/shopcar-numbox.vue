<template>
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount"  @change="countChanged"
               ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js';
    export default{
        data(){
            return {

            }
        },
        mounted(){

            mui(".mui-numbox").numbox();
        },
        methods:{
            countChanged(){
            this.$store.commit('updateCar',{
                id:this.goodsId,
                count:this.$refs.numbox.value
            })
            }
        },
        props:['initCount','goodsId']


    }
</script>
<style lang="scss" scoped>
    .mui-numbox{
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 120px;
        height: 27px;
        padding: 0 40px 0 40px;
        vertical-align: top;
        vertical-align: middle;
        border: solid 1px #bbb;
        border-radius: 3px;
        background-color: #efeff4;
        margin: 0 3px;
    }
</style>