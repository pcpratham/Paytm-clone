import React, { useState } from 'react'
import { HeaderComponent } from '../components/HeaderComponent'
import { SubHeadingComponent } from '../components/SubHeadingComponent'
import { InputBoxComponent } from '../components/InputBoxComponent'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-slate-300 flex justify-center ' >
      <div className='flex flex-col justify-center '>

        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4 '>
          {/* <h1>Sign up page</h1> */}

          <HeaderComponent label="Sign up" />
          <SubHeadingComponent label="Enter your Information to create an account" />
          <InputBoxComponent onChange={e => {
            setFirstName(e.target.value)
          }} label="First Name" placeholder="John" />
          <InputBoxComponent onChange={e => setLastName(e.target.value)} label="Last Name" placeholder="Doe" />
          <InputBoxComponent onChange={e => setUsername(e.target.value)} label="Email" placeholder="ex. johndoe@gmail.com" />
          <InputBoxComponent onChange={e => setPassword(e.target.value)} label="Password" placeholder="*********" />
          <div className="pt-4 ">
            <Button onClick={async () => {
              const response  = await axios.post("http://localhost:4000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
              });
               localStorage.setItem("token",response.data.token);
               navigate("/dashboard")
            }} label={"Sign up"} />
          </div>
          <BottomWarning label="Already have an account?" buttonText={"Sign in"} to={"/signin"} />
        </div>

      </div>

    </div>
  )
}

export default Signup