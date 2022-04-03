import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NonFoamingContainersDisplay from '../components/NonFoamingContainerDisplay';

const NonFoaming = (props) => {

    const {id} = useParams();
    const [containers, setContainers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/nonfoaming')
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
            <NonFoamingContainersDisplay containers = {containers}/>}
        </div>
    )
};

export default NonFoaming;