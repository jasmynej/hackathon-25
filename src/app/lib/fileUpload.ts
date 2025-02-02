import {BlobServiceClient} from "@azure/storage-blob";


const connectionString = process.env.AZURE_STORAGE_CONNECTION!;

export async function uploadToAzureBlob(containerName: string, file: File, blobName: string) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: file.type },
    });

    const fileUrl = blockBlobClient.url;
    return fileUrl;

}

