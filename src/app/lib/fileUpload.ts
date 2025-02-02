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

export function getFileTypeFromUrl(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase(); // Extract the file extension

    const mimeTypes: { [key: string]: string } = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        svg: 'image/svg+xml',
        webp: 'image/webp',
        pdf: 'application/pdf',
        txt: 'text/plain',
        md: 'text/markdown',
        csv: 'text/csv',
        json: 'application/json',
        mp4: 'video/mp4',
        webm: 'video/webm',
        avi: 'video/x-msvideo',
        mov: 'video/quicktime',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        zip: 'application/zip',
        rar: 'application/vnd.rar',
    };
    console.log(extension);
    return mimeTypes[extension || ''] || 'application/octet-stream'; // Fallback for unknown types
}

