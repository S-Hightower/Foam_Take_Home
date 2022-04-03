import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FoamingContainersDisplay from '../components/FoamingContainerDisplay';

const Foaming = (props) => {

    const {id} = useParams();
    const [containers, setContainers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/foaming')
            .then(res => {
                setContainers(res.data);
                setLoaded(true);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    return(
        <div>
            {loaded && 
            <FoamingContainersDisplay containers = {containers}/>}
        </div>
    )
};

export default Foaming;