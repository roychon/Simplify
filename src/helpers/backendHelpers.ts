import axios from "./axios"

// create functions to fetch from backend
export async function sendFileToBackend(file: File) {
    // try {
    //     const formData = new FormData()
    //     formData.append("file", file)
    //     const res = await axios.post("some backend endpoint we do not know yet", formData,
    //     {
    //         headers: {
    //             "Content-Type": "multipart/form-data" // have to use multipart/form-data since we are uploading files, note that files are sent in binary and NOT in JSON
    //         }
    //     })
    //     const data = await res.json()
    //     console.log(data)
    //     // TODO: we would likely return the simplified file to have pdf preview
    // } catch (e) {
    //     console.log("ERROR: ", e)
    // }
    console.log("Sending file to backend")

}   