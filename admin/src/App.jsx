import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListRecords() {
    const [data, setData] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [showArtistModal, setShowArtistModal] = useState(false);
    const [showGenreModal, setShowGenreModal] = useState(false);

    //Records
    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [selectedArtistId, setSelectedArtistId] = useState('');
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [editId, setEditId] = useState(null);
    const [editRecordTitle, setEditRecordTitle] = useState('');
    const [editRecordPrice, setEditRecordPrice] = useState('');
    const [editRecordDescription, setEditRecordDescription] = useState('');
    const [editRecordGenre, setEditRecordGenre] = useState('');
    const [editRecordArtist, setEditRecordArtist] = useState('');
    const [editRecordImage, setEditRecordImage] = useState('');
    //Artists
    const [newArtistName, setNewArtistName] = useState('');
    const [editArtistName, setEditArtistName] = useState('');

    //Genres
    const [newGenreName, setNewGenreName] = useState('');
    const [editGenreName, setEditGenreName] = useState('');

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

        axios.post(apiUrl + '/records', {
            record_title: newTitle,
            price: parseFloat(newPrice),
            description: newDescription,
            image_src: newImage.split(',').map(img => img.trim()), // convert to array
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
    // Edit a record
    const startEditRecord = (item) => {
        setEditId(item.record_id);
        setEditRecordTitle(item.record_title);
        setEditRecordPrice(item.price);
        setEditRecordDescription(item.description);
        setEditRecordGenre(item.genre_id);
        setEditRecordArtist(item.artist_id);

        // Make sure image_src is an array
        const images = Array.isArray(item.image_src)
            ? item.image_src
            : item.image_src
            ? [item.image_src] // wrap string in array
            : [];

        setEditRecordImage(images.join(', ')); // convert to comma-separated string for input
        setShowRecordModal(true);
    };
    const saveEditRecord = (id) => {
        const payload = {
            record_title: editRecordTitle,
            price: parseFloat(editRecordPrice).toFixed(2),
            description: editRecordDescription,
            artist_id: parseInt(editRecordArtist),
            genre_id: parseInt(editRecordGenre),
            image_src: editRecordImage.split(',').map(img => img.trim())
        };
        axios
            .put(`${apiUrl}/records/${id}`, payload)
            .then(() => axios.get(apiUrl + "/records")) // refresh records
            .then((response) => {
                setData(response.data); // update UI
                setShowRecordModal(false); // close modal
                // Reset edit fields
                setEditId(null);
                setEditRecordTitle('');
                setEditRecordPrice('');
                setEditRecordDescription('');
                setEditRecordArtist('');
                setEditRecordGenre('');
                setEditRecordImage('');
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    };
    const deleteRecord = (id) => {
        axios
            .delete(apiUrl + '/records/' + id)
            .then(() => axios.get(apiUrl + "/records")) // refresh list
            .then((response) => {
                setData(response.data);
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
    // Edit an artist
    const startEditArtist = (item) => {
        setEditId(item.artist_id);
        setEditArtistName(item.artist_name);
        setShowArtistModal(true);
    };
    const saveEditArtist = (id) => {
        const payload = {
            artist_name: editArtistName,
        };
        axios
            .put(`${apiUrl}/artists/${id}`, payload)
            .then(() => axios.get(apiUrl + "/artists")) // refresh records
            .then((response) => {
                setArtists(response.data); // update UI
                setShowArtistModal(false); // close modal
                // Reset edit fields
                setEditId(null);
                setEditArtistName('');
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    };
    const deleteArtist = (id) => {
        axios
            .delete(apiUrl + '/artists/' + id)
            .then(() => axios.get(apiUrl + "/artists")) // refresh list
            .then((response) => {
                setArtists(response.data);
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
    // Edit a genre
    const startEditGenre = (item) => {
        setEditId(item.genre_id);
        setEditGenreName(item.genre_name);
        setShowGenreModal(true);
    };
    const saveEditGenre = (id) => {
        const payload = {
            genre_name: editGenreName,
        };
        axios
            .put(`${apiUrl}/genres/${id}`, payload)
            .then(() => axios.get(apiUrl + "/genres")) // refresh records
            .then((response) => {
                setGenres(response.data); // update UI
                setShowGenreModal(false); // close modal
                // Reset edit fields
                setEditId(null);
                setEditGenreName('');
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    };
    const deleteGenre = (id) => {
        axios
            .delete(apiUrl + '/genres/' + id)
            .then(() => axios.get(apiUrl + "/genres")) // refresh list
            .then((response) => {
                setGenres(response.data);
            })
            .catch((err) => setError(err.message));
    };





    if (loading) return <div className="p-5">Loading...</div>;
    if (error) return <div className="p-5 text-danger">Error: {error}</div>;

    return (
        
        <div className="container mt-5">
            <div>
                <h1 className="mb-4">Records ({data.length})</h1>
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
                        placeholder="New Image sources (comma-separated)"
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
                {/* List of records */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-info">
                            <tr>
                                <th>ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th className='text-end' scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.record_id}>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{item.record_id}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{item.record_title}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{item.Artist?.artist_name || '-'}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{item.Genre?.genre_name || '-'}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{parseFloat(item.price).toFixed(2)} €</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}title={item.description} >  {item.description}</td>
                                    <td className="text-start">
                                        <img
                                            className="img-fluid rounded-2"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover'
                                            }}
                                            src={`http://localhost:3000/images/${item.image_src[0]}.jpg`}
                                        />
                                    </td>
                                    <td className='d-flex flex-column align-items-end gap-2'>
                                        <button style={{ width: '100px' }} className="btn btn-info" onClick={() => startEditRecord(item)}>Edit</button>
                                        <button style={{ width: '100px' }} className="btn btn-danger" onClick={() => deleteRecord(item.record_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h1 className="mb-4">Artists ({artists.length})</h1>
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
                {/* List of artists*/}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-info">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th className='text-end'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map((item) => (
                                <tr key={item.artist_id}>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{item.artist_id}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >{item.artist_name}</td>
                                    <td className='d-flex flex-column align-items-end gap-2' >
                                        <button style={{ width: '100px' }} className="btn btn-info" onClick={() => startEditArtist(item)}>Edit</button>
                                        <button style={{ width: '100px' }} className="btn btn-danger" onClick={() => deleteArtist(item.artist_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h1 className="mb-4">Genres ({genres.length})</h1>
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
                {/* List of genres*/}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-info">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th className='text-end'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map((item) => (
                                <tr key={item.genre_id}>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.genre_id}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.genre_name}</td>
                                    <td className='d-flex flex-column align-items-end gap-2'>
                                        <button style={{ width: '100px' }} className="btn btn-info" onClick={() => startEditGenre(item)}>Edit</button>
                                        <button style={{ width: '100px' }} className="btn btn-danger" onClick={() => deleteGenre(item.genre_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Record Modal */}
            <div className={`modal ${showRecordModal ? 'd-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Record</h5>
                            <button type="button" className="btn-close" onClick={() => setShowRecordModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Title</label>
                                <input type="text" className="form-control" value={editRecordTitle} onChange={(e) => setEditRecordTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Price</label>
                                <input type="number" className="form-control" value={editRecordPrice} onChange={(e) => setEditRecordPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <input type="text" className="form-control" value={editRecordDescription} onChange={(e) => setEditRecordDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Artist</label>
                                <select className="form-select" value={editRecordArtist} onChange={(e) => setEditRecordArtist(e.target.value)}>
                                    <option value="">Select Artist</option>
                                    {artists.map((artist) => (
                                        <option key={artist.artist_id} value={artist.artist_id}>{artist.artist_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Genre</label>
                                <select className="form-select" value={editRecordGenre} onChange={(e) => setEditRecordGenre(e.target.value)}>
                                    <option value="">Select Genre</option>
                                    {genres.map((genre) => (
                                        <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Image Source (comma separated) </label>
                                <input type="text" className="form-control" value={editRecordImage} onChange={(e) => setEditRecordImage(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowRecordModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => { saveEditRecord(editId); setShowRecordModal(false); }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Edit Artist Modal */}
            <div className={`modal ${showArtistModal ? 'd-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Artist</h5>
                            <button type="button" className="btn-close" onClick={() => setShowArtistModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control" value={editArtistName} onChange={(e) => setEditArtistName(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowArtistModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => { saveEditArtist(editId); setShowArtistModal(false); }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Genre Modal */}
            <div className={`modal ${showGenreModal ? 'd-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Genre</h5>
                            <button type="button" className="btn-close" onClick={() => setShowGenreModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control" value={editGenreName} onChange={(e) => setEditGenreName(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowGenreModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => { saveEditGenre(editId); setShowGenreModal(false); }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>




        </div>






    );
}

export default ListRecords;