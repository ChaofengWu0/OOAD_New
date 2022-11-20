import axios from "@/utils/request.js";
export const Button =(data)=>
    axios(
        {
            url: 'user/register',
            method: 'post',
            data
        }
    )