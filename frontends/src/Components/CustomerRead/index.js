import './index.css'
import { Component } from 'react'

class ReadForm extends Component {
    state = { id: '', name: '', email: '', address: '',contactsArray:[],errorMessage:'' }

    fetchCustomerData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/contacts/?id=${id}`);
            
            if (response.ok) {
              const customerData = await response.json();
        
              // If exactly one customer is found
              if (customerData.length === 1) {
                const { name, email, address } = customerData[0];
                this.setState({ name, email, address, errorMessage: '', contactsArray: [] });
              }
              else if (customerData.length > 1) {
                this.setState({ contactsArray: customerData, errorMessage: '' });
              }
              else {
                this.setState({ errorMessage: 'No customer found with this ID', contactsArray: [] });
              }
            } else {
              this.setState({ errorMessage: 'Failed to fetch data from the server', contactsArray: [] });
            }
          } catch (error) {
            this.setState({ errorMessage: 'Something went wrong, please try again later', contactsArray: [] });
          }
        };




    onChangeId = (event) => {
        this.setState({ id: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { id } = this.state
        if (id) {
            this.fetchCustomerData(id) // Fetch data for the given ID
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="header">Read Customer Details</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="input-container">
                        <label htmlFor="id" className="labels">ID</label>
                        <input
                            type="text"
                            onChange={this.onChangeId}
                            id="id"
                            className="input"
                            placeholder='Enter the customer ID'
                            value={this.state.id}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="name" className="labels">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="input"
                            placeholder='Customer Name'
                            value={this.state.name}
                            disabled
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email" className="labels">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input"
                            placeholder='Customer Email'
                            value={this.state.email}
                            disabled
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="address" className="labels">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="input"
                            placeholder='Customer Address'
                            value={this.state.address}
                            disabled
                        />
                    </div>
                    <button type="submit" className="submit-button">Get Customer</button>
                </form>
            </div>
        )
    }
}

export default ReadForm
