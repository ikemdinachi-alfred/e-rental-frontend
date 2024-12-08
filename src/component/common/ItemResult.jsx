import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const ItemResult = ({ itemSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="room-results">
            {itemSearchResults && itemSearchResults.length > 0 && (
                <div className="room-list">
                    {itemSearchResults.map(item => (
                        <div key={item.id} className="room-list-item">
                            <img className='room-list-item-image' src={item.itemPhotoUrl} alt={item.itemType} />
                            <div className="room-details">
                                <h3>{item.itemType}</h3>
                                <p>Price: ${item.itemPrice} / Month</p>
                                <p>Description: {item.itemDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-room-button"
                                        onClick={() => navigate(`/admin/edit-item/${item.id}`)} // Navigate to edit item with item ID
                                    >
                                        Edit Item
                                    </button>
                                ) : (
                                    <button
                                    className="book-now-button"
                                    onClick={() => navigate(`/item-details-book/${item.id}`)} // Corrected route
                                  >
                                    View/Book Now
                                  </button>
                                  
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ItemResult;


