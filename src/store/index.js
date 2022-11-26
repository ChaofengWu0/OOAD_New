// 引入vuex
import Vue from "vue"
import Vuex from 'vuex'

import router from "@/router"

Vue.use(Vuex);


// 创建并暴露store，需要传入配置对象
export default new Vuex.Store({
    // 用于存储数据
    state: {
        id: "",
        username: "",
        nickname: "",
        email: "",
        phone: "",
        avatar_path: "",
        role: 3,
        address: "",
        subject: "",
        classes: [],
    },
    // 准备actions，其功能用于相应组件的动作,可以commit到mutation状态，并且是从vue components dispatch来的
    actions: {
        change({commit}) {
            commit("change")
        },
        logout() {
            window.sessionStorage.clear()
            sessionStorage.clear()
            router.push("/login").then().catch(err => console.log(err))
        }
    },
    getters: {
        getToken: () => {
            return sessionStorage.getItem("token")
        },
        getUserInfo: () => {
            return JSON.parse(sessionStorage.getItem("userInfo"))
        },
        getInfo: (infoName) => {
            return JSON.parse(sessionStorage.getItem(infoName))
        }
    },
    // 准备mutation，用于操作（加工，修改）数据，state
    mutations: {
        change(state, res) {
            console.log(res)
            state.id = res.id;
            state.username = res.username
            state.nickname = res.nickname
            state.phone = res.phone;
            state.address = res.address;
        },
        setToken: (state, token) => {
            sessionStorage.setItem("token", token);
        },
        setUserInfo: (state, userInfo) => {
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
        setInfo: (state, infoName, info) => {
            sessionStorage.setItem(infoName, JSON.stringify(info));
        }
    }
})