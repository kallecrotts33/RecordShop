import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListRecords() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;

        axios
            .get(apiUrl + "/records")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

    }, []);

    if (loading) return <div className="p-5">Laddar...</div>;
    if (error) return <div className="p-5 text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Records ({data.length})</h1>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-info">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.record_id}>
                                <td>{item.record_title}</td>
                                <td>{item.Artist?.artist_name || '-'}</td>
                                <td>{item.Genre?.genre_name || '-'}</td>
                                <td>{item.price} €</td>
                                <td>{item.description}</td>
                                <td className="text-start">
                                    <img
                                        className="img-fluid rounded-2"
                                        style={{ maxWidth: '100px' }}
                                        src={`http://localhost:3000/${item.image_src}`}
                                        alt={item.record_title}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ListRecords;