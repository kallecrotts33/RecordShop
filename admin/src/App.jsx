import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListRecords() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [selectedArtistId, setSelectedArtistId] = useState('');
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {

        // Load records
        axios.get(apiUrl + "/records")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        


    }, []);


    // Add a record
    const addRecord = () => {
        if (!newTitle.trim()) return; // Ignorera tom input

        axios
            .post(apiUrl + '/records',
                { record_title: newTitle },
                { price: newPrice },
                { description: newDescription },
                { image_src: newImage },
                { artist_id: selectedArtistId },
                { genre_id: selectedGenreId }
            )
            .then(() => {
                setNewTitle('');
                setNewPrice('');
                setNewDescription('');
                setNewImage('');
                setSelectedArtistId('');
                setSelectedGenreId('');
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    if (loading) return <div className="p-5">Laddar...</div>;
    if (error) return <div className="p-5 text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Records ({data.length})</h1>
            {/* Input for new record */}
            <div className="mb-3 d-flex form ">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="New Record Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    nullable={false}
                />
                <input
                    type="decimal"
                    className="form-control me-2"
                    placeholder="New Record Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    nullable={false}
                />
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="New Record Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    nullable={false}
                />
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="New Record Image source(s)"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    nullable={false}
                />
                <select
                    className="form-select me-2"
                    value={selectedArtistId}
                    onChange={(e) => setSelectedArtistId(e.target.value)}
                    required
                >
                    <option value="">Select Artist</option>

                    
                </select>

                <button className="btn btn-primary" onClick={addRecord}>
                    Add
                </button>
            </div>
            {/* List of records */}
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