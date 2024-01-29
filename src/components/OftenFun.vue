<template>
    <div>
        <ul>
            <li v-for="oftenElement in oftenList" :key="oftenElement.fPkey" @click="openPage(oftenElement)">
                <span>{{ oftenElement.fcdname }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: 'OftenFun',
    computed:{
        ...mapState("firstPage",["oftenList"])
    },
    methods: {
        openPage(rowSetData){
            let param = {};
            let vtreeAtte = rowSetData["vtreeAtte"] || "";
            let formID = rowSetData["fform"] || "";
            let config = {};
            config = this.readValueAddToContents(vtreeAtte);
            config.formID = formID
            let formType = config.formType;
            debugger
            console.log(config);
            if (formType == 'ReactForm') {
                param.config = config;
                param.caption = config.caption;
                window.parent.openReactForm(param);
            } else if (formType == 'GwtForm') {
                var stub =  window.parent.StubObject();
                stub.setObject("contentView", config.formID + ".form1");
                stub.setObject("caption", config.caption);
                stub.setObject("forms", config.formID);
                window.parent.openGWTFormInReact(stub);
            } else if (formType == 'IFrame') {
                var webURL = config.webURL;
                window.parent.open(webURL)
            }
        },
        readValueAddToContents(value) {
        var config = {};
        if (value == null || value == '') {
            config = {
                propsKey: '',
                propsValue: ''
            };
            return;
        }
        var valArray = [];
        valArray = value.split(';');
        for (let i = 0; i < valArray.length; i++) {
            if (valArray[i] != '' && valArray[i] != null) {
                let emArray = valArray[i].split("=");
                let key = emArray[0];
                let val = emArray[1];
                console.log("key:" + key + "      val:" + val);
                config[key] = val;
            }
        }
        return config;
    }
    },
};
</script>

<style lang="css" scoped>
 ul li::marker{
    content: url('../static/pointLi.png');
    width: 2px;
    
 }
 ul li{
    position: relative;
    left: -10px;
    line-height: 35px;
    cursor: pointer;
    text-align: left;
    padding-inline-start:20px;
 }
 ul li span{
    position: relative;
    top: 3px;
    font-family: "MicrosoftYaHei ";
    font-weight: 400;
    font-size: 14px;
    color: #3f4553;
 }
</style>