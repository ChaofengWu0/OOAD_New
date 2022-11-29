// 引入vuex
import Vue from "vue"
import Vuex from 'vuex'

import router from "@/router"
import * as requestUtil from "@/utils/request";

Vue.use(Vuex);


// 创建并暴露store，需要传入配置对象
export default new Vuex.Store({
    // 用于存储数据
    state: {
       token:"",
       userInfo:"",
       role:"",
       infoName:""
    },
    // 准备actions，其功能用于相应组件的动作,可以commit到mutation状态，并且是从vue components dispatch来的
    actions: {
        change({commit}) {
            commit("change")
        },
        async logout() {
            // window.alert(JSON.parse(sessionStorage.getItem("userInfo")).data.username)
            await requestUtil.post("/eduservice/t-user/logout?username="+JSON.parse(sessionStorage.getItem("userInfo")).data.username)
            window.sessionStorage.clear()
            router.push("/login").then(() => location.reload()).catch(err => console.log(err))
        }
    },
    getters: {
        getToken: () => {
            return sessionStorage.getItem("token")
        },
        getUserInfo: () => {
            return JSON.parse(sessionStorage.getItem("userInfo"))
        },
        getRole: () => {
            return JSON.parse(sessionStorage.getItem("role"))
        },
        getInfo:  ()=> {
            return (infoName) => {
                return JSON.parse(sessionStorage.getItem(infoName))
            }
        }
    },
    // 准备mutation，用于操作（加工，修改）数据，state
    mutations: {
        change(state, res) {
            console.log(res)
            state.token = res.token;
            state.userInfo = res.userInfo
            state.role = res.role
        },
        setToken: (state, token) => {
            state.token = token;
            sessionStorage.setItem("token", token);
        },
        setRole: (state, role) => {
            state.role = role
            sessionStorage.setItem("role", role);
        },
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
        setInfo: (state, info) => {

            sessionStorage.setItem(info['infoName'], JSON.stringify(info['infoBody']));
        }
    }
})
