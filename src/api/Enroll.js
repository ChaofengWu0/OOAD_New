import axios from "@/utils/request.js";
export const Enroll =(data)=>
    axios(
        {
        url: 'user/register',
        method: 'post',
        data
        }
    )