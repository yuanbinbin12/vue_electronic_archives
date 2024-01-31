<template>
    <div id="firstPage"
    v-loading="loadingDownload" element-loading-text="拼命下载档案政策中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            style="background-color: #f9fafc;"
    >
        <el-row :gutter="8">
            <el-col :span="4" class="userMessage">
                <div class="grid-content bg-purple" style="height: 230px; margin-left: 10px;" >
                    <UserMessage/>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple" style="height: 230px;">
                    <DueVoucherList/>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="4">
                <div class="grid-content bg-purple" style="height: 271px;">
                    <div style="text-align: left !important;  border-bottom: 1px solid #EBEBEB;">
                        <span class="borrowTotalSpan">
                            <img width="4px" height="18px" :src="require('@/static/titleLine.png')" style="position: relative;top: 3px; margin-right: 3px;"/>
                            我的借阅统计
                        </span>
                    </div>
                    <div>
                        <BorrowTotal/>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple" style="height: 371px">
                    <div style="text-align: left !important;  border-bottom: 1px solid #EBEBEB;">
                        <span class="borrowTotalSpan">
                            <img width="4px" height="18px" :src="require('@/static/titleLine.png')" style="position: relative;top: 3px; margin-right: 3px;"/>
                            我的借阅申请
                        </span>
                    </div>
                    <div>
                        <BorrowingApplication/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="4">
                <div class="" style="height: 309px;position: relative;">
                    <div class="grid-content bg-purple" style="height: 409px;width: 100%;position: absolute;top: -100px;">
                        <div style="text-align: left !important;  border-bottom: 1px solid #EBEBEB;position: relative;">
                        <span class="borrowTotalSpan">
                            <img width="4px" height="18px" :src="require('@/static/titleLine.png')" style="position: relative;top: 3px; margin-right: 3px;"/>
                            常用功能
                        </span>
                        <img src="../static/install.png" style="position: absolute; right: 10px; top: 10px;cursor: pointer; " @click="openComponse"/>
                    </div>
                    <div>
                        <OftenFun/>
                    </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple" style="height: 309px">
                    <div style="text-align: left !important;  border-bottom: 1px solid #EBEBEB;">
                        <span class="borrowTotalSpan">
                            <img width="4px" height="18px" :src="require('@/static/titleLine.png')" style="position: relative;top: 3px; margin-right: 3px;"/>
                            档案政策
                        </span>
                        <div class="btn4" @click="openPolicys"><span style=" font-size: 12px;">更多</span></div>
                    </div>
                    <div>
                        <ArchivesPolicy/>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple" style="height: 309px;">
                    <div style="text-align: left !important;  border-bottom: 1px solid #EBEBEB;">
                        <span class="borrowTotalSpan">
                            <img width="4px" height="18px" :src="require('@/static/titleLine.png')" style="position: relative;top: 3px; margin-right: 3px;"/>
                            通知公告
                        </span>
                        <div class="btn4" @click="openDetails"><span style=" font-size: 12px;">更多</span></div>
                    </div>
                    <div style="margin-top: 10px;">
                        <InformationList/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <UpLoadHeadPicture v-show="fileUpdateLoadPageShow"/>
        <WarningAlter :warningMsg = "warningMsg" :typeMsg="typeMsg" :isShowPage="'0'"/>
    </div>
</template>

