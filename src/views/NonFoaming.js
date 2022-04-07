import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const NonFoaming = () => {

    const [containers, setContainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [containersPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:8000/notfoaming')
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
                <Link to={"/"} className='btn btn btn-success btn-sm mb-3' role='button'>Unclassified Containers</Link>
            </div>
            <div>
                <h1>Non-Foaming Containers</h1>
            </div>
            <table className='table table-striped table-bordered border-success'>
                {currentContainers.map((container, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <img src={container.url} width="550" height="500"/>
                                    </td>
                                    <td>
                                    <p>Status: {container.status} </p>
                                    <Link to={`/status/` + container._id}>
                                        <p>View Details</p>
                                    </Link>
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

export default NonFoaming;