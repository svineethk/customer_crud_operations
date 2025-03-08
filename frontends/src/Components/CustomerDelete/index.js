import './index.css'
import { Component } from 'react'

class DeleteForm extends Component {
    state = { id: '', name: '', email: '', address: '' }

    fetchCustomerData = (id) => {
        // Simulate an API call to fetch customer data by id
        const customerData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            address: '123 Main St',
        }
        // Simulate setting fetched data
        this.setState({ name: customerData.name, email: customerData.email, address: customerData.address })
    }

    deleteCustomer = () => {
        // Handle deleting the customer data here (e.g., send a DELETE request to a server)
        const { id } = this.state
        console.log('Deleting customer:', { id })
        // Simulate a successful deletion
        alert('Customer deleted successfully!')
    }

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
                <h1 className="header">Delete Customer Details</h1>
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
                <button onClick={this.deleteCustomer} className="submit-button">Delete Customer</button>
            </div>
        )
    }
}

export default DeleteForm
