import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import Pagination from '../components/Pagination';

const Main = () => {

    const [containers, setContainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [containersPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then(res => {
                setContainers(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const indexOfLastContainer = currentPage * containersPerPage;
    const indexOfFirstContainer = indexOfLastContainer - containersPerPage;
    const currentContainers = containers.slice(indexOfFirstContainer, indexOfLastContainer)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div className='container-sm mt-3 mb-5'>
            <div className='d-flex justify-content-evenly'>
                <Link to={"/foaming"} className='btn btn btn-success btn-sm mb-3' role='button'>Foaming Containers</Link>
                <Link to={"/nonfoaming"} className='btn btn btn-success btn-sm mb-3' role='button'>Non-Foaming Containers</Link>
            </div>
            <div>
                <h1>Unclassified Containers</h1>
            </div>
            <table className='table table-striped table-bordered border-success'>
                {currentContainers.map((container, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>
                                    <img src={container.url} width="550" height="500" alt='' />
                                </td>
                            </tr>
                        </tbody>
                    )
                }
                )}
            </table>
            <Pagination totalContainers={containers.length} containersPerPage={containersPerPage} paginate={paginate}/>
        </div>//container
    )
};

export default Main;