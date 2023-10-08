import { useState } from "react";

export default function Login() {
    const [user, setUser] = useState({})


    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setUser(values => ({...values, [name]: value}))
    }

    async function handleSubmission(e) {
        e.preventDefault();
        console.log(user)
        const { username, password } = user;
        await fetch('http://localhost:4000/api/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type':'application/json'}
        })
    }

    return (
    <div className=" shadow-md border mx-auto w-fit mt-12 rounded-md p-3 border-slate-800">
      <form onSubmit={handleSubmission}>
        <h1 className=" mb-6 text-4xl font-semibold text-white text-center">Login</h1>
        <input 
          type="text" 
          placeholder='Username'
          name="username"
          value={user.username}
          onChange={handleChange}
          className=" p-1 mb-3 mx-2 rounded-md pl-2 w-72 bg-slate-900 text-white outline-none" 
        /><br />
        <input 
          type="password" 
          placeholder='Password'
          name="password"
          value={user.password}
          onChange={handleChange}
          className=" p-1 mb-3 mx-2 rounded-md pl-2 w-72 bg-slate-900 text-white outline-none" 
        /><br />

        <input type="submit" value="Login"
            className=" transition border border-white text-white w-72 mx-2 py-2 rounded-md hover:bg-white hover:text-slate-900"
        />
      </form>
    </div>
    );
}