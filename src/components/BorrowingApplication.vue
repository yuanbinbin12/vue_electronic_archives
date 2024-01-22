<template>
    <div>
        <ul style="margin-block-end:0px">
            <li class="BorrowTableLi" v-for="borrowApplication in borrowApplicationArrShow" :key="borrowApplication.fguid" style="padding-bottom:5px; color: #55565a;cursor: pointer;" @click="openPage(borrowApplication.fguid,borrowApplication.djzt)">
                    <tr style="position: relative; top:3px;">
                        <td style="width: 180px; text-align: left !important;padding-left: 10px;"><a><div style="overflow: hidden;text-overflow:ellipsis; width: 180px">{{ borrowApplication.code }}</div></a></td>
                        <td style="color: #0081CC;">借阅申请</td>
                        <td style="width: 187px; text-align: left !important"><div style="overflow: hidden;text-overflow:ellipsis; width: 187px">{{borrowApplication.purpose}}</div></td>
                        <td>{{borrowApplication.fcreate}}</td>
                        <td>{{borrowApplication.returnTime}}</td>
                    </tr>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'BorrowingApplication',
    computed:{
        ...mapState("firstPage",["borrowApplicationArr"]),
        borrowApplicationArrShow(){
            return this.borrowApplicationArr.slice(0,7)
        }
    },
    methods:{
        openPage(fguid,djzt){
            window.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: '档案借阅',
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'EA_BORROW',
                            OBJ_GUID:fguid,
                            OBJ_DJZT:djzt
                        }
                    }
            )
        }
    },
    filters:{
        timestampToTime(timestamp){
            let timestampFormat = Date.parse(new Date(timestamp).toString());
            timestampFormat = timestampFormat ? timestampFormat : null;
            let date = new Date(timestampFormat);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        }
    }

};
</script>

<style lang="css" scoped>
 ul li::marker{
    content: url('../static/pointLi.png');
    width: 5px;
 }
 a {
    font-weight: 400;
    font-size: 14px;
    text-decoration:none;
    color: #55565a;
    font-family: "Microsoft YaHei";

 }
 .BorrowTableLi>tr>:not(:first-child){
    padding-left: 150px;
 }
 .BorrowTableLi{
    line-height: 35px;
    font-family: "Microsoft YaHei";
    font-weight: 400 !important;
    color: #55565A;
 }
 ul li:not(:last-child){
    border-bottom: 1px solid rgba(61, 58, 58, 0.1)
 }
</style>