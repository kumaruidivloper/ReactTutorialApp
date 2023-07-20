import React, {useState} from "react";
import {API_ULR} from '../Constants/URL';
import {Form, Button, Checkbox} from 'semantic-ui-react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



function Create() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const postData = async() => {
       await axios.post(API_ULR, {
        firstName, lastName, checked
       })
       navigate('/read');
    }

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
            <button onClick={postData}>Submit</button>
        </Form>
    )
}

export default Create