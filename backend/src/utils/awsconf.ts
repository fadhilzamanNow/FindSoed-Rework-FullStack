import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const awsClient = new S3Client({
  region: process.env.AWS_REGION || "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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
