import fileStream from "../utils/file-stream.js";

const deleteImage = (product) => {
    if (product.imageUrl && product.imageUrl !== "") {
        fileStream.deleteFile(`./public${product.imageUrl}`);
    }
}

export default {
    deleteImage,
}