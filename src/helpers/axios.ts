/* 
In backend, 4 types of operations -> CRUD
Create - POST
Read - GET
Update - PUT
Delete - DELETE
-> search up HTTP headers
*/

/*
axios.get({link name}) -> works exactly like fetch. async await

create something (like a user)
axios.post({link name}, {
    username: 
    password
})
.then(res) ... ; response will be OK signal, or ERROR signal


*/

import axios from "axios"

// the axios instance we'll work with
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export default axiosInstance