import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Table, Button} from 'semantic-ui-react'
import { API_ULR } from '../Constants/URL';
import {useNavigate} from 'react-router-dom';


function Read() {
    const [apiData, setAPIData] = useState([]);
    const navigate = useNavigate();

    const updateUser = ({firstName, lastName, checked, id}) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('firstName', firstName)
        localStorage.setItem('lastName', lastName)
        localStorage.setItem('checked', checked)
        navigate('/update');
    } 

    const deleteUser = async (id) => {
        await axios.delete(API_ULR + id);
        callGetAPI();
    }

    const callGetAPI = async () => {
        const resp = await axios.get(API_ULR);
        setAPIData(resp.data);
    }

    useEffect(() => {
        callGetAPI();
    },[]);
    return (
        <div>
            <Table singleLine className='userTable'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        apiData.length > 0 ?         
                        apiData.map((data) => (
                            <Table.Row key={data.id}>
                        <Table.Cell>{data.firstName}</Table.Cell>
                        <Table.Cell>{data.lastName}</Table.Cell>
                        <Table.Cell>{data.checked ? 'Checked': 'Not Checked'}</Table.Cell>
                        <Table.Cell>
                            <button onClick={() => deleteUser(data.id)}>Delete</button>
                        </Table.Cell>
                        <Table.Cell>
                            <button onClick={() =>updateUser(data)}>Update</button>
                        </Table.Cell>
                    </Table.Row>
                        ))
                        :
                        <Table.Row>
                        <Table.Cell colSpan="5" className='text-center'>No Data Found</Table.Cell>
                        </Table.Row>
                    }                                     
                </Table.Body>
            </Table>
        </div>
    )
}

export default Read