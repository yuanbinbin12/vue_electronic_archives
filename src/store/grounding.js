import axios from "axios";
export default {
    namespaced:true,
    mutations:{
        //获取架内格信息进行赋值
        getCabinetArr(state,param){
            state.CabinetArr = param.CabinetArr.faceData;
            let joint = 0;
            try{
                joint = parseInt(param.CabinetArr.joint);
            }catch(error){
                console.log("转化失败",error)
            }
            state.joint = joint;
            if(param.pageNum!==0){
                state.pageNum = param.pageNum;
            }
            state.cabinetId = param.cabinetId;
        },
        //获取菜单信息
        getNavigation(state,navigation){
            state.navigation = navigation;
        },
        //设置已选信息
        setBoxid(state,param){
            if(state.boxGroupedList.length!==null&&state.boxGroupedList.length!=="" && state.boxGroupedList.length!==0){
                let fileBagId = param.fileBagId;
                let fileBagName = param.fileBagName;
                let repositoryId = param.repositoryId;
                state.changeBoxList.push(fileBagId);
                state.changeBoxListMap.push({fileBagId,fileBagName,repositoryId});
                window.parent.changeBoxList = JSON.stringify(state.changeBoxList);
                window.parent.changeBoxListMap = JSON.stringify(state.changeBoxListMap);
            }
        },
        //设置架子面信息
        setPageSelect(state,pageSelect){
            state.pageSelect = pageSelect;
        },
        //设置弹框内的值
        setWarningMsg(state,param){
            if(state.warningMsg==="上架成功！"){
                state.warningMsg = param.message;
                state.typeMsg = param.type;
                window.parent.parent.closeCurrTabInReact();
                window.parent.closeCurrTabInReact();
            }
            else{
                state.warningMsg = param.message;
                state.typeMsg = param.type;
            }
        },
    },
    actions:{
         //获取 显示列表数据
    getCabinetArr(context,param){
        let cabinetIds = param.cabinetId==""?context.state.cabinetId:param.cabinetId;
        context.commit("setPageSelect",param.pageSelect);
      axios.post(`${window.parent.parent.reactGPO.contextPath}/cabinet/loadCabinet`,{"cabinetId":cabinetIds,"face":param.pageSelect}).then(
                Response=>{
                    if(Response.data.code==="0"){
                        context.commit("getCabinetArr",{
                            "CabinetArr":Response.data.data,"pageNum":param.pageNum,"cabinetId":cabinetIds
                          });
                        } else {
                            context.commit("setWarningMsg",{"message":Response.data.message,"type":"error"})
                        }
                },
                error=>{
                   
                });
    },
    //点击空格设置盒号
    setBoxid(context,param){
        if(context.state.boxGroupedList===null||context.state.boxGroupedList==="" || context.state.boxGroupedList.length===0){
            context.commit("setWarningMsg",{"message":"没有可以上架的盒，请再次选择需要上架的盒！","type":"error"});
            return;
        }
        if(context.state.changeBoxList.indexOf(param.fileBag)!=-1){
            context.commit("setWarningMsg",{"message":"该卡位已选择请勿重复点击！","type":"error"});
            return;
        }
        if(context.state.changeBoxList.length>=context.state.boxGroupedList.length){
            context.commit("setWarningMsg",{"message":`您选择了${context.state.boxGroupedList.length}盒档案上架，当前已选择${context.state.changeBoxList.length}个卡位，请点击确定进行上架处理。`,"type":"error"});
            return;
        }
        context.commit("setBoxid",param);
        // axios.post("${window.parent.parent.reactGPO.contextPath}/cabinet/upCabinet",{"boxId":param.boxId,"id":param.fileBag}).then(
        //     Response=>{
        //         if(Response.data.code==="0"){
                    
        //         }else{
        //             context.commit("setWarningMsg",{"message":Response.data.message,"type":"error"})
        //         }
        //     },
        //     error=>{
                
        //     });
    },
    //获取菜单
    getNavigation(context,navigationBooolean){
        var navigationUrl = "";
        if(navigationBooolean==="1"){
            navigationUrl = `${window.parent.parent.reactGPO.contextPath}/cabinet/loadRepository/${window.parent.parent.reactGPO.UserName}`;//${window.parent.parent.reactGPO.UserName}
        } else if(navigationBooolean === "2"){
            navigationUrl = `${window.parent.parent.reactGPO.contextPath}/cabinet/queryRepository/${window.parent.parent.reactGPO.UserName}`;
        }
        axios.post(navigationUrl).then(
            Response=>{
                if(Response.data.code==="0"){
                    context.commit("getNavigation",Response.data.data);
                }else{
                    context.commit("setWarningMsg",{"message":Response.data.message,"type":"error"})
                }
            },
            error=>{
                
            });
    },
    //修改面
    setPageSelect(context,pageSelect){
        context.commit("setPageSelect",pageSelect);
        let cabinetIds = context.state.cabinetId;
        axios.post(`${window.parent.parent.reactGPO.contextPath}/cabinet/loadCabinet`,{"cabinetId":cabinetIds,"face":pageSelect}).then(
            Response=>{
                if(Response.data.code==="0"){
                    context.commit("getCabinetArr",{
                        "CabinetArr":Response.data.data,"pageNum":0,"cabinetId":cabinetIds
                    });
                }else{
                    context.commit("setWarningMsg",{"message":Response.data.message,"type":"error"})
                }
            },
            error=>{
            
        });
    }
    },
    state:{
        navigation: [],//导航数据
        CabinetArr :[],//架子内部信息
        pageNum:2,//面数
        pageSelect:1,//选择的页数
        cabinetId:"",//架子号,
        warningMsg:"",//警告内容
        typeMsg:"",//警告类型
        changeBoxList:[],//选择的格信息
        joint:0,//当前存在架子的每节格数
        boxGroupedList:JSON.parse(localStorage.getItem("BoxingId")),//需要上架的盒信息
        changeBoxListMap:[]
    }
}