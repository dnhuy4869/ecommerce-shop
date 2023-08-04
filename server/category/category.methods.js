import fileStream from "../utils/file-stream.js";

const deleteImage = (category) => {
    if (category.imageUrl && category.imageUrl !== "") {
        fileStream.deleteFile(`./public${category.imageUrl}`);
    }
}

export default {
    deleteImage,
}