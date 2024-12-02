import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import ItemResult from '../common/ItemResult';

const ManageItemPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ApiService.getAllItems();
        const allItems = response?.itemList || [];
        setItems(allItems);
        setFilteredItems(allItems);
      } catch (error) {
        console.error('Error fetching Items:', error.message);
      }
    };

    const fetchItemTypes = async () => {
      try {
        const types = await ApiService.getItemTypes();
        setItemTypes(types);
      } catch (error) {
        console.error('Error fetching item types:', error.message);
      }
    };

    fetchItems();
    fetchItemTypes();
  }, []);

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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-rooms'>
      <h2>All Items</h2>
      <div className='all-room-filter-div' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='filter-select-div'>
          <label>Filter by Item Type:</label>
          <select value={selectedItemType} onChange={handleItemTypeChange}>
            <option value="">All</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className='add-room-button' onClick={() => navigate('/admin/add-items')}>
            Add Item
          </button>
        </div>
      </div>

      <ItemResult itemSearchResult={currentItems} />

      <Pagination
        roomsPerPage={itemsPerPage}
        totalRooms={filteredItems.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ManageItemPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ApiService from '../../service/ApiService';
// import Pagination from '../common/Pagination';
// import ItemResult from '../common/ItemResult';

// const ManageItemPage = () => {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [itemTypes, setItemTypes] = useState([]);
//   const [selectedItemType, setSelectedItemType] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Removed unnecessary state usage
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await ApiService.getAllItems();
//         const allItems = response?.itemList || []; // Handle null or undefined values
//         setItems(allItems);
//         setFilteredItems(allItems);
//       } catch (error) {
//         console.error('Error fetching Items:', error.message);
//       }
//     };

//     const fetchItemTypes = async () => {
//       try {
//         const types = await ApiService.getItemTypes();
//         setItemTypes(types || []); // Handle null or undefined values
//       } catch (error) {
//         console.error('Error fetching item types:', error.message);
//       }
//     };

//     fetchItems();
//     fetchItemTypes();
//   }, []);

//   const handleItemTypeChange = (e) => {
//     const selectedType = e.target.value;
//     setSelectedItemType(selectedType);
//     filterItems(selectedType);
//   };

//   const filterItems = (type) => {
//     if (!type) {
//       setFilteredItems(items);
//     } else {
//       const filtered = items.filter((item) => item.itemType === type);
//       setFilteredItems(filtered);
//     }
//     setCurrentPage(1); // Reset to the first page after filtering
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="manage-items-container">
//       <h2>All Items</h2>
//       <div
//         className="filter-container"
//         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
//       >
//         <div className="filter-select">
//           <label htmlFor="itemType">Filter by Item Type:</label>
//           <select
//             id="itemType"
//             value={selectedItemType}
//             onChange={handleItemTypeChange}
//           >
//             <option value="">All</option>
//             {itemTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="add-item-button"
//           onClick={() => navigate('/admin/add-item')}
//         >
//           Add Item
//         </button>
//       </div>

//       {/* Render filtered items */}
//       <ItemResult itemSearchResult={currentItems} />

//       {/* Pagination */}
//       <Pagination
//         itemsPerPage={itemsPerPage}
//         totalItems={filteredItems.length}
//         currentPage={currentPage}
//         paginate={paginate}
//       />
//     </div>
//   );
// };

// export default ManageItemPage;

