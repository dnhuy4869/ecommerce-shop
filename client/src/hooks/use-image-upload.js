import { useState } from "react";

export const useImageUpload = () => {
    
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const setImageFromUrl = (imageUrl) => {
        setPreviewUrl(imageUrl);
    };

    return { image, previewUrl, setImageFromUrl, handleImageChange };
}