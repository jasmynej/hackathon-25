'use client';
import {getFileTypeFromUrl} from "@/app/lib/fileUpload";
import React from "react";

interface FilePreviewProps {
    fileUrl: string;
}

export default function AzureFilePreview({ fileUrl }: FilePreviewProps) {
    const fileType = getFileTypeFromUrl(fileUrl); // ✅ Get file type

    const renderPreview = () => {
        if (fileType.startsWith('image/')) {
            return <img src={fileUrl} alt="Preview" style={previewStyle} />;
        }

        if (fileType === 'application/pdf') {
            return <iframe src={fileUrl} style={previewStyle}></iframe>;
        }

        if (fileType.startsWith('video/')) {
            return <video src={fileUrl} controls style={previewStyle} />;
        }

        if (fileType.startsWith('text/')) {
            return (
                <p>Your browser does not support inline previews.</p>
            );
        }

        return <p>Preview not supported for this file type.</p>;
    };

    return <div style={{ padding: '20px' }}>{renderPreview()}</div>;
}

const previewStyle: React.CSSProperties = {
    minWidth:'700px',
    maxWidth: '100%',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
};