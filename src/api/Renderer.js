import axios from "@/utils/request.js";
export const Renderer =(data)=>
    axios(
        {
            url: 'notice/findAll',
            method: 'get',
            data
        }
    )