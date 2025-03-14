import './index.css'
import { Component } from 'react'


const paymentType = ['In Cash','UPI Payment', 'Netbanking']
const modeOfRepaymentType = ['Day', 'Week', 'Month']
const repayTypeArray = ['Lumpsum', 'Partial'] 

class CustomerUpdate extends Component {
    state = { name: '',
        phoneNumber: '',
        address: '',
        id: null,
        borrowedMoney:'',
        borrowedType:'',
        typeOfRepayment:'',
        modeOfRepayment:'',
        installments:0,
        deadTime:'', }

    fetchCustomerData = async (event) => {
        event.preventDefault()
        const {id} = this.state
        
        
        try{
            const response = await fetch(`http://localhost:5000/users/${id}`); 
            if(response.ok){
                const customerData = await response.json();
                const {name,phoneNumber,address,borrowedMoney,borrowedType,
                    typeOfRepayment,installments,modeOfRepayment,deadTime,} = customerData[0];
                this.setState({name,phoneNumber,address,borrowedMoney,borrowedType,
                    typeOfRepayment,installments,modeOfRepayment,deadTime,})
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
        const {name,phoneNumber,address,borrowedMoney,borrowedType,
            typeOfRepayment,installments,modeOfRepayment,deadTime,id} = this.state
        try{
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name,phoneNumber,address,borrowedMoney,borrowedType,
                    typeOfRepayment,installments,modeOfRepayment,deadTime})
            })
            const result = await response.json();
            if(result.message){
                this.setState({successMessage: result.message, errorMessage: '',name:'',phoneNumber:'',address:'',borrowedMoney:'',borrowedType:'',typeOfRepayment:'',modeOfRepayment:'',installments:'',deadTime:''})
                alert(result.message);
            }
            console.log(result.error)
        }catch(error){
            console.log(error);
        }
        
    }


    onChangeId = event => {
        this.setState({id:event.target.value})
    }

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
            typeOfRepayment,installments,modeOfRepayment,deadTime,id} = this.state;
        return (
            <div className="first-container">
        <h1 className="header">Enter the Details to Update</h1>
        <form onSubmit={this.fetchCustomerData} className='form-container'>
            <div className="input-containers">
            <label htmlFor="id" className="labels">ID</label>
                <input
                    type="number"
                    onChange={this.onChangeId}
                    id="id"
                    className="input-name"
                    placeholder='Enter the customer ID'
                    value={id}
                    required
                />
            </div>
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
            Fetch Customer
          </button>
        </form>
        <button type='button' className='submit-button-update' onClick={this.updateCustomerData}>Update Customer</button>
      </div>
        )
    }
}

export default CustomerUpdate
