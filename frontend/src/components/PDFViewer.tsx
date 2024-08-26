import { useNavigate } from "react-router-dom";
import Button from "./Button";

const PDFViewer = ({fileEncoding}: {fileEncoding: string}) => {
    const navigate = useNavigate()

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `data:text/html;base64,${fileEncoding}`;
        link.download = "document.html"; // Change the file extension based on the type of the file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <section className="pdf-preview">
                <iframe
                src={`data:text/html;base64,${fileEncoding}`}
                width="100%"
                height="600px"
                color="white"
                title="PDF Viewer"></iframe>
            </section>
            <div style={{"display": "flex", "justifyContent": "center", "gap": "1rem"}}>
                <Button text="Back to Home" handleClick={() => navigate("/")}/>
                <Button text="Download" handleClick={handleDownload}/>
            </div>
        </>
    )
}

export default PDFViewer;