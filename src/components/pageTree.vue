<template>
    <div>
        <span>面选择：</span>
        <select class="form-control info-select" @change="setPageSelect($event.target.value)">
            <option value="1" :selected="pageSelect===1">A面</option>
            <option value="2" v-show="pageNum==='2'" :selected="pageSelect===2">B面</option>
        </select>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
    name: 'PageTree',
    computed:{
        ...mapState("grounding",["pageNum","pageSelect"])
    },
    methods:{
        ...mapActions("grounding",["setPageSelect"])
    }
};
</script>

<style lang="css" scoped>
div{
    text-align:left;
}
.form-control {
    display: inline-block;
    width: 30%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

/* IE浏览器下隐藏下拉按钮 */
select::-ms-expand { display: none; }     

/* 定义隐藏下拉框默认样式及图片覆盖下拉按钮 */   
.info-select{
    width: 30%;
    outline:none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    -ms-appearance:none;
    background: #fff no-repeat scroll right center transparent;           
}
</style>