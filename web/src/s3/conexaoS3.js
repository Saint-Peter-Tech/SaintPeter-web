require("dotenv").config();

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.aws_region,
});

async function buscarJson(key) {
  const comando = new GetObjectCommand({
    Bucket: process.env.bucket,
    Key: key,
  });

  const resposta = await s3.send(comando);
  const conteudo = await resposta.Body.transformToString();

  return JSON.parse(conteudo);
}

async function buscarArquivo(key) {

    const command = new GetObjectCommand({
        Bucket: process.env.bucket,
        Key: key
    });

    return await s3.send(command);
}

module.exports = { buscarJson, buscarArquivo };