'use client';

import React, { useState } from "react";
import formStyles from './forms.module.css';

export default function CreateAnnouncement() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (file) formData.append("file", file);

        const res = await fetch("/api/announcements", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Announcement created successfully!");
            setTitle("");
            setContent("");
            setFile(null);
        } else {
            setMessage(`Error: ${data.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }} className={formStyles.resourceForm}>
            <h2>Create Announcement</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={formStyles.formInput}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className={formStyles.formInput}
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className={formStyles.formInput}
            />
            <button type="submit">Post Announcement</button>
            {message && <p>{message}</p>}
        </form>
    );
}