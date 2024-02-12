import React from 'react'
import { HeaderComponent } from '../components/HeaderComponent'
import { SubHeadingComponent } from '../components/SubHeadingComponent'
import { InputBoxComponent } from '../components/InputBoxComponent'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'


const Signin = () => {
  return (
    <div className='h-screen bg-slate-300 flex justify-center ' >
      <div className='flex flex-col justify-center '>

        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4 '>
          {/* <h1>Sign up page</h1> */}

          <HeaderComponent label="Sign in" />
          <SubHeadingComponent label="Enter your Information to login to your account " />
          <InputBoxComponent label="Email" placeholder="ex. johndoe@gmail.com" />
          <InputBoxComponent label="Password" placeholder="*********" />
          <div className="pt-4 ">
            <Button label={"Sign in"} />
          </div>
          <BottomWarning label="Not having an account?" buttonText={"Register Here"} to={"/signup"} />
        </div>

      </div>

    </div>
  )
}

export default Signin