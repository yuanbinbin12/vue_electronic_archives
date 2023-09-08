<template>
    <div>
        <ul>
            <li v-for="borrowApplication in borrowApplicationArr" :key="borrowApplication.fGuid" style="padding-bottom:5px; color: #55565a; border-bottom: 1px solid rgba(61, 58, 58, 0.1);cursor: pointer;" @click="openPage(borrowApplication.fguid,borrowApplication.djzt)">
                    <tr style="position: relative; top:3px;">
                        <td style="width: 167px; text-align: left !important;padding-left: 31px;"><a><div style="overflow: hidden;text-overflow:ellipsis; width: 167px">{{ borrowApplication.code }}</div></a></td>
                        <td style="padding-left: 417px;">借阅申请</td>
                        <td style="padding-left: 417px;">{{ borrowApplication.fcreate[0]+'-'+(borrowApplication.fcreate[1]>10?borrowApplication.fcreate[1]:'0'+borrowApplication.fcreate[1])+'-'+(borrowApplication.fcreate[2]>=10?borrowApplication.fcreate[2]:'0'+borrowApplication.fcreate[2]) }}</td>
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
        ...mapState("firstPage",["borrowApplicationArr"])
    },
    methods:{
        openPage(fGuid,djzt){
            window.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: '档案借阅',
                        serverID: 'serverID', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'EA_BORROW',
                            OBJ_GUID:fGuid,
                            OBJ_DJZT:djzt
                        }
                    }
            )
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
    text-decoration:none;
      color:#999999;
      font-weight:bold;
 }
</style>