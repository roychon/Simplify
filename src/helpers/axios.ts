import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5173", // baseURL will be prepended to URL. ie) async .... await axios.post("/simplify-text")
    withCredentials: false // more on this when we deal with database
    // data: {} -> this is data sent with req body. ONLY applicable with POST, PUT, DELETE
})

export default instance