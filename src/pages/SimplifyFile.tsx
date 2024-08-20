import {useEffect, useRef, useState } from "react";
import HomePageTitle from "../components/HomePageTitle";
import Button from "../components/Button";
import { sendFileToBackend } from "../helpers/backendHelpers";
import PDFViewer from "../components/PDFViewer";

const SimplifyFile = () => {
    const fileRef = useRef<HTMLInputElement|null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isFileChosen, setIsFileChosen] = useState<boolean>(true)
    const [isFileSimplified, setIsFileSimplified] = useState<boolean>(false)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    useEffect(() => {
        if (file) setIsFileChosen(true)
    }, [file])
    
    return (
        <>
          <section id="file-upload-page">
            <HomePageTitle title={"Upload your document"} />
            <div style={{"textAlign": "left"}}>
                <p>Drag and drop your file here. We accept .pdf and .docx files</p>
                <input ref={fileRef} type="file" id="file-upload-btn" onChange={(e) => handleFileUpload(e)} accept="pdf docx" style={{"marginTop": "10px"}}/>
            {file && (
              <section style={{"marginTop": "10px"}}>
                File details:
                <ul>
                  <li>Name: {file.name}</li>
                  <li>Type: {file.type}</li>
                </ul>
              </section>
            )}

            </div>
            <div className="file-btn-section">
              <Button text="Submit" handleClick={() => file ? sendFileToBackend(file) : setIsFileChosen(false)} />
              <Button text="Cancel" handleClick={() => { if (fileRef) fileRef.current.value = null; setFile(null);}} />
            </div>
            {!isFileChosen && <p>No file chosen</p>}
          </section>
        {isFileSimplified && <PDFViewer />}
        </>
      );
      
}
 
export default SimplifyFile;