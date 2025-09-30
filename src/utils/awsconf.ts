import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const awsClient = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIAROAQ3LGQOFRXPJP7",
    secretAccessKey: "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",
  },
});

export async function uploadImage(body: any) {
  await awsClient.send(
    new PutObjectCommand({
      Bucket: "",
      Key: "",
      Body: body,
      ContentType: "",
    }),
  );
}
