import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserData } from "../../Features/userSlice";
import {
  checkEmailValidation,
  checkEmptyInputs,
  checkIsInputsValid,
  checkPasswordInputs,
} from "../../Functions/helper";
import s from "./EditProfileForm.module.scss";
import { useUserStore } from "../../store/useUserStore";

const EditProfileForm = () => {
  const {user,changePassword} = useUserStore((state)=>({
    user: state.user,
    changePassword: state.changePassword
  }));
console.log(user)

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify, setNewPasswordVerify] = useState("");
  const formRef = useRef();

  async function handleSubmit(e) {

    e.preventDefault();
    checkEmptyInputs({exceptions:[""],formRef:formRef});
    // checkEmailValidation(emailOrPhoneState);
    const newPassInput = formRef.current.querySelector("#confirmPass");
    if(newPassword!==newPasswordVerify){
      newPassInput.classList.add("invalid");
    }
    else{
      newPassInput.classList.remove("invalid");
    }
    const res =  await changePassword(currPassword,newPassword);
    if(res===true){
      alert("Password changed successfully");
    }
    else{
      alert("Password change failed");
    }
      

  }


  return (
    <form
      method="POST"
      className={s.profileForm}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h2>Edit Your Profile</h2>

      <section className={s.inputs}>
        <section className={s.wrapper}>
          <div className={s.input}>
            <label htmlFor="firstName">Username</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              disabled
              value={user?.username}
            />
          </div>

          <div className={s.input}>
            <label htmlFor="changeEmail">Email</label>
            <input
              type="text"
              name="emailOrPhone"
              id="changeEmail"
              disabled
              placeholder="example@gmail.com"
              value={user?.email}
            />
          </div>

        </section>

        <section className={s.passwordInputs}>
          
          <div className={s.input}>
            <label htmlFor="currentPass">Password Changes</label>
            <input
              type="password"
              name="currentPass"
              id="currentPass"
              placeholder="Current Password"
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
          </div>

          <div className={s.input}>
            <input
              type="password"
              name="newPass"
              id="newPass"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={s.input}>
            <input
              type="password"
              name="confirmPass"
              id="confirmPass"
              placeholder="Confirm New Password"
              value={newPasswordVerify}
              onChange={(e) => setNewPasswordVerify(e.target.value)}
            />
          </div>
        </section>
      </section>

      <div className={s.buttons}>
        <Link className={s.cancelLink} to="/">
          Cancel
        </Link>
        <button type="submit" className={s.submitButton}>
          Save Changes
        </button>
      </div>
    </form>
  );
};
export default EditProfileForm;
