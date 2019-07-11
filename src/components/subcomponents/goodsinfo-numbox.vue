<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1"  @change="countChanged"
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
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
                mui(".mui-numbox").numbox().setOption('max',this.max)
            }
        },
        props:["max"],

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
    }
</style>