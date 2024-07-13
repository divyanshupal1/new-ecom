import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./LogInForm.module.scss";
import { useUserStore } from "../../store/useUserStore";

const LogInForm = () => {
  const navigateTo = useNavigate();

  const {login} = useUserStore((state)=>({
    login:state.login
  }))

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault()  ;
    const success = await login(email, password);
    if(success){
      navigateTo("/")
    }
    else{
      alert("Failed to login")
    }
    
  }



  return (
    <form className={s.form} onSubmit={loginUser}>
      <h2>Log in to Exclusive</h2>
      <p>Enter your details below</p>

      <div className={s.inputs}>
        <input
          type="text"
          name="emailOrPhone"
          value={email}
          placeholder="Email or Phone Number"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="Password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={s.buttons}>
        <button type="submit" className={s.loginBtn}>
          Log In
        </button>

        <a href="#">Forget Password?</a>
      </div>
    </form>
  );
};
export default LogInForm;
