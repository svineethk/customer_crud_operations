import './index.css'
import { Component } from 'react'

class CustomerUpdate extends Component {
    state = { id: '', name: '', email: '', address: '' }

    fetchCustomerData = async (event) => {
        event.preventDefault()
        const {id} = this.state
        
        
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}`); 
            if(response.ok){
                const customerData = await response.json();
                const {name,email,address} = customerData[0];
                console.log(customerData)
                this.setState({name,email,address})
            }
            else {
                this.setState({ errorMessage: 'Failed to fetch data from the server'})
            }
        }   
        catch(error){
            this.setState({errorMessage: 'Something went wrong, please try again later'})
        }

        
    }

    updateCustomerData = async() => {
        const { id, name, email, address } = this.state
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name,email,address})
            })
            const result = await response.json();
            if(result.message){
                this.setState({id:'',name:'',email:'',address:''})
                alert(result.message);
            }
            console.log(result.error)
        }catch(error){
            console.log(error);
        }
        
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

    

    render() {
        const { id, name, email, address } = this.state
        return (
            <div className="container">
                <h1 className="header">Update Customer Details</h1>
                <form onSubmit={this.fetchCustomerData}>
                    <div className="input-container">
                        <label htmlFor="id" className="labels">ID</label>
                        <input
                            type="text"
                            onChange={this.onChangeId}
                            id="id"
                            className="input"
                            placeholder='Enter the customer ID'
                            value={id}
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
                            value={name}
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
                            value={email}
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
                            value={address}
                        />
                    </div>
                    <button type="submit" className="submit-button">Fetch Customer</button>
                </form>
                <button onClick={this.updateCustomerData} className="submit-buttons">Update Customer</button>
            </div>
        )
    }
}

export default CustomerUpdate
