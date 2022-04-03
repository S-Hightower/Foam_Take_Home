import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Pagination from '../components/Pagination';

const Main = () => {

    const [containers, setContainers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [containersPerPage] = useState(30);

    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then(res => {
                setContainers(res.data);
                setLoaded(true);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const indexOfLastContainer = currentPage * containersPerPage; // 20
    const indexOfFirstContainer = indexOfLastContainer - containersPerPage; // 20 - 20
    const currentContainers = containers.slice(indexOfFirstContainer, indexOfLastContainer)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div className='container-sm mt-3 mb-5'>
            <div>
                <h1>Unclassified Images</h1>
            </div>
            <div className='row col-12'>
                {loaded
                    ? loaded
                    :
                    currentContainers.map((container) => {
                        return (
                            <div className='col' key={container.url}>
                                <img
                                    src={container.url}
                                    width="245px"
                                    height="175px"
                                    />
                            </div>
                        )
                    }
                )}
                <Pagination totalContainers={containers.length} containersPerPage={containersPerPage} paginate={paginate} />
            </div>
        </div>//container
    )
};

export default Main;