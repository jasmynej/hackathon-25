'use client';

import React, { useState } from 'react';
import formStyles from './forms.module.css';
export default function CreateResource() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null as File | null,
        link: '',
        type: '',
        isPublic: false,
        tags: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        switch (e.target.type) {
            case 'file':
                const fileInput = e.target as HTMLInputElement;
                setFormData((prev) => ({
                    ...prev,
                    [name]: fileInput.files ? fileInput.files[0] : null,
                }));
                break;

            case 'checkbox':
                const checkboxInput = e.target as HTMLInputElement;
                setFormData((prev) => ({
                    ...prev,
                    [name]: checkboxInput.checked,
                }));
                break;

            default:
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
        }
    };

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTags = e.target.value.split(',').map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach((item) => data.append(`${key}[]`, item));
                } else {
                    data.append(key, value as Blob | string);
                }
            }
        });

        const res = await fetch('/api/library', {
            method: 'POST',
            body: data,
        });

        const responseData = await res.json();
        console.log(responseData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }} className={formStyles.resourceForm}>
            <h1>Create Resource</h1>
            <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className={formStyles.formInput}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className={formStyles.formInput}
            />
            <input
                name="file"
                type="file"
                onChange={handleChange}
                className={formStyles.formInput}
            />
            <input
                name="link"
                placeholder="Link (optional)"
                value={formData.link}
                onChange={handleChange}
                className={formStyles.formInput}
            />
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className={formStyles.formInput}
            >
                <option value="">Select Type</option>
                <option value="LINK">Link</option>
                <option value="FILE">File</option>
                <option value="IMAGE">Image</option>
            </select>
            <label>
                <input
                    name="isPublic"
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={handleChange}
                />{' '}
                Make Public
            </label>
            <input
                name="tags"
                placeholder="Tags (comma-separated)"
                onChange={handleTags}
                className={formStyles.formInput}
            />

            <button type="submit">Share Resource</button>
        </form>
    );
}