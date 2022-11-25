import axios from "@/utils/request.js";
export const RTeaCourseList =(data)=>
    axios(
        {
            url: '/course/teacher?',
            method: 'get',
            data
        }
    )