const crypto = require("crypto");
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    if (!text) return '';

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return iv.toString('hex') + ";" + encrypted.toString('hex');
}

const decrypt = (iv, content) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrpyted.toString();
}

module.exports = { encrypt, decrypt };