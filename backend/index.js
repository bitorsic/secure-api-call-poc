require('dotenv').config();
const express = require('express');
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = process.env.ENCRYPTION_KEY;

const decrypt = (encryptedText) => {
	const [ivBase64, encryptedData] = encryptedText.split(':');
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'base64'), Buffer.from(ivBase64, 'base64'));
	let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
	decrypted += decipher.final('utf-8');
	return decrypted;
  };

app.post('/', (req, res) => {
	console.log(`Encrypted data received: ${req.body.data}\n`);

	const decryptedDataString = decrypt(req.body.data);

	console.log(`Decrypted data:`);
	console.log(JSON.parse(decryptedDataString));

	return res.status(200).send();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`[+] Server running on port ${PORT}`);
});