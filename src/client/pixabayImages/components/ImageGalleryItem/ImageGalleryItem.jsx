import React from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {

    return (<li className={styles.imageGalleryItem} onClick={onClick}>
        <img src={webformatURL} alt={tags} className={styles.imageGalleryItemImage}  />
        </li>)
}

export default ImageGalleryItem;