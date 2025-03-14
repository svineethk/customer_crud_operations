import './index.css'
import { Component } from 'react'

class ReadForm extends Component {
    state = {name: '',
        phoneNumber: '',
        address: '',
        id: null,
        borrowedMoney:'',
        borrowedType:'',
        typeOfRepayment:'',
        modeOfRepayment:'',
        installments:'',
        deadTime:'',
        errorMessage: '',}

    fetchCustomerData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`);
            
            if (response.ok) {
              const customerData = await response.json();
        
              if (customerData.length === 1) {
                const {name,phoneNumber,address,borrowedMoney,borrowedType,
                    typeOfRepayment,installments,modeOfRepayment,deadTime } = customerData[0];
                this.setState({ name,phoneNumber,address,borrowedMoney,borrowedType,
                    typeOfRepayment,installments,modeOfRepayment,deadTime, errorMessage: '', contactsArray: [] });
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
        }catch (error) {
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
            this.fetchCustomerData(id)
        }
    }


    reformatDate = (dateString) => {
        if(dateString === ""){
            return ""
        }
        const [year,month,date] = dateString.split('-')
        return `${date}/${month}/${year}`
    }

    render() {
        const {name,phoneNumber,address,borrowedMoney,borrowedType,
            typeOfRepayment,installments,modeOfRepayment,deadTime,id} = this.state;
        const dateByString = this.reformatDate(deadTime)
        return (
            <div className="first-container">
                <h1 className="header">Read Customer Details</h1>
                <form onSubmit={this.onSubmit}>
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
                    <div className="input-containers-read">
                        <label htmlFor="name" className="labels">Name</label>
                        <p className='input-text-name'>{name}</p>
                    </div>
                    <div className="input-containers-read">
                        <label  className="labels">Phone Number</label>
                        <p className='input-text-name'>{phoneNumber}</p>
                    </div>
                    <div className="input-containers-read">
                        <label  className="labels">Address</label>
                        <p className='input-text-name'>{address}</p>
                    </div>
                    <div className="input-containers-read">
                        <label  className="labels">Borrowed Money</label>
                        <p className='input-text-name'>{borrowedMoney}</p>
                    </div>
                    <div className="input-containers-read">
                        <label  className="labels">Borrowed Money Type</label>
                        <p className='input-text-name'>{borrowedType}</p>
                    </div>
                    <div className="input-containers-read">
                        <label  className="labels">Type of Repayment</label>
                        <p className='input-text-name'>{typeOfRepayment}</p>
                    </div>
                    {typeOfRepayment === "Partial"  && (
                        <>
                        <div className="input-containers-read">
                            <label  className="labels">Installments</label>
                            <p className='input-text-name'>{installments}</p>
                        </div>
                        <div className="input-containers-read">
                            <label  className="labels">Mode of Repayment</label>
                            <p className='input-text-name'>{modeOfRepayment}</p>
                        </div>
                        </>
                    )}
                    <div className="input-containers-read">
                        <label  className="labels">DeadLine</label>
                        <p className='input-text-name'>{dateByString}</p>
                    </div>
                    <button type="submit" className="submit-button">Get Customer</button>
                </form>
            </div>
        )
    }
}

export default ReadForm
