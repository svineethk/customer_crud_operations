import './index.css'
import { Component } from "react";


class CustomerDeadLineOperation extends Component{
    state={customersData:[]}

    componentDidMount(){
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/allusers/`);
                if(response.ok){
                    const responseData = await response.json();
                    this.setState({customersData:responseData})
                }else{
                    this.setState({errorMessage:'Failed to fetch data from the server'})
                }
            }
            catch(error){
                this.setState({errorMessage:'Something went wrong, please try again later'})
            }
        }
        fetchCustomerData();
    }

    formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
    }


    render(){
        const {customersData} = this.state
        return(
            <div className="display-container">
                <div>
                    {customersData.map(eachData => (
                          <p key={eachData.id} className='running-text' >{eachData.name} has Borrowed Money {eachData.borrowedMoney} and the deadline is {this.formatDate(eachData.deadTime)}</p>
                    ))}
                </div>
            </div>
        )
    }
}

export default CustomerDeadLineOperation