// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ApiService from '../../service/ApiService'; 
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const ItemDetailsPage = () => {
//   const navigate = useNavigate(); // Access the navigate function to navigate
//   const { itemId } = useParams(); // Get item ID from URL parameters
//   const [itemDetails, setItemDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Track any errors
//   const [checkInDate, setCheckInDate] = useState(null); // State variable for check-in date
//   const [checkOutDate, setCheckOutDate] = useState(null); // State variable for check-out date
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [quantity, setQuantity] = useState(1); // State variable for quantity of item
//   const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
//   const [userId, setUserId] = useState(''); // Set user id
//   const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
//   const [confirmationCode, setConfirmationCode] = useState(''); // State variable for booking confirmation code
//   const [errorMessage, setErrorMessage] = useState(''); // State variable for error message

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true); // Set loading state to true
//         const response = await ApiService.getItemById(itemId);
//         setItemDetails(response.item);
//         const userProfile = await ApiService.getUserProfile();
//         setUserId(userProfile.user.id);
//       } catch (error) {
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setIsLoading(false); // Set loading state to false after fetching or error
//       }
//     };
//     fetchData();
//   }, [itemId]); // Re-run effect when itemId changes

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await ApiService.getItemById(itemId);
//       setItemDetails(response.item);
//       const userProfile = await ApiService.getUserProfile();
//       setUserId(userProfile.user.id);
//     } catch (error) {
//       setError(error.response?.data?.message || error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchData();
// }, [itemId]);

//   const handleConfirmBooking = async () => {
//     // Check if check-in and check-out dates are selected
//     if (!checkInDate || !checkOutDate) {
//       setErrorMessage('Please select check-in and check-out dates.');
//       setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
//       return;
//     }
   


//     if (isNaN(quantity) || quantity < 1) {
//       setErrorMessage('Quantity must be at least 1.');
//       setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
//       return;
//     }

//     // Calculate total number of days (one month)
//     const oneMonth = 30 * 24 * 60 * 60 * 1000; //days * hours * minutes * seconds * milliseconds
//     const startDate = new Date(checkInDate);
//     const endDate = new Date(checkOutDate);
//     const totalMonths = Math.round(Math.abs((endDate - startDate) / oneMonth)) + 1;

   
//     // Calculate total price
//     const itemPricePerMonth = itemDetails.itemPrice;
//     const totalPrice = itemPricePerMonth * totalMonths;

//     setTotalPrice(totalPrice);
    
//   };

//   const acceptBooking = async () => {
//     try {

//       // Ensure checkInDate and checkOutDate are Date objects
//       const startDate = new Date(checkInDate);
//       const endDate = new Date(checkOutDate);

//       // Log the original dates for debugging
//       console.log("Original Check-in Date:", startDate);
//       console.log("Original Check-out Date:", endDate);

//       // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
//       const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
//       const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];


//       // Log the original dates for debugging
//       console.log("Formated Check-in Date:", formattedCheckInDate);
//       console.log("Formated Check-out Date:", formattedCheckOutDate);

//       // Create booking object
//       const booking = {
//         checkInDate: formattedCheckInDate,
//         checkOutDate: formattedCheckOutDate,
//         quantity: quantity,
        
//       };
//       console.log(booking)
//       console.log(checkOutDate)

//       // Make booking
//       const response = await ApiService.bookItem(itemId, userId, booking);
//       if (response.statusCode === 200) {
//         setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
//         setShowMessage(true); // Show message
//         // Hide message and navigate to homepage after 5 seconds
//         setTimeout(() => {
//           setShowMessage(false);
//           navigate('/items'); // Navigate to items
//         }, 10000);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
//     }
//   };

//   if (isLoading) {
//     return <p className='room-detail-loading'>Loading Item details...</p>;
//   }

//   if (error) {
//     return <p className='room-detail-loading'>{error}</p>;
//   }

//   if (!itemDetails) {
//     return <p className='room-detail-loading'>Item not found.</p>;
//   }

//   const { itemType, itemPrice, itemPhotoUrl, description, bookings } = itemDetails;

