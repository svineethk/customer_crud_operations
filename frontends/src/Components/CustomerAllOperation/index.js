
import {useState,useEffect} from 'react'
import './index.css'


const CustomerAllOperation = () => {
    const [customerData, setCustomerData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/allusers/`);
                if(response.ok){
                    const responseData = await response.json();
                    setCustomerData(responseData);
                }else{
                    setErrorMessage('Failed to fetch data from the server')
                }
            }
            catch(error){
                setErrorMessage('Something went wrong, please try again later')
            }
        }
        fetchCustomerData();
    },[])


    const deleteUser = (id) => {
        const deleteUserQuery = async () => {
            try{
                const response = await fetch(`http://localhost:5000/deleteUser/${id}`,{
                    method: 'DELETE',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                if(response.ok){
                    alert('User Deleted Successfully')
                    window.location.reload()
                } 
            }
            catch(error){
                setErrorMessage('Failed to delete the user')
            }
        }
        deleteUserQuery()
    }

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      };



    return(
        <><h1>All Customer Details</h1>
        <table className="table" border={0}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Borrowed Money</th>
                    <th>Borrowed Type</th>
                    <th>Type Of Repayment</th>
                    <th>Mode Of Repayment</th>
                    <th>Installments</th>
                    <th>Deadline Date</th>
                    
                </tr>
            </thead>
            <tbody className="table-row">
                {customerData.map((eachCustomer) => {
                    return (
                        <tr key={eachCustomer.id} >
                            <td>{eachCustomer.id}</td>
                            <td>{eachCustomer.name}</td>
                            <td>{eachCustomer.phoneNumber}</td>
                            <td>{eachCustomer.address}</td>
                            <td>{eachCustomer.borrowedMoney}</td>
                            <td>{eachCustomer.borrowedType}</td>
                            <td>{eachCustomer.typeOfRepayment}</td>
                            <td>{eachCustomer.modeOfRepayment}</td>
                            <td>{eachCustomer.installments}</td>
                            <td>{formatDate(eachCustomer.deadTime)}</td>
                            <td className='actions'><button className='delete' onClick={() => deleteUser(eachCustomer.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <p>{errorMessage}</p>
        </>
    )
}

export default CustomerAllOperation