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


    render(){
        return(
            <h1>Hello World</h1>
        )
    }
}

export default CustomerDeadLineOperation