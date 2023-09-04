<template>
    <div v-show="fileUpdateLoadPageShow" class="Masking-layer" 
            v-loading="loadingUpload" element-loading-text="拼命上传中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
        <div v-show="fileUpdateLoadPageShow" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);">
            <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="picturePreview"
            :auto-upload="false"
            >
            <img v-show="fileUpdateLoadPageShow" :src="ImageUrl" width="150" height="150" class="avatar"/>
            </el-upload>
            <div>
                <el-button
                type="warning"
                class="cancelBtn"
                @click="cancelUpload"
                >取消上传</el-button>
                <el-button
                type="primary"
                class="cancelBtn"
                @click="headPictureUpLoad"
                >确认上传</el-button>
            </div>
        </div>
        <div v-if="isShowAlter" style="width: 800px; height: 40px; font-size: 14px; position: absolute; left: 50%;transform: translate(-50%,0%); ">
            <el-alert
                @close="setTilte('')"
                :title="title"
                type="error"
                >
            </el-alert>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex';
export default {
    name: 'UpLoadHeadPicture',
    data() {
        return {
            ImageUrl:"#",
            file:"",
            title:"",
            isShowAlter:false
        };
    },
    computed:{
        ...mapState("firstPage",["userHeaderCircleBlob","userHeaderCircleUrl","fileUpdateLoadPageShow","loadingUpload"]),
    },
    mounted() {
        if(this.userHeaderCircleBlob===""){
            this.ImageUrl = this.userHeaderCircleUrl;
        }else{
            if(window.createObjectURL != undefined){
                this.ImageUrl = window.createObjectURL(this.userHeaderCircleBlob);
            } else if(window.URL != undefined){
                this.ImageUrl = window.URL.createObjectURL(this.userHeaderCircleBlob);
            } else if(window.webkitURL != undefined){
                this.ImageUrl = window.webkitURL.createObjectURL(this.userHeaderCircleBlob);
            }
        }
    },
    methods: {
        ...mapMutations("firstPage",["setFileUpdateLoadPageShow"]),
        ...mapActions("firstPage",["uploadHeadPic"]),
        picturePreview(file,fileList){
            if(window.createObjectURL != undefined){
                this.ImageUrl = window.createObjectURL(file.raw);
            } else if(window.URL != undefined){
                this.ImageUrl = window.URL.createObjectURL(file.raw);
            } else if(window.webkitURL != undefined){
                this.ImageUrl = window.webkitURL.createObjectURL(file.raw);
            }
            this.file = file.raw;
        },
        cancelUpload(){
            this.setFileUpdateLoadPageShow(false);
        },
        async headPictureUpLoad(){
            if(this.file===""){
                this.title = "请确认上传完成后再点击确认上传！";
                this.isShowAlter = true;
                return;
            }
            await this.uploadHeadPic({file:this.file,vc:this});
            if(!this.isShowAlter){
                this.setFileUpdateLoadPageShow(false);
            }
        },
        setTilte(title){
            this.title = title;
            this.isShowAlter = false;
        },
    },
};
</script>

<style lang="css">
.Masking-layer{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.el-alert__title{
    font-size: 16px !important;
    position: relative;
    top: -15px;
    text-align: center;
}
</style>