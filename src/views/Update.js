import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";

const Update = (props) => {

    const {id, url} = useParams();
    const [status, setStatus] = useState("");
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/status/${id}`)
            .then(res => {
                setStatus(res.data.status);
            })
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/status/${id}/edit`, {
            status
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        history.push('/');
    };

    return (
        <div className="container-sm mt-3 mb-5">
            <div className="text-end mb-3">
                <Link to = {'/'}>Back to Main Page</Link>
            </div>
            <h1>Update Container Status</h1>
            <form onSubmit={Update}>
                <div className="form-group mt-3">
                    <label>Please update to either foaming or not foaming!</label>
                    <input type="text" className="form-control mb-3" onChange={e => setStatus(e.target.value)} value={status}/>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-lg btn btn-info">Update Status?</button>
                </div>
            </form>
        </div>//container
    )

};

export default Update;