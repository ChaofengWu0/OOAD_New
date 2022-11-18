import Vue from 'vue'
import App from './App.vue'
import './assets/css/global.css'
// 引入ElementUI全部样式
// import ElementUI, {Message} from 'element-ui';
// 引入ElementUI的全部样式
// import 'element-ui/lib/theme-chalk/index.css';
// 引入需要的elementUI
import {
  Button,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Icon,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Main,
  Aside,
  Dropdown,
  Breadcrumb,
  BreadcrumbItem,
  DropdownItem,
  DropdownMenu,
  Image,
  Avatar,
  Descriptions,
  DescriptionsItem,
  Tag,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Tree,
  Steps,
  Step,
  Radio,
  Upload
} from "element-ui";

// 引入路由相关的包
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
import './assets/css/icons/iconfont.css'
// import axios from "axios"
// 引入store
import store from "@/store";


// axios.defaults.baseURL = ""
Vue.config.productionTip = false
// el-UI的引入
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Dropdown)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Image)
Vue.use(Avatar)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tree)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(VueRouter)
// Vue.prototype.$http = axios
// Vue.prototype.$message = Message


new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')


