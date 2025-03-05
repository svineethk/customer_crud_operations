import './App.css';
import CustomerRead from './Components/CustomerRead'
import CustomerCreate from './Components/CustomerCreate'
import CustomerUpdate from './Components/CustomerUpdate'
import CustomerDelete from './Components/CustomerDelete'
import {Component} from 'react'

let customer = ['CREATE','READ','UPDATE','DELETE']
class App extends Component {
  state = {activeOperation:customer[0]}

  handleOperationClick = (eachOperation) => {
    this.setState({activeOperation:eachOperation})
  } 

  render(){
    const {activeOperation} = this.state

    let operationComponent = ''

    switch (activeOperation) {
      case 'CREATE':
        operationComponent = <CustomerCreate/>             
        break;
      case 'READ':
        operationComponent = <CustomerRead/>  
        break;
      case 'UPDATE':
        operationComponent = <CustomerUpdate/>
        break;
      case 'DELETE':
        operationComponent = <CustomerDelete/>
        break
      default:
        return null
    }


    return(
      <div className='app-container'>
        <h1 className='app-header'>Customer Information</h1>
        <div className='list-container'>
          {customer.map((eachOperation, index) => (<button className={`list-operation ${this.state.activeOperation === eachOperation ? 'active' : ''}`} key = {index} onClick={() => this.handleOperationClick(eachOperation)}>{eachOperation}</button>))}
        </div>
        <div className='operation-container'>
          {operationComponent}
        </div>
    </div>
    )
  }
}

export default App;
