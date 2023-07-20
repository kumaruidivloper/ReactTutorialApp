import React, {useState, useEffect} from 'react';
import {Form, Button, Checkbox} from 'semantic-ui-react';
import { API_ULR } from '../Constants/URL';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';



function Update() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checked, setChecked] = useState();
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const updateUser = async () => {
        await axios.put(API_ULR + id, {
            firstName, lastName, checked
        });
        navigate('/read');
    }

    useEffect(() => {
        setId(localStorage.getItem('ID'));
        setFirstName(localStorage.getItem('firstName'));
        setLastName(localStorage.getItem('lastName'));
        setChecked(localStorage.getItem('checked'));
    }, []);

    
    return (
        <Form className="form">
        <Form.Field>
            <label>First Name</label>
            <input 
            value={firstName} 
            onChange={event => setFirstName(event.target.value)}
            placeholder="Enter First Name"/>
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <input 
            value={lastName} 
            onChange={event => setLastName(event.target.value)}
            placeholder="Enter Last Name"/>  
        </Form.Field>
        <Form.Field>
            <Checkbox 
            checked={checked} 
            onChange={() => setChecked(!checked)}
            label="Agreed the Terms & conditions"/> 
        </Form.Field>
        <button onClick={updateUser}>Update</button>
    </Form>
    )
}

export default Update