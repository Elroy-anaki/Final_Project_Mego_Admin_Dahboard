import axios from 'axios'
import React from 'react'

function ForgotPassword() {

    const sendforgotPasswordEmail = async (e) => {
        e.preventDefault()
        alert("send email...")
        try {
            const {data} = await axios.post('http://localhost:3000/auth/forgot-password', {email: e.target.email.value})
            console.log(data)
        } catch (error) {
            console.log("Error", error)
        }
    }

  return (
    <div className='border-2 border-gray-600'>
      <form
      className='px-8 py-3 bg-gray-400 flex flex-col gap-8'
       onSubmit={sendforgotPasswordEmail}>
        <label htmlFor="email">Enter Email:</label>
        <input type="email" required placeholder='copmany@gmail.com' id='email'/>
        <button type='submit'>Send to Email</button>
      </form>
    </div>
  )
}

export default ForgotPassword
