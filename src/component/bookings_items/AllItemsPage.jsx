import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import ItemSearch from '../common/ItemSearch';
import ItemResult from '../common/ItemResult';

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Always initialize as an array
  const [itemTypes, setItemTypes] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ApiService.getAllItems();
        console.log('Fetched items:', response); // Debug
        const allItems = Array.isArray(response) ? response : []; // Ensure array
        setItems(allItems);
        setFilteredItems(allItems);
      } catch (error) {
        console.error('Error fetching items:', error.message);
        setItems([]); // Fallback to empty array
        setFilteredItems([]); // Fallback to empty array
      }
    };

    const fetchItemTypes = async () => {
      try {
        const types = await ApiService.getItemTypes();
        console.log('Fetched item types:', types); // Debug
        setItemTypes(Array.isArray(types) ? types : []); // Ensure array
      } catch (error) {
        console.error('Error fetching item types:', error.message);
        setItemTypes([]); // Fallback to empty array
      }
    };

    fetchItems();
    fetchItemTypes();
  }, []);

  const handleSearchResult = (results) => {
    setFilteredItems(Array.isArray(results) ? results : []); // Ensure array
  };

  const handleItemTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedItemType(selectedType);
    filterItems(selectedType);
  };

  const filterItems = (type) => {
    if (type === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.itemType === type);
      setFilteredItems(filtered);
    }
    setCurrentPage(1); // Reset pagination
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredItems)
    ? filteredItems.slice(indexOfFirstItem, indexOfLastItem)
    : []; // Safeguard against non-array

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="all-items">
      <h2>All Items</h2>
      <div className="all-items-filter-div">
        <label>Filter by Item Type:</label>
        <select value={selectedItemType} onChange={handleItemTypeChange}>
          <option value="">All</option>
          {itemTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <ItemSearch handleSearchResult={handleSearchResult} />
      <ItemResult itemSearchResults={currentItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AllItemsPage;
