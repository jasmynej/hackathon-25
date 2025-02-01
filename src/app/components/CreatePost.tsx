'use client';

import React, { useState } from "react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userId", "12345"); // Replace with actual user ID

        if (files) {
            Array.from(files).forEach((file) => {
                formData.append("images", file); // Send each file under 'images'
            });
        }

        const res = await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Post created successfully!");
            setTitle("");
            setContent("");
            setFiles(null);
        } else {
            setMessage(`Error: ${data.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Create Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="file"
                multiple // Allows selecting multiple images
                onChange={(e) => setFiles(e.target.files)}
                required
            />
            <button type="submit">Create Post</button>
            {message && <p>{message}</p>}
        </form>
    );
}