import './App.css';
import {Component} from 'react'
import CustomerRandomOperation from './Components/CustomerRandomOperation'
import CustomerAllOperation from './Components/CustomerAllOperation'

let customerOperations = ['AllUser','RandomUser']


class App extends Component {
  state = {isRandomOperation:false}


  onChangeOperation = operation => {
    this.setState({isRandomOperation: operation === "RandomUser"})
  }

  render(){
    const {isRandomOperation} = this.state
    return(
      <div className='app-container'>
        <h1 className='app-header'>Lending User Information</h1>
        <ul className='list'>
            {customerOperations.map(operation => (
                <li key = {operation} className='operation-list'>
                  <div className='list-containers'>
                  <input
                  type="radio"
                  name="customerOperation"
                  value={operation}
                  checked={isRandomOperation ? operation === 'RandomUser' : operation === 'AllUser'}
                  onChange={() => this.onChangeOperation(operation)}
                  />
                  <p className='text-header'>{operation}</p>
                  </div>
                </li>
            ))}
          </ul>
        {isRandomOperation ? <CustomerRandomOperation/> : <CustomerAllOperation/>}
      </div>
    )
  }
}

export default App;

