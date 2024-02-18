<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>
<template>
    <a-config-provider :locale="zhCN">
        <GradingTableCom/>
    </a-config-provider>
</template>

<script>
import GradingTableCom from '@/components/GradingTableCom.vue';
export default {
    name: 'GradingTable',
    components:{GradingTableCom},
    data() {
        return {
        };
    },
};
</script>

<style lang="less">
.ant-pagination-item-active{
    background:rgb(0, 129, 204) !important;
    color: #fff !important;
    a{
        color: #fff !important;
    }
}
</style>