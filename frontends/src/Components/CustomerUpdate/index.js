import './index.css'
import { Component } from 'react'

class UpdateForm extends Component {
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

    updateCustomerData = () => {
        // Handle updating the customer data here (e.g., send a PUT request to a server)
        const { id, name, email, address } = this.state
        console.log('Updating customer:', { id, name, email, address })
        // Simulate a successful update
        alert('Customer updated successfully!')
    }

    onChangeId = (event) => {
        this.setState({ id: event.target.value })
    }

    onChangeName = (event) => {
        this.setState({ name: event.target.value })
    }

    onChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    onChangeAddress = (event) => {
        this.setState({ address: event.target.value })
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
                <h1 className="header">Update Customer Details</h1>
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
                            onChange={this.onChangeName}
                            id="name"
                            className="input"
                            placeholder='Customer Name'
                            value={this.state.name}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email" className="labels">Email</label>
                        <input
                            type="email"
                            onChange={this.onChangeEmail}
                            id="email"
                            className="input"
                            placeholder='Customer Email'
                            value={this.state.email}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="address" className="labels">Address</label>
                        <input
                            type="text"
                            onChange={this.onChangeAddress}
                            id="address"
                            className="input"
                            placeholder='Customer Address'
                            value={this.state.address}
                        />
                    </div>
                    <button type="submit" className="submit-button">Fetch Customer</button>
                </form>
                <button onClick={this.updateCustomerData} className="submit-button">Update Customer</button>
            </div>
        )
    }
}

export default UpdateForm
