import './index.css'
import { Component } from 'react'

class CustomerDelete extends Component {
    state = { id: '', name: '', email: '', address: '' }

    fetchCustomerData = async (event) => {
        event.preventDefault()
        const {id} = this.state
        
        
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}`); 
            if(response.ok){
                const customerData = await response.json();
                const {name,email,address} = customerData[0];
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

    deleteCustomer = async () => {
        const { id } = this.state
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}`,{
                method: 'DELETE',
            })
            const result = await response.json()
            console.log(result)
            if(result.message){
                alert(result.message);
                this.setState({id:'',name:'',email:"",address:""})
            }
        }catch(error){
            alert(error);
        }
    }

    onChangeId = (event) => {
        this.setState({ id: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { id } = this.state
        if (id) {
            this.fetchCustomerData(id)
        }
    }

    render() {
        const {id,name,email,address} = this.state
        return (
            <div className="container">
                <h1 className="header">Delete Customer Details</h1>
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
                            id="name"
                            className="input"
                            placeholder='Customer Name'
                            value={name}
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
                            value={email}
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
                            value={address}
                            disabled
                        />
                    </div>
                    <button type="submit" className="submit-button">Get Customer</button>
                </form>
                <button onClick={this.deleteCustomer} className="submit-buttons">Delete Customer</button>
            </div>
        )
    }
}

export default CustomerDelete
