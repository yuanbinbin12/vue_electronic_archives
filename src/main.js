import Vue from 'vue'
import App from './App.vue'
import {Tree,Row,Col,Alert,Table,TableColumn,Button,Image,Loading,Avatar,Upload, Message} from "element-ui";
import store from './store';
import router from './router';
import  Print  from 'vue-print-nb';
import axios from "axios";
import { Table as antdTable,Pagination as antdPagination,Tooltip as antTooltip,ConfigProvider as antConfigProvider } from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
axios.defaults.baseURL = window.location.href.split("/dist/index.html")[0];
// axios.defaults.baseURL = "/OSPApplication";
Vue.config.productionTip = false;
Vue.component(Tree.name,Tree);
Vue.component(Row.name,Row);
Vue.component(Col.name,Col);
Vue.component(Alert.name,Alert);
Vue.component(Table.name,Table);
Vue.component(TableColumn.name,TableColumn);
Vue.component(Button.name,Button);
Vue.component(Image.name,Image);
Vue.component(Avatar.name,Avatar);
Vue.component(Upload.name,Upload);
Vue.use(Print);
Vue.use(Loading);
Vue.use(Loading.directive);
Vue.use(antdTable);
Vue.use(antdPagination);
Vue.use(antTooltip);
Vue.use(antConfigProvider);
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
  store,
  router,
  
}).$mount('#app')
