import { Component } from "react";
import CustomerRead from '../CustomerRead'
import CustomerCreate from '../CustomerCreate'  
import CustomerUpdate from '../CustomerUpdate'
import CustomerDelete from '../CustomerDelete'


let customer = ['CREATE','READ','UPDATE','DELETE']

class CustmerRandomOperation extends Component {
    state = {activeOperation:customer[0]}

    handleOperationClick = (eachOperation) => {
        this.setState({activeOperation:eachOperation})
      } 


    render(){
       const {activeOperation} = this.state  

        let operationComponent = '';

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
            <>
                <div className='list-container'>
                    {customer.map((eachOperation, index) => (<button className={`list-operation ${this.state.activeOperation === eachOperation ? 'active' : ''}`} key = {index} onClick={() => this.handleOperationClick(eachOperation)}>{eachOperation}</button>))}
                </div>
                <div className='operation-container'>
                    {operationComponent}
                </div>
            </>
        )
    }
}


export default CustmerRandomOperation