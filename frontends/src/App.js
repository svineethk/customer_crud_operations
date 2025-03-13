import './App.css';
import {Component} from 'react'
import CustomerRandomOperation from './Components/CustomerRandomOperation'
import CustomerAllOperation from './Components/CustomerAllOperation'

let customerOperations = ['All Customers','RandomCustomers']


class App extends Component {
  state = {isRandomOperation:false}


  onChangeOperation = operation => {
    this.setState({isRandomOperation: operation === "RandomCustomers"})
  }

  render(){
    const {isRandomOperation} = this.state
    return(
      <div className='app-container'>
        <h1 className='app-header'>Customer Information</h1>
        <ul className='list'>
            {customerOperations.map(operation => (
              <li key = {operation} className='operation-list'>
              <input
                type="radio"
                name="customerOperation"
                value={operation}
                checked={isRandomOperation ? operation === 'RandomCustomers' : operation === 'All Customers'}
                onChange={() => this.onChangeOperation(operation)}
              />
                {operation}
            </li>
            ))}
          </ul>
        {isRandomOperation ? <CustomerRandomOperation/> : <CustomerAllOperation/>}
      </div>
    )
  }
}

export default App;

