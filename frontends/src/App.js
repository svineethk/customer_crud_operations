import './App.css';
import {Component} from 'react'
import CustomerRandomOperation from './Components/CustomerRandomOperation'
import CustomerAllOperation from './Components/CustomerAllOperation'
import CustomerDeadLineOperation from './Components/CustomerDeadLineOperation';

let customerOperations = ['AllUser','RandomUser','DeadLines']


class App extends Component {
  state = {isCurrentOperation:customerOperations[0]}


  onChangeOperation = operation => {
    this.setState({isCurrentOperation: operation})
  }

  render(){
    const {isCurrentOperation} = this.state
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
                  checked={isCurrentOperation === operation }
                  onChange={() => this.onChangeOperation(operation)}
                  />
                  <p className='text-header'>{operation}</p>
                  </div>
                </li>
            ))}
          </ul>
        {isCurrentOperation === 'AllUser' && <CustomerAllOperation />}
        {isCurrentOperation === 'RandomUser' && <CustomerRandomOperation />}
        {isCurrentOperation === 'DeadLines' && <CustomerDeadLineOperation />}
      </div>
    )
  }
}

export default App;

