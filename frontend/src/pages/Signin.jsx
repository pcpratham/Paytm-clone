import React, { useState } from 'react'
import { HeaderComponent } from '../components/HeaderComponent'
import { SubHeadingComponent } from '../components/SubHeadingComponent'
import { InputBoxComponent } from '../components/InputBoxComponent'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signin = () => {
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-slate-300 flex justify-center ' >
      <div className='flex flex-col justify-center '>

        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4 '>
          {/* <h1>Sign up page</h1> */}

          <HeaderComponent label="Sign in" />
          <SubHeadingComponent label="Enter your Information to login to your account " />
          <InputBoxComponent onChange={(e)=>setUserName(e.target.value)} label="Email" placeholder="ex. johndoe@gmail.com" />
          <InputBoxComponent onChange={(e)=>setPassword(e.target.value)} label="Password" placeholder="*********" />
          <div className="pt-4 ">
            <Button onClick={()=>{
              axios.post(`${import.meta.env.VITE_SOME_KEY}` + "/api/v1/user/signin",{
                username,
                password
              }).then(response => {
                localStorage.setItem("token",response.data.token);
                if(response.data.ok){
                  toast.success("Sign in Done!!");
                  navigate("/dashboard");
                }
              }).catch(err=>{
                toast.error("Check Username/password!!");
              })
            }} label={"Sign in"} />
          </div>
          <BottomWarning label="Not having an account?" buttonText={"Register Here"} to={"/signup"} />
        </div>

      </div>

    </div>
  )
}

export default Signin