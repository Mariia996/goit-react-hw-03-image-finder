import React from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick}) => {
    return (<li className={styles.imageGalleryItem} onClick={() => onClick(largeImageURL)}>
        <img src={webformatURL} alt={tags} className={styles.imageGalleryItemImage}  />
        </li>)
}

export default ImageGalleryItem;