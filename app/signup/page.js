
"use client";

// needed in App Router for client-side code
 import { useState } from "react"; 
 import { useRouter } from "next/navigation";
  import axios from "axios"; 
  import '../styles/Auth.css'; 
  export default function SignUpPage() 
  { 
    const [form, setForm] = useState({ username: "", email: "", birth_year: "", gender: "", designation: "", company_name: "", password: "", });
     const router = useRouter(); const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };
      const handleSubmit = async (e) => {
         e.preventDefault();
         try { 
            
            const res = await axios.post("http://localhost:5000/api/signup", form);
             console.log("Response:", res.data);
              //alert(res.data.message);
               router.push("/login"); }
                catch (err)
                 { 
                    alert(err.response?.data?.message || "Signup failed");
                 } };
                  return ( <div className="auth-container">
                     <div className="auth-box">
                         <div className="auth-left">
                             <img src="/group112.png" alt="Signup" className="hero-img" />
                              </div> 
                              <div className="auth-right">
                                 <h2>Create Account</h2>
                                  <p className="subtitle">Fill the details to sign up</p>
                                   <form onSubmit={handleSubmit}>
                                     <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                                      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                                       <input type="number" name="birth_year" placeholder="Birth Year" onChange={handleChange} required />
                                        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
                                         <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
                                          <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} required />
                                           <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                                            <button type="submit" className="primary-btn" onClick={() => router.push("/login")}> Sign Up </button> </form>
                                           
                                           {/*
                                             <p className="terms"> Already have an account?{" "} 
                                                <span className="btn-link" onClick={() => router.push("/login")}> Login </span>
                                                 </p> 
                                           */}
                                                 </div>
                                                  </div>
                                                   </div>
                                                    );
                                                 }