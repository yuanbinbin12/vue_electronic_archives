<template>
    <div style="padding-top: 0px;">
      <el-button type="primary" @click="getQRCodePictureClick" round>获取二维码</el-button>
        <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
            v-loading="loading" 
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column
            type="selection"
            width="50">
            </el-table-column>
            <el-table-column
            prop="cabinetName"
            label="密集柜"
            width="180">
            </el-table-column>
            <el-table-column
            prop="archiveCenterName"
            label="档案中心"
            width="180">
            </el-table-column>
            <el-table-column
            prop="repositoryName"
            label="库房名">
            </el-table-column>
            <el-table-column
            prop="levelNum"
            label="层数">
            </el-table-column>
            <el-table-column
            prop="faceNum"
            label="面数">
            </el-table-column>
            <el-table-column
            prop="jointNum"
            label="节数">
            </el-table-column>
            <el-table-column
            prop="slotNum"
            label="卡位数">
            </el-table-column>
            <el-table-column
            prop="upRate"
            label="上架百分比">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
export default {
    name: 'CabinetDetails',
    methods: {
      ...mapMutations("QRcode",["setQRCodeIdArr"]),
      ...mapActions("QRcode",["getQRCodePictureArr"]),
      ...mapMutations("warehouseQuery",["clearTableData"]),
        tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'warning-row';
        } else{
            return 'success-row'
        }
      },
      //选中之后的函数
      handleSelectionChange(val) {
        this.setQRCodeIdArr(val);
      },
      getQRCodePictureClick(){
        this.getQRCodePictureArr(this);
      }
    },
    computed:{
      ...mapState("warehouseQuery",["tableData"]),
      ...mapState(["loading"])
    },
    //通过路由规则，离开该组件被调用
    beforeRouteLeave(to,from,next){
        if(to.name!=="ImgPicture"){
          this.clearTableData();
        }
        next();
    },
};
</script>

<style lang="css">
 .el-table .warning-row {
    background: rgb(250, 250, 250);
  }
  .el-button{
    float: right;
    margin: 10px;
  }
  .el-table .success-row {
    background: rgb(255, 255, 255);
  }
  .cell{
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
  }
  .el-table__body td{
    padding: 10px 0 !important;
  }

.el-table {
    --el-table-row-hover-background-color: rgb(31, 117, 204) !important;
}
</style>