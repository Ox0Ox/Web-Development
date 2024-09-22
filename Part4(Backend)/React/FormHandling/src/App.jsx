import { useState } from 'react'
import './App.css'
import { useForm} from "react-hook-form"



function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (t)=>{
    return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve()
    }, t*1000);
  })}

  const onSubmit = async(data) => {
    // await delay(2)
    let r = await fetch('http://localhost:4000', {method: 'POST', headers:{'Content-Type':'application/json'},body: JSON.stringify(data)})
    let res = await r.json()
    console.log(data, res)
    // if(data.username !== 'Admin'){
    //   setError('myform', {message: 'Wrong username submitted'})
    // }
    // if(data.username === 'Admin1'){
    //   setError('blocked', {message: 'User has been blocked'})
    // }
  }

  return (
    <>
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username', {required:{value: true, message: 'This is a required feild'}, minLength: {value: 3, message: 'Minimum length is 3 characters'}, maxLength: {value: 10, message: 'Maximum length is 10 characters'}})} type="text" />
          {errors.username && <div>{errors.username.message}</div >}
          <br/>
          <input {...register('password', {required:{value: true, message: 'This is a required feild'}, minLength: {value: 3, message: 'Minimum length is 3 characters'}})} type="password" />
          {errors.password && <div>{errors.password.message}</div >}
          <br />
          <input disabled = {isSubmitting} type="submit" value='Submit' />
          {isSubmitting && <div>Loading...</div>}
          {errors.myform && <div>{errors.myform.message}</div>}
          {errors.blocked && <div>{errors.blocked.message}</div>}
        </form>
      </div>
    </>
  )
}

export default App
