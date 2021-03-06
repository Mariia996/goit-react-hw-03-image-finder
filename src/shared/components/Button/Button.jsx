import React from 'react';
import styles from './Button.module.css';

const LoadMore = ({onClick}) => {
    return ( <button type='Button' className={styles.button} onClick={onClick}>Load More</button> );
}

export default LoadMore;