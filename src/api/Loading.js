import axios from "@/utils/request.js";

export const Loading =()=>
    axios(
        {
        url: 'notice/findAll',
        method: 'get',
        }
    )
    