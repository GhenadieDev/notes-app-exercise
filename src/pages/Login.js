import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const StyledDiv = styled.div `
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`


const Login = ({ setAuthenticated }) => {

    const [formData, setFormData] = useState();
    const history = useHistory();

    const handleClick = (e) => {
        fetch('https://keeping-note.herokuapp.com/api/login', { //in aceasta functie se seteaza localstorage
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 200) {
          // eu sunt logat
          return res.json();
        }
  
      }).then(data => {
        localStorage.setItem('token', data.token);
        setAuthenticated(true);
        return history.push('/');
        })
    } 

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
          });
    }

    return(
        <StyledDiv>
            <form>
                <input placeholder = "username" name = "username" onChange = {handleChange}></input>
                <input placeholder = "password" name = "password" type = "password" onChange = {handleChange}></input>
                <button onClick = {handleClick}>Login</button>
                <button>Register</button>
            </form>
        </StyledDiv>
    )
}

export default Login;