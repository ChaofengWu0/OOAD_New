import axios from "@/utils/request.js";
export const Renderer =(data)=>
    axios(
        {
            url: 'course/verification',
            method: 'get',
            data
        }
    )