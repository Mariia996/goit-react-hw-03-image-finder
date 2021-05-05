import ImageGalleryItem from "../ImageGalleryItem";
import styles from './ImageGallery.module.css';

const ImageGallery = ({ list, onClick}) => {

    const imageElements = list.map(({ id, ...props }) => {
        props = {
            ...props,
            onClick,
        }
    return <ImageGalleryItem key={id} {...props} />
});
    return (
        <ul className={styles.imageGallery}>
            {imageElements}
        </ul>
    )
}

export default ImageGallery;