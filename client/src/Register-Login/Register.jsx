import { useState } from "react";

export default function Register() {
    const [data, setData] = useState({})


    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setData(values => ({...values, [name]: value}))
    }

    async function handleSubmission(e) {
      e.preventDefault();
      const { fullname, username, password } = data;
      if (Object.keys(data).length !==0 && username !== "" && password !== "" && fullname !== "") {
        const response = await fetch('http://localhost:4400/api/signup', {
        method: 'POST',
        body: JSON.stringify({fullname, username, password}),
        headers: {'Content-Type':'application/json'}
        })
        if (response.ok) {
          alert("Registration successful.")
        } else {
          alert("Registration Failed.")
        }
      } else {
        alert('Empty!')
      }
  }

    return (
    <div className=" shadow-md border mx-auto w-fit mt-12 rounded-md p-3 py-11 border-slate-800">
      <form onSubmit={handleSubmission}>
        <h1 className=" mb-6 text-4xl font-semibold text-white text-center">Signup</h1>
        <input 
          type="text" 
          placeholder='Fullname'
          name="fullname"
          value={data.fullname}
          onChange={handleChange}
          className=" p-1 mb-3 mx-2 rounded-md pl-2 w-72 bg-slate-900 text-white outline-none" 
        /><br />
        <input 
          type="text" 
          placeholder='Username'
          name="username"
          value={data.username}
          onChange={handleChange}
          className=" p-1 mb-3 mx-2 rounded-md pl-2 w-72 bg-slate-900 text-white outline-none" 
        /><br />
        <input 
          type="password" 
          placeholder='Password'
          name="password"
          value={data.password}
          onChange={handleChange}
          className=" p-1 mb-3 mx-2 rounded-md pl-2 w-72 bg-slate-900 text-white outline-none" 
        /><br />

        <input type="submit" value="Signup"
            className=" transition border border-white text-white w-72 mx-2 py-2 rounded-md hover:bg-white hover:text-slate-900"
        />
      </form>
    </div>
    );
}