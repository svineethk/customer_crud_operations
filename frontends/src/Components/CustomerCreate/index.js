import './index.css';
import { Component } from 'react';

const paymentType = ['In Cash','UPI Payment', 'Netbanking']
const modeOfRepaymentType = ['Day', 'Week', 'Month']
const repayTypeArray = ['Lumpsum', 'Partial']  

class Customer extends Component {
  state = {
    name: '',
    phoneNumber: '',
    address: '',
    userId: null,
    borrowedMoney:'',
    borrowedType:paymentType[0],
    typeOfRepayment:repayTypeArray[0],
    modeOfRepayment:modeOfRepaymentType[0],
    installments:0,
    deadTime:'',
    successMessage: '',
    errorMessage: '',
  };


  
  submitForm = (event) => {
    event.preventDefault();
    const { name, phoneNumber, address,borrowedMoney,borrowedType,typeOfRepayment,modeOfRepayment,installments,deadTime  } = this.state;
    this.updateContact({ name, phoneNumber, address,borrowedMoney,borrowedType,typeOfRepayment,modeOfRepayment,installments,deadTime });
  };

  updateContact = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

      if (result.message) {
        this.setState({ successMessage: result.message, errorMessage: '',name:'',phoneNumber:'',address:'',borrowedMoney:'',borrowedType:'',typeOfRepayment:'',modeOfRepayment:'',installments:'',deadTime:'',userId:result.contactId });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, successMessage: '' });
    }
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  onChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  onChangeBorrowedMoney = (event) => {
    this.setState({borrowedMoney:event.target.value})
  }

  onChangeBorrowedType = (event) => {
    this.setState({borrowedType:event.target.value})
  }

  onChangeRepaymentType = (event) => {
    this.setState({typeOfRepayment:event.target.value})
  }

  onChangeRePaymentMode = (event) => {
    this.setState({modeOfRepayment:event.target.value})
  }

  onChangeInstallment = (event) => {
    this.setState({installments:event.target.value})
  }

  onChangeDeadline = (event) => {
    this.setState({deadTime:event.target.value})
  }

  render() {
    const {name,phoneNumber,address,borrowedMoney,borrowedType,
      typeOfRepayment,installments,modeOfRepayment,deadTime,userId,successMessage,errorMessage} = this.state;
    return (
      <div className="first-container">
        <h1 className="header">Enter the User Details</h1>
        <form onSubmit={this.submitForm} className='form-container'>
          <div className="input-containers">
            <label htmlFor="name" className="labels">
              Name
            </label>
            <input
              type="text"
              onChange={this.onChangeName}
              id="name"
              className="input-name"
              placeholder="Enter the name"
              value={name}
              required
            />
          </div>
          <div className="input-containers">
            <label htmlFor="phonenumber" className="labels">
              Phone Number
            </label>
            <input
              type="number"
              onChange={this.onChangePhoneNumber}
              id="phonenumber"
              className="input-name"
              placeholder="Enter the Phone Number"
              value ={phoneNumber}
              required
            />
          </div>
          <div className="input-containers">
            <label htmlFor="address" className="labels">
              Address
            </label>
            <input
              type="text"
              onChange={this.onChangeAddress}
              id="address"
              className="input-name"
              placeholder="Enter the Address"
              value={address}
            />
          </div>
          <div className="input-containers">
            <label htmlFor="borrowedMoney" className="labels">
              Borrowed Money
            </label>
            <input
              type="number"
              onChange={this.onChangeBorrowedMoney}
              id="borrowedMoney"
              className="input-name"
              placeholder="Enter the Lending Money"
              value={borrowedMoney}
            />
          </div>
          <div className="input-containers">
            <label className="labels">Borrowed Type</label>
            {paymentType.map((eachType,index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="borrowedType"
                  onChange={this.onChangeBorrowedType} 
                  checked={borrowedType === eachType}
                  className="input"
                  value={eachType}
                />
                <label className="labels-name">{eachType}</label>
              </div>
            ))}
          </div>
          <div className="input-containers">
            <label className="labels">Repayment Type</label>
            {repayTypeArray.map((eachType,index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="repaymentMode"
                  onChange={this.onChangeRepaymentType} 
                  checked={typeOfRepayment === eachType}
                  className="input"
                  value={eachType}
                />
                <label className='labels-name'>{eachType}</label>
              </div>
            ))}
          </div>
          <div>
            {typeOfRepayment === "Partial" && (
              <>
              <div className='input-containers'>
              <label className='labels'>No of Installment</label>
              <input type="number" name="Installment" className="input-name" onChange={this.onChangeInstallment} value={installments}/>
              <br/>
              </div>
              <div className='input-containers'>
              <label className='labels'>Mode of Payment</label>
              {modeOfRepaymentType.map((eachMode) => (
                <>
                  <input type = "radio" className='input' onChange={this.onChangeRePaymentMode} checked={modeOfRepayment === eachMode} value={eachMode}/>
                  <label className='labels-name'>{eachMode}</label>
                </>
              ))}
              </div>
              </>
            )}
          </div>
          <div className='input-containers'>
            <label className='labels'>Deadline Date</label>
            <input type="date" className='input-name' onChange={this.onChangeDeadline} value={deadTime}></input>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {this.state.successMessage && (
          <p className="success-message">{`${successMessage} and the New Contact Id is ${userId}`}</p>
        )}
        {this.state.errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
      </div>
    );
  }
}

export default Customer;
