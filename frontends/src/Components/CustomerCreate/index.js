import './index.css'
import {Component} from 'react'

class Customer extends Component{
    state={name:'',email:'',address:''}
    


    submitForm = () => {
        const {name,email,address} = this.state
    }

    onChangeName = (event) => {
        this.setState({name:event.target.value})
    }

    onChangeEmail = (event) => {
        this.setState({email:event.target.value})
    }

    onChangeAddress = (event) => {
        this.setState({address:event.target.value}) 
    }


    render(){
        return(
            <div className = "container">
                <h1 className="header">Enter the Customer Details</h1>
                <form onSubmit={this.submitForm}>
                <div className="input-container">
                    <label htmlFor="name" className="labels">Name</label>
                    <input type="text" onChange={this.onChangeName} id="name" className="input" placeholder='Enter the name' required/>
                </div>
                <div className='input-container'>
                    <label htmlFor="email" className='labels'>Email</label>
                    <input type="email" onChange={this.onChangeEmail} id="email" className='input' placeholder='Enter the Email' required/>
                </div>
                <div  className='input-container'>
                    <label htmlFor="address" className="labels">Address</label>
                    <input type="text" onChange={this.onChangeAddress} id="address" className='input' placeholder='Enter the Address'/>
                </div>
                    <button type="submit" className='submit-button'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Customer