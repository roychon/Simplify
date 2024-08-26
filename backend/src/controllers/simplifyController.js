const dotenv = require('dotenv');
dotenv.config();
const { CohereClient } = require('cohere-ai');
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const simplifyText = async (req, res) => {
  let { text, keywords } = req.body;
  let keywordList = '';
  for (let keyword of keywords) {
    keywordList += `${keyword}, `;
  }
  let message =
    `Simplify the following text to a Grade 6 Reading Level by replacing complex words with simpler synonyms. 
      Only return the simplified text, without any explanations, introductions, or conclusions: ${text}. The simplified text should include the following words: ` +
    keywordList;
  const response = await cohere.chat({
    message,
  });
  console.log(response.text);
  res.send(response.text);
};

const simplifyFile = async (err, data) => {
  const dom = new JSDOM(data)
  const document = dom.window.document
  const simplifyTextNodes = async (node, counter) => {
      if (counter.count == 2) return // TODO: change to 9 afterwards
      for (let child of node.childNodes) {
          // console.log(`text content: ${child.nodeValue}`)
          // if (child.nodeValue == null) console.log("NULL\n")
          if (child.nodeType == 3 && child.nodeValue != null && child.nodeValue && child.nodeValue.trim()) {
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

    // console.log('DONE');
    const base64Encoding = fs.readFileSync(uploadPath, {encoding: "base64"})
    console.log(base64Encoding)
    return res.status(201).json({"fileEncoding": base64Encoding});
    // TODO: save to MongoDB database and send the file entry locations to frontend later.
  })
  
}

module.exports = { simplifyText, simplifyFile };
