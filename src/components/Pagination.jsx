import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Pagination.module.css';

const Pagination = ({ containersPerPage, totalContainers, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalContainers / containersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Link to="#!" className='page-link' onClick={() => paginate(number)}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;