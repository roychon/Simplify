const express = require("express")
const app = express() // initialize express app
const cors = require("cors")
// express package to simplify file uploads
const fileUpload = require("express-fileupload")
const shortid = require("shortid")
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const fs = require("fs")

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || "3000"

// MIDDLEWARE
app.use(express.json())
app.use(fileUpload())
app.use(cors({
    credentials: true, // allow cookies and credentials in CORS requests
    origin: process.env.CORS_ORIGIN // allowed access origins
}))

// ROUTES
app.get("/", (req, res) => {
    res.json({"user": "Roy"})
})

app.post("/simplify-file", async (req, res) => {
    // TODO: handle duplicate file uploads
    
  if (req.files && Object.keys(req.files).length !== 0) {
    // console.log("REQ: ", req)
    // console.log(req.files)
    // Path to upload file
    const uploadedFile = req.files.file;

    // Upload path
    const uploadPath = __dirname + "/uploads/" + shortid.generate() + ".html";
 
    // saving file logic using mv() function
    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        res.status(404).send("File failed to save");
      }
    
      // read contents of html file, then parse it
      fs.readFile(uploadPath, "utf8", async (err, data) => {
            const dom = new JSDOM(data)
            const document = dom.window.document
            // init Cohere client
            const { CohereClient } = require('cohere-ai');
            const cohere = new CohereClient({
                token: process.env.COHERE_API_KEY,
            });
            const simplifyTextNodes = async (node, counter) => {
                if (counter.count == 9) return
                // console.log(document.childNodes[0])
                for (let child of node.childNodes) {
                    // console.log(`text content: ${child.nodeValue}`)
                    // if (child.nodeValue == null) console.log("NULL\n")
                    if (child.nodeType == 3&& child.nodeValue != null && child.nodeValue && child.nodeValue.trim()) {
                        // console.log("HEEE")
                        const content = child.nodeValue.trim();
                        console.log(`CONTENT: ${content}`);
    
                        try {
                            const chat = await cohere.chat({
                                model: "command",
                                message: `Simplify the following text to a Grade 6 Reading Level by replacing complex words with simpler synonyms. 
                                Only return the simplified text, without any explanations, introductions, or conclusions: "${content}".`
                            });
    
                            // Replace the original text with the simplified text
                            const firstQuoteIndex = chat.text.indexOf('"');
                            const secondQuoteIndex = chat.text.lastIndexOf('"');
                            child.nodeValue = chat.text.slice(firstQuoteIndex + 1, secondQuoteIndex);
                            // console.log(`SIMPLIFIED TEXT: ${chat.text}`)
                        } catch (error) {
                            console.error(`Error simplifying text: ${error.message}`);
                        }
                        counter.count += 1;
                        console.log("COUNT: ", counter.count);
                    }
                    await simplifyTextNodes(child, counter)
                }
         };
         // in js, numbers are not by reference
        let counter = {count: 0}
        // recursive function call
        await simplifyTextNodes(document.body, counter)
        //     Serialize the modified DOM back to an HTML string
        const simplifiedHtml = dom.serialize();

        // Write the simplified HTML back to the original file
        fs.writeFile(uploadPath, simplifiedHtml, 'utf8', (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to write simplified file');
            }

            console.log('DONE');
            return res.status(201).send('Successfully simplified contents of file');
            // TODO: save to MongoDB database and send the file entry locations to frontend later.
        })
            
        })
        
    });
  }
  
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}).on("error", (e) => {
    console.log(e)
})