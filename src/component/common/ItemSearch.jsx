import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const ItemSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [itemType, setItemType] = useState('');
  const [itemTypes, setItemTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItemTypes = async () => {
      try {
        const types = await ApiService.getItemTypes();
        setItemTypes(types);
      } catch (error) {
        console.error('Error fetching item types:', error.message);
      }
    };
    fetchItemTypes();
  }, []);

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch available items from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !itemType) {
      showError('Please select all fields');
      return false;
    }
    try {
      // Convert startDate to the desired format
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      // Call the API to fetch available items
      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, itemType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        if (response.itemList.length === 0) {
          showError('Item not currently available for this date range on the selected item type.');
          return
        }
        handleSearchResult(response.itemList);
        setError('');
      }
    } catch (error) {
      showError("Unknown error occurred: " + error.response.data.message);
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
          />
        </div>
        <div className="search-field">
          <label>Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
          />
        </div>

        <div className="search-field">
          <label>Item Type</label>
          <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
            <option disabled value="">
              Select Item Type
            </option>
            {itemTypes.map((itemType) => (
              <option key={itemType} value={itemType}>
                {itemType}
              </option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Item
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default ItemSearch;
