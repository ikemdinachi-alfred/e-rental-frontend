import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditItemPage = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [itemDetails, setItemDetails] = useState({
        itemPhotoUrl: '',
        name: '',
        itemType: '',
        itemPrice: '',
        itemDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await ApiService.getItemById(itemId);
                console.log(response); // Log response for debugging
                setItemDetails({
                    itemPhotoUrl: response?.itemPhotoUrl || '',
                    name: response?.name || '',
                    itemType: response?.itemType || '',
                    itemPrice: response?.itemPrice || '',
                    itemDescription: response?.itemDescription || '',
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchItemDetails();
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', itemDetails.name);
            formData.append('itemType', itemDetails.itemType);
            formData.append('itemPrice', itemDetails.itemPrice);
            formData.append('itemDescription', itemDetails.itemDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateItem(itemId, formData);
            console.log(result)
            if (result.statusCode === 200) {
                setSuccess('Item updated successfully.');
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-items');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this item?')) {
            try {
                const result = await ApiService.deleteItem(itemId);
                if (result.statusCode === 200) {
                    setSuccess('Item deleted successfully.');
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-items');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="edit-room-container">
            <h2>Edit Item</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-room-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Item Preview" className="room-photo-preview" />
                    ) : (
                        itemDetails.itemPhotoUrl && (
                            <img src={itemDetails.itemPhotoUrl} alt="item" className="room-photo" />
                        )
                    )}
                    <input type="file" name="itemPhoto" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Item Type</label>
                    <input
                        type="text"
                        name="itemType"
                        value={itemDetails.itemType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Item Name</label>
                    <input
                        type="text"
                        name="name"
                        value={itemDetails.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Item Price</label>
                    <input
                        type="text"
                        name="itemPrice"
                        value={itemDetails.itemPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Item Description</label>
                    <textarea
                        name="itemDescription"
                        value={itemDetails.itemDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={handleUpdate}>Update Item</button>
                <button className="delete-button" onClick={handleDelete}>Delete Item</button>
            </div>
        </div>
    );
};

export default EditItemPage;
