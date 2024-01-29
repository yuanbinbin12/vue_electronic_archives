<template>
    <div>
        <div style="width: 100%;height: 42px; border-bottom: 1px solid #EBEBEB;">
            <div class="dueSum" style="float: left;">
                <img width="4px" height="18px" :src="require('@/static/titleLine.png')" style="position: relative;top: 3px; margin-right: 3px;"/>
                即将到期档案
                <span style="color: #fe4848;">
                {{ dueVoucherSum }}&nbsp;</span>份
            </div>
            <div style="position: absolute; right: 0px; display: flex; flex-direction: row;">
                <div style="width: 10px; height: 10px; position: relative; top: 11px; right: 20px; cursor: pointer;" @click="refreshPageDate">
                    <img src="../static/refresh.png"/>
                </div>
                <div style="background-color: #fff; margin-right: 20px; cursor: pointer;margin-top: 10px;">
                    <div class="btn4" @click="openHandle"><span style=" font-size: 12px;">我的待办</span></div>
                </div>
            </div>
        </div>
        <div style="width: 100%;margin-top: 14px;position: relative; left: -11.5px; margin-right: 33px;">
            <div style="margin: 0 auto; white-space: nowrap;" :style="dueFileListStyle">
                <DueVoucher v-for="(DueVoucher,index) in dueVoucherList" :indexSum="index" :key="index" :dueVoucher="DueVoucher"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DueVoucher from './DueVoucher.vue';
export default {
    name: 'DueVoucherList',
    computed:{
        ...mapState("firstPage",["dueVoucherList","dueVoucherSum","isLoadingFristPage"]),
        dueFileListStyle(){
            if(this.dueVoucherSum>=5){
                return {
                    textAlign:"center",
                }
            }else{
                return {
                    textAlign:"left",
                }     
            }
        }
    },
    components:{
        DueVoucher
    },
    methods:{
        openHandle(){
            window.parent.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: '我的待办',
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'sys_homepage_show',
                            DefaultManageFormID:"PICTURE_HOMEPAGE"
                        }
                    }
            )
        },
        refreshPageDate(){
            this.isLoadingFristPage.push("true");
        }
    }
};
</script>

<style lang="css" scoped>
.dueSum{
    padding: 0px 0px 0px 20px;
    font-family: "MicrosoftYaHei-Bold ";
    font-weight: 600;
    font-size: 18px;
    line-height: 40px;
    text-align: left;
    color: #434a4f;
}
.btn4 {
  display: inline-block;
  border-radius: 20px;
  background-color: rgb(220, 242, 250);
  border: none;
  color: #504d4d;
  text-align: center;
  font-size: 20px;
  width: 100px;
  height: 20px;
  line-height: 18px;
  transition: all 0.5s;
  cursor: pointer;
  vertical-align: middle;
}
 
.btn4 span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  top:-2px;
}
 
.btn4 span::after {
  content: ">>";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
 
.btn4:hover span {
  padding-right: 30px;
}
 
.btn4:hover span::after {
  opacity: 1;
  right: 0;
}
</style>