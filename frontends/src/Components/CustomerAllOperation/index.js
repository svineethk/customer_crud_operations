
import {useState,useEffect} from 'react'
import './index.css'


const CustomerAllOperation = () => {
    const [customerData, setCustomerData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/allcontacts/`);
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
                const response = await fetch(`http://localhost:5000/deletecontacts/${id}`,{
                    method: 'DELETE',
                    'Content-Type':'application/json',
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



    return(
        <><h1>All Customer Details</h1>
        <table className="table" border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody className="table-row">
                {customerData.map((eachCustomer) => {
                    return (
                        <tr key={eachCustomer.id} >
                            <td>{eachCustomer.id}</td>
                            <td>{eachCustomer.name}</td>
                            <td>{eachCustomer.email}</td>
                            <td>{eachCustomer.address}</td>
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