<template>
    <div>
        <ul style="list-style:none;margin-top:0px;height: 200px; padding-inline-start: 20px;">
            <li v-for="archivesPolicy in archivesPolicyArr" style="text-align: left !important; height: 40px; cursor: pointer; position: relative;" @click="downLoadPolicyFile(archivesPolicy.fguid)">
                <h4 class="archivesOrg">【{{archivesPolicy.policyTitle}}】</h4>
                <div class="archivesMessqge">
                    {{ archivesPolicy.policyPurpuse }}
                </div>
                <div class="archivesTime">
                    {{ archivesPolicy.showTime }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'ArchivesPolicy',
    computed:{
        ...mapState("firstPage",["archivesPolicyArr"])
    },
    methods:{
        ...mapActions("firstPage",["downLoadPolicyFile"])
    }
};
</script>

<style lang="css" scoped>
.archivesMessqge{
    display: inline-block;
    color: #55565a;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    letter-spacing: 0;
    }
.archivesOrg{
    color: #0081CC;
    margin-top: 15px;
    display: inline-block;
}
.archivesTime{
    font-family: "Microsoft YaHei";
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    color: #9399a7;
    position: absolute;
    right: 20px;
    bottom: 0px;
}
</style>