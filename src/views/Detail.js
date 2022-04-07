import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

const Detail = (props) => {

    const [container, setContainer] = useState("");
    const {id, url} = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/status/${id}`)
            .then(res => {
                setContainer(res.data);
                console.log(res.data.container)})
            .catch(error => console.log(error));
    }, [id]);

    return(
        container.error ?
        <h1>{container.error}</h1> :
        <div className="container-sm mt-3 mb-5">
            <div className="text-end mb-3">
                <Link to = {'/'}>Back to Main Page</Link>
            </div>
            <table className='table table-striped table-bordered border-success'>
                <tbody>
                    <tr>
                        <td>
                            <img src={container.url} width="550" height="500" alt='' />
                        </td>
                        <td>
                            <p>Status: {container.status} </p>
                            <Link to={`/status/` + container._id + `/edit`}>
                                <p>Update status?</p>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>//container
    );
};

export default Detail;