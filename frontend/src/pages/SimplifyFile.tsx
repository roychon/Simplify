import {useEffect, useRef, useState } from "react";
import HomePageTitle from "../components/HomePageTitle";
import Button from "../components/Button";
import { sendFileToBackend } from "../helpers/backendHelpers";
import PDFViewer from "../components/PDFViewer";

const SimplifyFile = () => {
    const fileRef = useRef<HTMLInputElement|null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isFileChosen, setIsFileChosen] = useState<boolean>(true)
    const [fileEncoding, setFileEncoding] = useState<string>("")
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
        {fileEncoding ? (
          <PDFViewer fileEncoding={fileEncoding} />
        ) : (
          <section id="file-upload-page">
            <HomePageTitle title={"Upload your document"} />
            <div style={{ textAlign: "left" }}>
              <p>Drag and drop your file here. We accept .html and .docx files</p>
              <input
                ref={fileRef}
                type="file"
                id="file-upload-btn"
                onChange={(e) => handleFileUpload(e)}
                accept=".html, .docx"
                style={{ marginTop: "10px" }}
              />
              {file && (
                <section style={{ marginTop: "10px" }}>
                  File details:
                  <ul>
                    <li>Name: {file.name}</li>
                    <li>Type: {file.type}</li>
                  </ul>
                </section>
              )}
            </div>
            <div className="file-btn-section">
              <Button
                text="Submit"
                handleClick={async () => {
                  if (file) {
                    const res = await sendFileToBackend(file);
                    console.log(res);
                    setFileEncoding(res);
                  } else {
                    setIsFileChosen(false);
                  }
                }}
              />
              <Button
                text="Cancel"
                handleClick={() => {
                  if (fileRef.current) fileRef.current.value = "";
                  setFile(null);
                }}
              />
            </div>
            {!isFileChosen && <p>No file chosen</p>}
          </section>
        )}
      </>
    );    
      
}
 
export default SimplifyFile;