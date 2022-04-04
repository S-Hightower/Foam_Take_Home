import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import Pagination from '../components/Pagination';

const Main = () => {

    const [status, setStatus] = useState('')
    const [containers, setContainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [containersPerPage] = useState(5);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then(res => {
                setContainers(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = (e, data) => {
        axios.put(`http://localhost:8000/status`, data)
            .then(res => {
                console.log(res.data)
            });
    };

    const indexOfLastContainer = currentPage * containersPerPage;
    const indexOfFirstContainer = indexOfLastContainer - containersPerPage;
    const currentContainers = containers.slice(indexOfFirstContainer, indexOfLastContainer)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const previousPage = () => {
        setSkip(skip - containersPerPage);
    }

    const nextPage = () => {
        setSkip(skip + containersPerPage);
    }

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
                                        <div>
                                            <form onClick={e => { handleSubmit(e, { status }) }}>
                                                <div className="form-group mt-3">
                                                    <label>Status:</label>
                                                    <select onChange={e => { setStatus(e.target.value) }} value={status} className="form-select mb-3">
                                                        <option>Unclassified</option>
                                                        <option>Foaming</option>
                                                        <option>Not Foaming</option>
                                                    </select>
                                                </div>
                                                <div className="mt-3">
                                                    <input type='submit' className="btn btn-info" value='Final Decision?' />
                                                </div>
                                            </form>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={container.url} width="550" height="500" alt=''/>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                    )}
                </table>
                <button className='btn btn btn-success btn-sm' onClick={previousPage}> Previous Page</button>
                <button className='btn btn btn-success btn-sm' onClick={nextPage}> Next Page</button>
                <Pagination totalContainers={containers.length} containersPerPage={containersPerPage} paginate={paginate}/>
            </div>//container
        )};

    export default Main;