<template>
    <div>
        <ul style="list-style:none;margin-top:0px;height: 200px; padding-inline-start: 20px;">
            <li v-for="archivesPolicy in archivesPolicyArr" style="text-align: left !important; height: 40px; cursor: pointer;" @click="downLoadPolicyFile(archivesPolicy.fguid)">
                <h4 class="archivesOrg">【{{archivesPolicy.policyTitle}}】</h4>
                <div class="archivesMessqge">
                    {{ archivesPolicy.policyPurpuse }}
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
}
.archivesOrg{
    color: #0081CC;
    display: inline-block;
}
</style>