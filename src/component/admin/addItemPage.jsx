import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddItemPage = () => {
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
    const [itemTypes, setItemTypes] = useState([]);
    const [newItemType, setNewItemType] = useState(false);


    useEffect(() => {
        const fetchItemTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setItemTypes(types);
            } catch (error) {
                console.error('Error fetching Item types:', error.message);
            }
        };
        fetchItemTypes();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleItemTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewItemType(true);
            setItemDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewItemType(false);
            setItemDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
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


    const addItem = async () => {
        if (!itemDetails.name || !itemDetails.itemType || !itemDetails.itemPrice || !itemDetails.itemDescription) {
            setError('All item details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this Item?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('name', itemDetails.name)
            formData.append('itemType', itemDetails.itemType);
            formData.append('itemPrice', itemDetails.itemPrice);
            formData.append('itemDescription', itemDetails.itemDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addItem(formData);
            if (result.statusCode === 200) {
                setSuccess('Item Added successfully.');
                
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

    return (
        <div className="edit-room-container">
            <h2>Add New Item</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-room-form">
                <div className="form-group">
                    {preview && (
                        <img src={preview} alt="Item Preview" className="room-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="itemPhoto"
                        onChange={handleFileChange}
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
                    <label>Item Type</label>
                    <select value={itemDetails.itemType} onChange={handleItemTypeChange}>
                        <option value="">Select Item type</option>
                        {itemTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newItemType && (
                        <input
                            type="text"
                            name="itemType"
                            placeholder="Enter new Item type"
                            value={itemDetails.itemType}
                            onChange={handleChange}
                        />
                    )}
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
                <button className="update-button" onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
};

export default AddItemPage;
