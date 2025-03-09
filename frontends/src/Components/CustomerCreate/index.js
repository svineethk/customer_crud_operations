import './index.css';
import { Component } from 'react';

class Customer extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    contactId: null,
    successMessage: '',
    errorMessage: '',
    id:null
  };

  submitForm = (event) => {
    event.preventDefault();
    const { name, email, address } = this.state;
    this.updateContact({ name, email, address });
  };

  updateContact = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

      if (result.message) {
        this.setState({ successMessage: result.message, errorMessage: '',name:'',email:'',address:'',id:result.contactId });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, successMessage: '' });
    }
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  render() {
    const {name,email,address,successMessage,errorMessage,id} = this.state;
    return (
      <div className="container">
        <h1 className="header">Enter the Customer Details</h1>
        <form onSubmit={this.submitForm}>
          <div className="input-container">
            <label htmlFor="name" className="labels">
              Name
            </label>
            <input
              type="text"
              onChange={this.onChangeName}
              id="name"
              className="input"
              placeholder="Enter the name"
              value={name}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email" className="labels">
              Email
            </label>
            <input
              type="email"
              onChange={this.onChangeEmail}
              id="email"
              className="input"
              placeholder="Enter the Email"
              value ={email}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="address" className="labels">
              Address
            </label>
            <input
              type="text"
              onChange={this.onChangeAddress}
              id="address"
              className="input"
              placeholder="Enter the Address"
              value={address}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {this.state.successMessage && (
          <p className="success-message">{`${successMessage} and the New Contact Id is ${id}`}</p>
        )}
        {this.state.errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
      </div>
    );
  }
}

export default Customer;
