<template>
    <div style="display: inline-block;margin-left: 33px; cursor: pointer; color: #6e6c6c; text-align: center;width: 17.5%; " @click="openPage()" ref="carders">
        <div :id="'dueFile'+indexSum" :style="dueFileStyle">
            <div class="fCode">{{ ''+dueVoucher.infoCode }}</div>
            <div style="height:68px ; text-align: left !important; margin-left: 18px;overflow-y: hidden;overflow: hidden;text-overflow:ellipsis;">
                <p v-show="dueVoucher.borrowNote.trim()!==''" style="white-space:initial;margin-top: 3px;" class="borrowNote">
                    借阅用途：{{ dueVoucher.borrowNote }}
                </p>
                <!-- <ul style="margin: 0;">
                    <li v-for="detailName,index in detailNameArr" :key="index">{{ detailName }}</li>
                    <li v-show="dueVoucher && dueVoucher.detailName && dueVoucher.detailName.length>4">......</li>
                </ul> -->
            </div>
            <div class = "returnDay">{{ returnDayStr }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DueVoucher',
    props:["dueVoucher","indexSum"],
    computed:{
        dueFileStyle(){
            return{clear:"both",width: '100%',height: '150px',display: 'inline-block' ,'backgroundSize':'100% 100%','backgroundRepeat':'no-repeat','backgroundImage':'url(' + require(`@/static/${this.indexSum+1}${this.dueVoucher.dueDay>=0?"":"-1"}.png`) + ')',"position":"relative"}
        },
        // detailNameArr(){
        //     if(this.dueVoucher&& this.dueVoucher.detailName && this.dueVoucher.detailName.length>4){
        //         return this.dueVoucher.detailName.slice(0,4)
        //     } else{
        //         return this.dueVoucher.detailName;
        //     }
            
        // },
        returnDayStr(){
            if(this.dueVoucher.dueDay>=0){
                return `剩余${this.dueVoucher.dueDay}天`;
            }
            else{
                return `逾期${Math.abs(this.dueVoucher.dueDay)}天`;
            }
        },
        mounted() {
            
        },
    },
    methods:{
        openPage(){
            window.parent.openReactForm(
                    {
                        id: this.boxKey,
                        caption: '档案借阅',
                        serverID: 'ARCHIVE', // 不需要可不传
                        config: {
                            displayType: 'OpenTab', // 打开方式，默认为 OpenTab:应用新tab页; DrawerForm: 抽屉； BrowserTab：浏览器tab页； OpenWindow：弹窗
                            forms: 'EA_BORROW',
                            OBJ_GUID:this.dueVoucher.infoFGuid,
                            OBJ_DJZT:this.dueVoucher.djzt
                        }
                    }
            )
        }
    }
};
</script>

<style lang="css" scoped>
.returnDay{
    font-family: "Microsoft YaHei";
    font-weight: 400;
    font-size: 13px;
    line-height: 24.5px;
    position: absolute;
    bottom: 2%;
    right: 5%;
    color: #fff;
}
.fCode{
    text-align: left !important;
    padding:30px 10px 0px 0px;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    overflow: hidden;
    text-overflow:ellipsis;
    margin: 15px 0px 8px 18px;
    color: #2C4D6C;
    font-family: "Microsoft YaHei";

}
.borrowNote{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    /* 显示多少行 */
    overflow: hidden;
    font-size: 14px;
    font-weight: 400;
    font-family: "Microsoft YaHei";
}
</style>