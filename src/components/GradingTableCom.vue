<template>
    <div>
        <a-table
            :rowKey="(record,index)=>{return index+record.F_GUID}"
            :columns="columns"
            :data-source="data"
            :expanded-row-keys.sync="expandedRowKeys"
            :scroll="{ y: 'calc(100vh - 120px)' }"
            :ellipsis = "true"
            :pagination="false"
            :customRow="customRow"
        >
            <template slot="antTooltip" slot-scope="text">
                <a-tooltip placement="top" :get-popup-container="getPopupContainer">
                  <template slot="title">
                    <span>{{ text }}</span>
                  </template>
                  <span>{{ text }}</span>
                </a-tooltip>
            </template>
        </a-table>
        <div style="height: 20px;"></div>
        <a-pagination
            show-size-changer
            :default-current="1"
            v-model="current"
            :defaultPageSize="10"
            :total="total"
            @showSizeChange="onShowSizeChange"
            show-quick-jumper
            :show-total="total => `共 ${total} 条数据`"
            :item-render="itemRender"
        />
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import {nanoid} from 'nanoid';
const columns = [
  {
    title: '名称',
    dataIndex: 'F_MC',
    key: 'F_MC',
    width:"30%"
  },
  {
    title: '文件格式',
    dataIndex: 'F_TYPE',
    key: 'F_TYPE',
    width: "15%",
  },
  {
    title: '档案类型',
    dataIndex: 'PARENT_TYPE',
    width: "20%",
    key: 'PARENT_TYPE',
  },
  {
    title: '修改时间',
    dataIndex: 'F_CHDATE',
    width: "20%",
    key: 'F_CHDATE',
  },
  {
    title: '文件大小',
    dataIndex: 'FILE_SIZE',
    width: "15%",
    key: 'FILE_SIZE',
  }
];
export default {
    name: 'GradingTableCom',
    data() {
        return {
            data:[],
            columns:columns.map(element=>{
                return {
                    ...element,
                    ellipsis:true,
                    slots: { title: 'example' },
                    scopedSlots:{customRender:"antTooltip"}
                }
            }),
            expandedRowKeys: [],
            pFILE_SIZESize: 10,
            current: 1,
            total:0,
            grandingQuery:{}
        };
    },
    methods: {
        getDataForServer(grandingQuery,current,pFILE_SIZESize){
          if(current <=0){
            return;
          }
          axios.post("/Accounting/getTree/attach",{...grandingQuery,current,pFILE_SIZESize}).then(
              Response=>{
                if(Response.data.code==="0"){
                    this.data = Response.data.data.data;
                    this.total = Response.data.data.total; 
                } else{
                  this.$message.error( Response.data.message)
                }
              },error=>{
                this.$message.error( error.data.message ||"请求超时请稍后再试！")
              }
            ).catch(error=>{
              console.log(error);
              this.$message.error( error.data ||"请求超时请稍后再试！")
            })
        },
        setGrandingMetaData(axiosParam){
            this.grandingQuery = axiosParam;
            this.current = 1;
            this.getDataForServer(axiosParam,this.current,this.pFILE_SIZESize);
        },
        setGrandingColums(columns){
          this.columns = columns.map(element=>{
            return {
              width:"15%",
              ...element,
              ellipsis:true,
              slots: { title: 'example' },
              scopedSlots:{customRender:"antTooltip"},
              dataIndex:element.key
            }
          })
        },
        getPopupContainer(target){
          return document.body
        },
        customRow(data,index){
          if(index!==0 &&(index-1)%2===0){
            return {
              style:{
                "background-color": "rgba(245,245,245,1)"
              }
            }
          }
        },
        onShowSizeChange(current, pFILE_SIZESize) {
            this.current = current;
            this.pFILE_SIZESize = pFILE_SIZESize;
        },
        itemRender(current, type, originalElement) {
          return originalElement
        }
    },
    watch:{
      grandingTableParam:{
        handler(newVal){
          this.getDataForServer(this.grandingQuery,newVal.current,newVal.pFILE_SIZESize);
        },
        deep:true
      }
    },
    computed:{
      grandingTableParam(){
        return {pFILE_SIZESize:this.pFILE_SIZESize,current:this.current};
      }
    },
    created(){
      // window.setGrandingMetaData = this.setGrandingMetaData;
      // window.setGrandingColums = this.setGrandingColums;
      window.parent.setGrandingMetaData = this.setGrandingMetaData;
      window.parent.setGrandingColums = this.setGrandingColums;
      window.parent.parent.setGrandingMetaData = this.setGrandingMetaData;
      window.parent.parent.setGrandingColums = this.setGrandingColums;
    },
    mounted(){
      window.parent.setGrandingMetaData = this.setGrandingMetaData;
      window.parent.setGrandingColums = this.setGrandingColums;
      window.parent.parent.setGrandingMetaData = this.setGrandingMetaData;
      window.parent.parent.setGrandingColums = this.setGrandingColums;
        this.$nextTick(async()=>{
            $("#app").css({
            "margin-top":"0px"
            });
            $("html").css({
                "overflow": "hidden"
            })
            $("html").css({
                "background":"#f9fafc"
            })
            $(".ant-pagination").css({
              float: "right",
              marginRight:"10px"
            })
            // try{
            // const res = await fetch(`http://localhost:8080/OSPApplication/firstPage/getPolicy`,{method: "POST", headers: {"Content-Type": "application/json",'Accept': 'application/json'}})
            //     const result = await res.json();
            //     console.log(result);
            // }catch(e){
            //     console.log("请求出错",e)
            // }
        })
    },
};
</script>

<style lang="css" scoped>
</style>