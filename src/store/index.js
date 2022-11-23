// 引入vuex
import Vuex from "vuex";
import Vue from "vue";
// 使用Vuex插件
Vue.use(Vuex)
// 准备actions，其功能用于相应组件的动作,可以commit到mutation状态，并且是从vue components dispatch来的
const actions = {
    change({commit}) {
        commit("change");
    }
}

// 准备mutation，用于操作（加工，修改）数据，state
const mutations = {
    change(state, res) {
        console.log(res)
        state.id = res.id;
        state.name = res.username
        state.phone = res.phone;
        state.address = res.address;
    }
}

// 用于存储数据
const state = {
    id: "",
    username: "",
    nickname: "",
    email: "",
    phone: "",
    avatar_path: "https://ts1.cn.mm.bing.net/th/id/R-C.d07bfdfef4c5b7fc9d0154bde181ec03?rik=42pHBThOWIAXJA&riu=http%3a%2f%2ftupian.qqw21.com" +
        "%2farticle%2fUploadPic%2f2019-9%2f201991821452013634.jpg&ehk=axY34pDbRrYLxCfGMRnO70M6DB6dXpPr3ykDnjNYJR8%3d&risl=&pid=ImgRaw&r=0&sres=" +
        "1&sresct=1",
    role: "",
    address: "",
    // notifications: [
    //   {
    //     date: '2016-05-01',
    //     content: '上海市普陀区金沙江路 1518 弄',
    //   },
    //   {
    //     date: '2099-02-03',
    //     content: 'nothing',
    //   }
    // ],
    // 下面的subject 和 classes是只有老师才有的属性
    subject: "",
    classes: [],


}

// 创建并暴露store，需要传入配置对象
export default new Vuex.Store({
    actions: actions,
    mutations: mutations,
    state: state,
})




