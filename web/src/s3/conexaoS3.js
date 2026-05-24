
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.aws_region,
    credentials: {
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key, 
        sessionToken: process.env.aws_session_token || undefined 
    }
});

async function buscarJson(key) {
    const comando = new GetObjectCommand({
        Bucket: process.env.s3_bucket,
        Key: key
    });

    const resposta = await s3.send(comando);
    const conteudo = await resposta.Body.transformToString();
    return JSON.parse(conteudo);
}

module.exports = { buscarJson };