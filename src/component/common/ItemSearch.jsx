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
      } catch (err) {
        console.error('Error fetching item types:', err.message);
      }
    };
    fetchItemTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(''), timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !itemType) {
      showError('Please select all fields');
      return;
    }

    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const response = await ApiService.getAvailableItemsByDateAndType(
        formattedStartDate,
        formattedEndDate,
        itemType
      );

      if (response.status === 200) {
        const { itemList } = response.data;
        if (itemList.length === 0) {
          showError('Item not available for the selected date range and type.');
          return;
        }
        handleSearchResult(itemList);
      }
    } catch (error) {
      if (error.response) {
        showError(`Error: ${error.response.data.message}`);
      } else {
        showError('Network error or invalid API endpoint');
        console.error('Error details:', error);
      }
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
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
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
