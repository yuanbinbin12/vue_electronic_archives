<template>
    <div>
        <ul>
            <li v-for="oftenElement in oftenList" :key="oftenElement.forms" @click="openPage(oftenElement.caption,oftenElement.forms)">
                <span>{{ oftenElement.caption }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {nanoid} from "nanoid";
export default {
    name: 'OftenFun',

    data() {
        return {
            oftenList:[
                {caption:"电子会计凭证收集",forms:"EA_ACC_VOUCHER"},
                {caption:"手工组件",forms:"EA_MANUAL_COMPONENT"},
                {caption:"预归档库",forms:"EA_POOL_PREPROD_ARCHIVE"},
                {caption:"档案组卷",forms:"EA_VOLUME_LIST"},
                {caption:"档案装盒",forms:"EA_BOXING_LIST"},
                {caption:"档案上架",forms:"EA_BOXING_CHICE"},
                {caption:"档案借阅",forms:"EA_BORROW_LIST"},
                {caption:"档案归还",forms:"EA_RETURN_LIST"},
                {caption:"档案查询",forms:"EA_POOL_ARCHIVED"},
            ]
        };
    },
    methods: {
        openPage(caption,forms){
            window.parent.openReactForm(
                    {
                        id: nanoid(),
                        caption,
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms
                        }
                    }
            )
        }
    },
};
</script>

<style lang="css" scoped>
 ul li::marker{
    content: url('../static/pointLi.png');
    width: 2px;
    
 }
 ul li{
    position: relative;
    left: -10px;
    line-height: 35px;
    cursor: pointer;
    text-align: left;
    padding-inline-start:20px;
 }
 ul li span{
    position: relative;
    top: 3px;
    font-family: "MicrosoftYaHei ";
    font-weight: 400;
    font-size: 14px;
    color: #3f4553;
 }
</style>