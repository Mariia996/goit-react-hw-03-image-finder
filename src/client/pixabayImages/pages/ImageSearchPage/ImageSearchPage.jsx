import {Component} from 'react';

import ImageGallery from "../../components/ImageGallery";

import Searchbar from '../../components/Searchbar/Searchbar';
import Loader from '../../../../shared/components/Loader/Loader';
import LoadMore from '../../../../shared/components/Button/Button';
import Modal from '../../../../shared/components/Modal/Modal';

import { getAllImages } from '../../service/images';

import styles from './ImageSearchPage.module.css';

class ImageSearchPage extends Component {
    state = {
        images: [],
        loading: false,
        error: null,
        showModal: false,
        query: "",
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
    }

    componentDidUpdate() {
        const { loading, query } = this.state;
        if (loading) {
            const imagesRequest = getAllImages(query);
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

    toggleModal = () => {
        this.setState(({showModal})=>({
        showModal: !showModal
    }))
    }

    render() {
        const { searchImages, toggleModal, loadMore } = this;
        const { images, showModal, error, loading } = this.state;

        return (
            <>
                <Searchbar onSubmit={searchImages} />
                {loading && <Loader />}
                {!loading && !error && <ImageGallery list={images} onClick={toggleModal} />}
                {error && <p>Something was wrong</p>}
                {!loading && !error && <LoadMore onClick={loadMore}/>}
                {showModal && (<Modal />)}
            </>
         )
    }
}

export default ImageSearchPage;