<script>
import $ from 'jquery';
import {mapActions,mapMutations,mapState} from "vuex";
import UserMessage from '@/components/UserMessage.vue';
import DueVoucherList from '@/components/DueVoucherList.vue';
import BorrowTotal from '@/components/BorrowTotal.vue';
import BorrowingApplication from "@/components/BorrowingApplication.vue";
import ArchivesPolicy from "@/components/ArchivesPolicy.vue";
import InformationList from "@/components/InformationList.vue";
import UpLoadHeadPicture from '@/components/UpLoadHeadPicture.vue';
import WarningAlter from '@/components/WarningAlter.vue';
import OftenFun from '@/components/OftenFun.vue';
export default {
    name: 'FirstPage',
    components:{
        UserMessage,DueVoucherList,BorrowTotal,BorrowingApplication,ArchivesPolicy,InformationList,UpLoadHeadPicture,WarningAlter,OftenFun
    },
    methods:{
        ...mapActions("firstPage",["getBorrowVoucher","getInformation","getPolicyList","getsetOftenList"]),
        ...mapMutations("firstPage",["setIsLoadingFristPage"]),
        openDetails(){
            window.parent.openReactComp({
                id:"12345",
                caption: '通知公告',
                serverID: 'ARCHIVE', // 不需要可不传
                config: {
                            displayType: 'OpenTab',
                            formType: 'ReactComp',
                            reactCompType: 'infoalllist',
                            "F_TYPE":"Notice",
                            "infoReactCompType":"infodetails",
                            sysID:"ARCHIVE"
                        }
            })
        },
        openPolicys(){
            window.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: '档案政策',
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'EA_POLICY_QUERY'
                        }
                    }
            )
        },
        openComponse(){
            window.parent.openReactForm(    
                    {
                        id: this.boxKey,
                        caption: '常用功能',
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenWindow', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'HOMEPAGE_CommonFunctions',
                            windowWidth:"720px",
                            windowHeight:"600px",
                        }
                    }
            )
        },
        setScale () {
      let ratio = 0
      const screen = window.screen
      const ua = navigator.userAgent.toLowerCase()
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
        if (~ua.indexOf('firefox')) {
          document.body.style.MozTransform = 'scale(' + ((100 / ratio) * 100) / 100 + ')'
          document.body.style.MozTransformOrigin = '0 0'
          document.body.style.right = (100 - ratio) + '%'
          document.body.style.bottom = (100 - ratio) + '%'
        } else {
          document.body.style.zoom = Math.floor((100 / ratio) * 100) / 100
        }
      }
    }
    },
    watch:{
        isLoadingFristPage(newVal,oldVal){
            this.getBorrowVoucher();
            this.getInformation();
            this.getPolicyList();
            this.getsetOftenList();
        },
    },
    mounted(){
        this.$nextTick(()=>{
            $("#app").css({
                "margin-top":"0px"
            });
            $("html").css({
                "overflow-x": "hidden"
            })
            $("html").css({
                "background":"#f9fafc"
            })
        })
        let that = this
        window.addEventListener('resize', function () {
        that.setScale()
        })
    },
    beforeDestroy(){
        $("html").css({
                "background":"rgba(0,0,0,0)"
            })
    },
    created(){
        this.getBorrowVoucher();
        this.getInformation();
        this.getPolicyList();
        this.setScale();
        this.getsetOftenList();
    },
    computed:{
        ...mapState("firstPage",["fileUpdateLoadPageShow","loadingDownload","isLoadingFristPage"]),
        ...mapState("grounding",["warningMsg","typeMsg","showConfirmDialog"]),
    }
};
</script>

<style lang="css" scoped>
.userMessage{
border-radius: 3px;
}
.borrowTotalSpan{
    font-family: "MicrosoftYaHei-Bold ";
    padding: 0px 0px 0px 20px;
    line-height: 40px;
    font-weight: 600;
    font-size: 18px;
    text-align: left;
    color: #434a4f;
}
/* #firstPage{
    
} */
.btn4 {
    float:right;
    margin-top: 8px;
    display: inline;
    border-radius: 20px;
    background-color: rgb(220, 242, 250);
    border: none;
    color: #504d4d;
    text-align: center;
    font-size: 20px;
    width: 80px;
    height: 20px;
    line-height: 20px;
    transition: all 0.5s;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    left: -20px;
}
 
.btn4 span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    line-height: 20px;
    text-align: center;
    
    transition: 0.5s;
    top: -2px;
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