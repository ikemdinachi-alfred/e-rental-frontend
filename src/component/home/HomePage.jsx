import React, { useState } from "react";
import ItemResult from "../common/ItemResult";
import ItemSearch from "../common/ItemSearch";




const HomePage = () => {

    const [itemSearchResults, setItemSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setItemSearchResults(results);
    };

    return (
        <div className="home">
            {/* HEADER / BANNER ROOM SECTION */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/abc.jpg" alt="E- Rentals" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="phegon-color">E-Rentals</span>
                        </h1><br />
                        <h3>Rent Enjoy sparkling clean Washing machine </h3>
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE ITEM SECTION */}
            <ItemSearch handleSearchResult={handleSearchResult} />
            <ItemResult itemSearchResults={itemSearchResults} />

            <h4><a className="view-rooms-home" href="/items">All Items</a></h4>

            <h2 className="home-services">Services at <span className="phegon-color">E- Rentals</span></h2>

            {/* SERVICES SECTION */}
            <section className="service-section"><div className="service-card">
                <img src="./assets/images/l1.png" alt="laundry equipment" />
                <div className="service-details">
                    <h3 className="service-title">On-Site Laundry Setup and Maintenance</h3>
                    <p className="service-description">Our team will handle everything, from the initial installation to routine check-ups, ensuring your machine runs smoothly and efficiently.</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="./assets/images/l2.png" alt="Dryer equipment" />
                    <div className="service-details">
                        <h3 className="service-title">Dryer Rental Services</h3>
                        <p className="service-description">Complete your laundry setup with our dryer rental options! Rent high-quality dryers along with our washing machines to enjoy a full, hassle-free laundry solution at home. Perfect for homes and businesses alike..</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/l3.png" alt="Parking" />
                    <div className="service-details">
                        <h3 className="service-title">Emergency Support Services</h3>
                        <p className="service-description">Our dedicated repair and support team is available for any unexpected issues with your machine. Get fast, reliable help to keep your laundry routine uninterrupted and stress-free.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/wifi.png" alt="WiFi" />
                    <div className="service-details">
                        <h3 className="service-title">Stay Connected</h3>
                        <p className="service-description">Stay connected Our flexible rental plans are ideal for events, construction sites, and temporary needs </p>
                    </div>
                </div>

            </section>
            {/* AVAILABLE ROOMS SECTION */}
            <section>

            </section>
    
        </div>
    );
}

export default HomePage;
