import axios from "./axios"

// functions to fetch from backend
export async function sendFileToBackend(file: File) {
    try {
        const formData = new FormData()
        formData.append("file", file)
        const res = await axios.post("/simplify-file", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(res.data)
        return res.data.fileEncoding
    } catch (error) {
        
    }
    console.log("Sending file to backend")
}   