//   return (
//     <div className="room-details-booking">
//       {showMessage && (
//         <p className="booking-success-message">
//           Booking successful! Confirmation code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
//         </p>
//       )}
//       {errorMessage && (
//         <p className="error-message">
//           {errorMessage}
//         </p>
//       )}
//       <h2>Item Details</h2>
//       <br />
//       <img src={itemPhotoUrl} alt={itemType} className="room-details-image" />
//       <div className="room-details-info">
//         <h3>{itemType}</h3>
//         <p>Price: ${itemPrice} / night</p>
//         <p>{description}</p>
//       </div>
//       {bookings && bookings.length > 0 && (
//         <div>
//           <h3>Existing Booking Details</h3>
//           <ul className="booking-list">
//             {bookings.map((booking, index) => (
//               <li key={booking.id} className="booking-item">
//                 <span className="booking-number">Booking {index + 1} </span>
//                 <span className="booking-text">Check-in: {booking.checkInDate} </span>
//                 <span className="booking-text">Out: {booking.checkOutDate}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <div className="booking-info">
//         <button className="book-now-button" onClick={() => setShowDatePicker(true)}>Book Now</button>
//         <button className="go-back-button" onClick={() => setShowDatePicker(false)}>Go Back</button>
//         {showDatePicker && (
//           <div className="date-picker-container">
//             <DatePicker
//               className="detail-search-field"
//               selected={checkInDate}
//               onChange={(date) => setCheckInDate(date)}
//               selectsStart
//               startDate={checkInDate}
//               endDate={checkOutDate}
//               placeholderText="Check-in Date"
//               dateFormat="dd/MM/yyyy"
//               // dateFormat="yyyy-MM-dd"
//             />
//             <DatePicker
//               className="detail-search-field"
//               selected={checkOutDate}
//               onChange={(date) => setCheckOutDate(date)}
//               selectsEnd
//               startDate={checkInDate}
//               endDate={checkOutDate}
//               minDate={checkInDate}
//               placeholderText="Check-out Date"
//               // dateFormat="yyyy-MM-dd"
//               dateFormat="dd/MM/yyyy"
//             />

//             <div className='guest-container'>
//               <div className="guest-div">
//                 <label>Quantity:</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) => setQuantity(parseInt(e.target.value))}
//                 />
//               </div>
//               {/* <div className="guest-div">
//                 <label>Children:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={numChildren}
//                   onChange={(e) => setNumChildren(parseInt(e.target.value))}
//                 />
//               </div> */}
//               <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
//             </div>
//           </div>
//         )}
//         {totalPrice > 0 && (
//           <div className="total-price">
//             <p>Total Price: ${totalPrice}</p>
//             {/* <p>Total Guests: {totalGuests}</p> */}
//             <button onClick={acceptBooking} className="accept-booking">Accept Booking</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemDetailsPage;


//new update

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ItemDetailsPage = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getItemById(itemId);
        setItemDetails(response.item);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (isNaN(quantity) || quantity < 1) {
      setErrorMessage('Quantity must be at least 1.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalMonths = Math.ceil((endDate - startDate) / oneMonth);

    const itemPricePerMonth = itemDetails.itemPrice;
    const totalPrice = itemPricePerMonth * totalMonths * quantity;

    setTotalPrice(totalPrice);
  };

  const acceptBooking = async () => {
    try {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      const formattedCheckInDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        quantity,
      };

      const response = await ApiService.bookItem(itemId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/items');
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) return <p className="room-detail-loading">Loading Item details...</p>;
  if (error) return <p className="room-detail-loading">{error}</p>;
  if (!itemDetails) return <p className="room-detail-loading">Item not found.</p>;

  const { itemType, itemPrice, itemPhotoUrl, description, bookings } = itemDetails;

  return (
    <div className="room-details-booking">
      {showMessage && (
        <p className="booking-success-message">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
        </p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>Item Details</h2>
      <img src={itemPhotoUrl} alt={itemType} className="room-details-image" />
      <div className="room-details-info">
        <h3>{itemType}</h3>
        <p>Price: ${itemPrice} / month</p>
        <p>{description}</p>
      </div>
      {bookings?.length > 0 && (
        <div>
          <h3>Existing Booking Details</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <span className="booking-number">Booking {index + 1} </span>
                <span className="booking-text">Check-in: {booking.checkInDate}</span>
                <span className="booking-text">Out: {booking.checkOutDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="booking-info">
        <button className="book-now-button" onClick={() => setShowDatePicker(true)}>Book Now</button>
        {showDatePicker && (
          <div className="date-picker-container">
            <DatePicker
              className="detail-search-field"
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              className="detail-search-field"
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
              dateFormat="dd/MM/yyyy"
            />
            <div className="guest-container">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="total-price">
            <p>Total Price: ${totalPrice}</p>
            <button onClick={acceptBooking} className="accept-booking">Accept Booking</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsPage;

