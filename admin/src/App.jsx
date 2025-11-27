import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListRecords() {
    const [data, setData] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //Records
    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [selectedArtistId, setSelectedArtistId] = useState('');
    const [selectedGenreId, setSelectedGenreId] = useState('');
    //Artists
    const [newArtistName, setNewArtistName] = useState('');
    //Genres
    const [newGenreName, setNewGenreName] = useState('');
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
        // Load artists
        axios.get(apiUrl + "/artists")
            .then((response) => {
                setArtists(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
        // Load genres
        axios.get(apiUrl + "/genres")
            .then((response) => {
                setGenres(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });



    }, []);


    // Add a record
    const addRecord = () => {
        if (!newTitle.trim()) return;

        axios
            .post(apiUrl + '/records', {
                record_title: newTitle,
                price: parseFloat(newPrice),
                description: newDescription,
                image_src: newImage,
                artist_id: parseInt(selectedArtistId),
                genre_id: parseInt(selectedGenreId)
            })
            .then(() => axios.get(apiUrl + "/records")) // refresh list
            .then((response) => {
                setData(response.data);

                // Reset form
                setNewTitle('');
                setNewPrice('');
                setNewDescription('');
                setNewImage('');
                setSelectedArtistId('');
                setSelectedGenreId('');
            })
            .catch((err) => setError(err.message));
    };

    // Add an artist
    const addArtist = () => {
        if (!newArtistName.trim()) return;

        axios
            .post(apiUrl + '/artists', {
                artist_name: newArtistName
            })
            .then(() => axios.get(apiUrl + "/artists")) // refresh list
            .then((response) => {
                setArtists(response.data);

                // Reset form
                setNewArtistName('');
            })
            .catch((err) => setError(err.message));
    };

    // Add a genre
    const addGenre = () => {
        if (!newGenreName.trim()) return;

        axios
            .post(apiUrl + '/genres', {
                genre_name: newGenreName
            })
            .then(() => axios.get(apiUrl + "/genres")) // refresh list
            .then((response) => {
                setGenres(response.data);

                // Reset form
                setNewGenreName('');
            })
            .catch((err) => setError(err.message));
    };



    if (loading) return <div className="p-5">Laddar...</div>;
    if (error) return <div className="p-5 text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Records ({data.length})</h1>

            <div>
                <h3>Input New Record</h3>
                {/* Input for new record */}
                <div className="mb-3 d-flex form ">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="New Record Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                    />
                    <input
                        type="decimal"
                        className="form-control me-2"
                        placeholder="New Record Price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="New Record Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="New Record Image source(s)"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        required
                    />
                    <select
                        className="form-select me-2"
                        value={selectedArtistId}
                        onChange={(e) => setSelectedArtistId(e.target.value)}
                        required
                    >
                        <option value="">Select Artist</option>
                        {artists.map((artist) => (
                            <option key={artist.artist_id} value={artist.artist_id}>
                                {artist.artist_name}
                            </option>
                        ))}


                    </select>
                    <select
                        className="form-select me-2"
                        value={selectedGenreId}
                        onChange={(e) => setSelectedGenreId(e.target.value)}
                        required
                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.genre_id} value={genre.genre_id}>
                                {genre.genre_name}
                            </option>
                        ))}


                    </select>

                    <button className="btn btn-primary" onClick={addRecord}>
                        Add
                    </button>

                </div>
            </div>

            <div>
                <h3>Input New Artist</h3>
                {/* Input for new artist */}
                <div className="mb-3 d-flex form ">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="New Artist Name"
                        value={newArtistName}
                        onChange={(e) => setNewArtistName(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" onClick={addArtist}>
                        Add
                    </button>

                </div>
            </div>

            <div>
                <h3>Input New Genre</h3>
                {/* Input for new Genre */}
                <div className="mb-3 d-flex form ">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="New Genre Name"
                        value={newGenreName}
                        onChange={(e) => setNewGenreName(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" onClick={addGenre}>
                        Add
                    </button>

                </div>
            </div>

            <div>
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
        </div>




    );
}

export default ListRecords;