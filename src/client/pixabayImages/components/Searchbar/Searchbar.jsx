import React, { Component } from 'react';
import { initialState } from './initialState';
import { fields } from './fields';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
    state = { ...initialState }

    handleChange = ({ target }) => {
        const { name, value } = target;
         this.setState({
            [name]: value
         })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;
        const { onSubmit } = this.props;
        onSubmit({ query })
    }

    render() {
        const { query } = this.state;
        const { handleSubmit, handleChange } = this;

        return (<header className={styles.searchbar}>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.searchFormButton}>
                    <span className={styles.searchFormButtonLabel}>Search</span>
                </button>

                <input
                    onChange={handleChange}
                    name="query"
                    value={query}
                    className={styles.searchFormInput}
                    type={fields.searchValue.text}
                    autoComplete={fields.searchValue.autocomplete}
                    autoFocus
                    placeholder={fields.searchValue.placeholder}
                />
            </form>
        </header>)

    }
}

export default Searchbar;