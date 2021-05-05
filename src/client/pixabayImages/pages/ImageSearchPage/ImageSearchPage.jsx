import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { initialState } from './initialState';
import ImageGallery from "../../components/ImageGallery";
import Searchbar from '../../components/Searchbar/Searchbar';
import Loader from '../../../../shared/components/Loader/Loader';
import LoadMore from '../../../../shared/components/Button/Button';
import Modal from '../../../../shared/components/Modal/Modal';

import { getAllImages } from '../../service/images';

import styles from './ImageSearchPage.module.css';

class ImageSearchPage extends Component {
    state = { ...initialState }

    listRef = createRef()

    componentDidMount(){
        this.setState({
            loading: true
        })
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.images.length < this.state.images.length) {
            const { current } = this.listRef;
            if (current) {
                return current.scrollHeight;
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { loading, query, page} = this.state;
        if (loading) {
            const imagesRequest = getAllImages(query, page);
            imagesRequest
                .then(({ data }) => {
                    this.setState(({ images }) => {
                            return {
                            loading: false,
                            images: [...images, ...data.hits]
                        }
                    })
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                        error
                })
            })
        }
        if (snapshot !== null) {
            window.scrollTo({
                top: snapshot,
                behavior: 'smooth',
            });
        }
    }


    loadMore = (e) => {
        e.preventDefault();
        this.setState(({ page }) => {
            return {
                loading: true,
                page: page + 1
            }
        });
    }

    searchImages = ({query}) => {
        this.setState({
            images: [],
            loading: true,
            query
        })
    }

    toggleModal = (src) => {
        this.setState(({showModal})=>({
            showModal: !showModal,
            largeImage: src
    }))
    }

    render() {
        const { searchImages, toggleModal, loadMore, listRef } = this;
        const { images, showModal, error, loading, largeImage } = this.state;
        return (
            <>
                <Searchbar onSubmit={searchImages} />
                {loading && <Loader />}
                {<div ref={listRef}><ImageGallery list={images} onClick={toggleModal} /></div>}
                {error && <p className={styles.errorMessage}>Something was wrong</p>}
                {!loading && !error && <LoadMore onClick={loadMore}/>}
                {showModal && (<Modal onClose={toggleModal}>
                    <img src={largeImage} alt="" className={styles.modalImg} />
                </Modal>)}
            </>
         )
    }
}

ImageSearchPage.defaultProps = {
    images: [{
        id: "",
        webformatURL: "https://us.bgxme.com/images/no-img.png",
        largeImageURL: "https://us.bgxme.com/images/no-img.png",
        tags: ""
    }],
    loading: false,
    page: 1,
    showModal: false,
}

ImageSearchPage.propTypes = {
    images: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    page: PropTypes.number.isRequired,
    largeImage: PropTypes.string,
    showModal: PropTypes.bool.isRequired,
    query: PropTypes.string,
}


export default ImageSearchPage;
