import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Pagination from '../components/Pagination';
import { Link, useHistory } from 'react-router-dom';

const Main = () => {

    const [containers, setContainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [containersPerPage] = useState(30);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then(res => {
                setContainers(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleFoamingSubmit = (e, data) => {

        axios.post('http://localhost:8000/foaming', data)
            .then(res => {
                console.log(res.data)
                history.push('/')
            })
            .catch(error => console.log(error));
    };

    const handleNonFoamingSubmit = (e, data) => {

        axios.post('http://localhost:8000/nonfoaming', data)
            .then(res => {
                console.log(res.data)
                history.push('/')
            })
            .catch(error => console.log(error));
    };

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
                                        <input type='submit' handleFoamingSubmit={handleFoamingSubmit} className='btn btn btn-success btn-sm me-5'value='Foaming!'/>
                                        <img src={container.url} width="550" height="500"/>
                                        <input type='submit' handleNonFoamingSubmit={handleNonFoamingSubmit} className='btn btn btn-success btn-sm ms-5'value='Not Foaming!'/>
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