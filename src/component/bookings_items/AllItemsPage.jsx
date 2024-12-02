import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import ItemSearch from '../common/ItemSearch';
import ItemResult from '../common/ItemResult';

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ApiService.getAllItems();
        const allItems = response?.itemList || []; // Fallback to empty array
        setItems(allItems);
        setFilteredItems(allItems);
      } catch (error) {
        console.error('Error fetching Items:', error.message);
      }
    };

    const fetchItemTypes = async () => {
      try {
        const types = await ApiService.getItemTypes();
        setItemTypes(types || []); // Fallback to empty array
      } catch (error) {
        console.error('Error fetching Item types:', error.message);
      }
    };

    fetchItems();
    fetchItemTypes();
  }, []);

  const handleSearchResult = (results) => {
    setItems(results || []);
    setFilteredItems(results || []);
  };

  const handleItemTypeChange = (e) => {
    setSelectedItemType(e.target.value);
    filterItems(e.target.value);
  };

  const filterItems = (type) => {
    if (type === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.itemType === type);
      setFilteredItems(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="all-rooms">
      <h2>All Items</h2>
      <div className="all-room-filter-div">
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
        totalItems={filteredItems?.length || 0}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AllItemsPage;
