import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [userName, setUserName] = useState('');
  const [ email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = formValidation()
    // if (isValid) {
    //   setUserName('')
    //   setPassword('')
    // }
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({displayName:userName}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          userName:userName,
          phone:phone
        }).then(()=>{
          history.push('/login')
        })
      })
    }).catch((error)=>{console.log(error)})
  }

// form validation<<<<<<<<<<<<<<<<<<<

  const [passwordErr, setPasswordErr] = useState('')
  const [nameErr, setNameErr] = useState('')

  const formValidation = () => {
    // e.preventDefault()
    const passwordErr =  {}
    const nameErr = {}
    let isValid = true

    if (password.trim().length < 6) {
      
      passwordErr.passwordShort = 'Minimum 6 characters required'
      isValid = false
    }

    if (userName.trim().length < 3) {
      nameErr.nameShort = 'Minimum 3 characters required'
      isValid = false
    }

    setPasswordErr(passwordErr)
    setNameErr(nameErr)
    return isValid
  }
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br /> 
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            name="name"
            defaultValue="John"
            required
          />
          <br />
          {Object.keys(nameErr).map((key)=>{
            return <div style={{color:'red'}}>{nameErr[key]}</div>
          })}
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          {Object.keys(passwordErr).map((key)=>{
            return <div style={{color:'red'}}>{passwordErr[key]}</div>
          })}
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
