<template>
    <div>
        <div class='jointParent' style="margin-top: 15px; display: inline-block;">
            <slot>不存在数据</slot>
            <div v-for="jointNumkey,jointNumindex in jointNum" class="joint">
                <div style="position: relative;top: -20px;">{{ `第${jointNumkey}节` }}</div>
                <BoxTree v-for="key,index in joint"  :boxKey="getArr(jointNumindex,joint,index)" :key="index" :positionArr="[XAxis,jointNumindex,index]"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import BoxTree from './BoxTree.vue';
export default {
    name: 'LayerTree',
    props:["boxArr","XAxis"],
    components:{
        BoxTree
    },
    computed:{
        ...mapState("grounding",["joint"]),
        jointNum(){
            let jointNum = 1;
            try{
                jointNum = this.boxArr.length/this.joint;
            }
            catch(error){
                
            }
            return jointNum;
        }
    },
    methods:{
        getArr(jointNumindex,joint,index){
            var indexxx = jointNumindex*(joint)+index;
            return this.boxArr.at(parseInt(indexxx))
        }
    }
    
};
</script>

<style lang="css" scoped>


.joint {
    display: inline-block;
    padding-right: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 15px;
    padding-bottom: 20px;
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
    linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
    linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
    linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 10px 2px, 10px 2px, 2px 10px, 2px 10px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    
}


</style>