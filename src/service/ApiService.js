import axios from "axios"

export default class ApiService {

    static BASE_URL = "https://docked-e-rental-project-1.onrender.com"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */


    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is the  to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This is the  to get user bookings by the user id */
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is to delete a user */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /**ITEMS */
    /* This  adds a new item to the database */
    static async addItem(formData) {
        const result = await axios.post(`${this.BASE_URL}/items/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /* This  gets all available items */
    static async getAllAvailableItems() {
        const result = await axios.get(`${this.BASE_URL}/items/all-available-item`)
        return result.data
    }


    /* This  gets all available by dates items from the database with a given date and a item type */
    static async getAvailableItemsByDateAndType(checkInDate, checkOutDate, itemType) {
        const result = await axios.get(
            `${this.BASE_URL}/items/available-items-by-date-and-type?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&itemType=${itemType}`
        )
        return result.data
    }

    /* This  gets all item types from thee database */
    static async getItemTypes() {
        const response = await axios.get(`${this.BASE_URL}/items/types`)
        return response.data
    }
    /* This  gets all items from the database */
    static async getAllItems() {
        const result = await axios.get(`${this.BASE_URL}/items/all`)
        return result.data
    }
    /* This function gets a item by the id */
    static async getItemById(itemId) {
        const result = await axios.get(`${this.BASE_URL}/items/item-by-id/${itemId}`)
        return result.data
    }

    /* This  deletes a item by the Id */
    static async deleteItem(itemId) {
        const result = await axios.delete(`${this.BASE_URL}/items/delete/${itemId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This updates a item */
    static async updateItem(itemId, formData) {
        const result = await axios.put(`${this.BASE_URL}/items/update/${itemId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }


    /**BOOKING */
    /* This  saves a new booking to the database */
    static async bookItem(itemId, userId, booking) {

        console.log("USER ID IS: " + userId)

        const response = await axios.post(`${this.BASE_URL}/bookings/book-item/${itemId}/${userId}`, booking, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This  gets all bookings from the database */
    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This  get booking by the confirmation code */
    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`)
        return result.data
    }

    /* This is the  to cancel user booking */
    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        })
        return result.data
    }


    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}
// export default new ApiService();