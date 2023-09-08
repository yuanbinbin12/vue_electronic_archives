<template>
    <div id="firstPage"
    v-loading="loadingDownload" element-loading-text="拼命下载档案政策中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            v-loading.fullscreen="fullscreenLoading"
    >
        <el-row :gutter="8">
            <el-col :span="4" class="userMessage">
                <div class="grid-content bg-purple" style="height: 310px;">
                    <UserMessage/>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple" style="height: 310px;">
                    <DueVoucherList/>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="4">
                <div class="grid-content bg-purple" style="height: 301px;">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">我的借阅统计</span>
                    </div>
                    <hr>
                    <div>
                        <BorrowTotal/>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple" style="height: 301px">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">我的借阅申请</span>
                    </div>
                    <hr>
                    <div>
                        <BorrowingApplication/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="12">
                <div class="grid-content bg-purple" style="height: 329px">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">档案政策</span>
                    </div>
                    <hr>
                    <div>
                        <ArchivesPolicy/>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple" style="height: 329px;">
                    <div style="text-align: left !important;">
                        <span class="borrowTotalSpan">通知公告</span>
                        <div class="btn4" @click="openDetails"><span style=" font-size: 0.1em;">更多</span></div>
                    </div>
                    <hr>
                    <div>
                        <InformationList/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <UpLoadHeadPicture v-if="fileUpdateLoadPageShow"/>
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
export default {
    name: 'FirstPage',
    components:{
        UserMessage,DueVoucherList,BorrowTotal,BorrowingApplication,ArchivesPolicy,InformationList,UpLoadHeadPicture,WarningAlter
    },
    methods:{
        ...mapActions("firstPage",["getBorrowVoucher","getInformation","getPolicyList"]),
        ...mapMutations("firstPage",["setIsLoadingFristPage"]),
        openDetails(){
            window.parent.parent.openReactComp({
                id:"12345",
                caption: '通知公告',
                config: {
                            displayType: 'OpenTab',
                            formType: 'ReactComp',
                            reactCompType: 'infoalllist',
                            "F_TYPE":"Notice",
                            "infoReactCompType":"infodetails"
                        }
            })
        }
    },
    watch:{
        isLoadingFristPage(newVal,oldVal){
            this.getBorrowVoucher();
            this.getInformation();
            this.getPolicyList();
        }
    },
    mounted(){
        this.$nextTick(()=>{
            $("#app").css({
                "margin-top":"0px"
            });
            $("html").css({
                "overflow": "hidden"
            })
        })
    },
    created(){
        this.getBorrowVoucher();
        this.getInformation();
        this.getPolicyList();
    },
    computed:{
        ...mapState("firstPage",["fileUpdateLoadPageShow","loadingDownload","isLoadingFristPage"]),
        ...mapState("grounding",["warningMsg","typeMsg"]),
    }
};
</script>

<style lang="css" scoped>
.userMessage{
border-radius: 3px;
background: #fff !important;
}
.borrowTotalSpan{
    font-family: "MicrosoftYaHei-Bold ";
    font-weight: 600;
    font-size: 18px;
    line-height: 34px;
    color: #2b3136;
}
/* #firstPage{
    
} */
.btn4 {
    float:right;
    margin-top: 5px;
    display: inline;
    border-radius: 20px;
    background-color: rgb(220, 242, 250);
    border: none;
    color: #504d4d;
    text-align: center;
    font-size: 20px;
    width: 80px;
    height: 20px;
    line-height: 18px;
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