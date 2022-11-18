import axios from "@/utils/request.js";
export const login =(data)=>
    axios(
        {
        url: 'user/login',
        method: 'post',
        data
        }
    )