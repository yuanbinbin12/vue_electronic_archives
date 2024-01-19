<template>
    <div style="margin-left: 20px;">
        <div style="position: relative; top: -10px;">
            <div class="block"><el-avatar :size="60" :src="require('@/static/borrowVoucher.png')"></el-avatar><span class="borowSpan">借阅次数</span><span class="borrowTotalSum" style="color: #0081cc;">{{ borrowVoucherTotal }}</span></div>
        </div>
        <div style="position: relative; top: -10px;">
            <div class="block"><el-avatar :size="60" :src="require('@/static/borrowBoxing.png')"></el-avatar><span class="borowSpan">借阅份数</span><span class="borrowTotalSum" style="color: #2bb884;">{{ borrowComponentTotal }}</span></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'BorrowTotal',
    computed:{
        ...mapState("firstPage",["borrowVoucherTotal","borrowComponentTotal"])
    }
};
</script>

<style lang="css" scoped>
    .block{
        text-align: left !important;
        margin-top: 42px;
        margin-left: 10px;
    }
    .borowSpan{
        position: absolute;
        top:0px;
        left: 85px;
        font-family: "MicrosoftYaHei ";
        font-weight: 400;
        font-size: 14px;
        color:#545758;
    }
    .borrowTotalSum{
        font-family: "MicrosoftYaHei-Bold ";
        font-weight: 600;
        font-size: 26px;
        line-height: 45.5px;
        text-align: left;
        position: absolute;
        top:18px;
        left: 85px;
        width: 45px;
        text-align: center;
    }
    .el-avatar{
        background-color: #f9fafc;
    }
</style>