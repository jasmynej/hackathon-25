'use client';
import {Resource} from "@prisma/client";
import { useEffect, useState } from 'react';
import { getLinkPreview } from 'link-preview-js';
import Image from "next/image";
import AzureFilePreview from "@/app/components/AzureFilePreview";


interface LinkPreviewData {
    title?: string;
    description?: string;
    images?: string[];
    url?: string;
    mediaType?: string;
    contentType?: string;
    favicons?: string[];
}

export default function ResourceView({Resource}: {Resource: Resource}) {
    const url = Resource.contentUrl; // ✅ Static URL
    const [preview, setPreview] = useState<LinkPreviewData>({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
                if (!res.ok) throw new Error('Failed to fetch preview');
                const data = await res.json();
                setPreview(data);
            } catch (err) {
                console.error('Error fetching link preview:', err);
                setError('Failed to load link preview.');
            }
        };
        if(Resource.type === "LINK"){

            fetchPreview().then(r => console.log(r));
        }
    }, []);

    return (
        <div>
            <h1>{Resource.title}</h1>
            <h2>{Resource.desc}</h2>
            {Resource.type === "IMAGE" &&
                <Image src={Resource.contentUrl} alt="" width="300" height="200" />
            }
            {Resource.type === "LINK" &&
                <div style={cardStyle}>
                    {preview.images && <img src={preview.images[0]} alt="Preview" style={imageStyle}/>}
                    <div>
                        <h3>{preview.title || 'No Title Found'}</h3>
                        <p>{preview.description || 'No Description Available'}</p>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                            Visit Site
                        </a>
                    </div>
                </div>
            }
            {
                Resource.type === "FILE" &&
                <AzureFilePreview fileUrl={Resource.contentUrl}/>
            }
        </div>
    )


}

// ✅ Simple Styling
const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    gap: '10px',
    maxWidth: '400px',
};

const imageStyle: React.CSSProperties = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
};

const linkStyle: React.CSSProperties = {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 'bold',
};