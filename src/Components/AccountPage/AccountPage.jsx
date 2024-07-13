import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PagesHistory from "../Shared/MiniComponents/PagesHistory";
import AccountMenuSection from "./AccountMenuSection";
import s from "./AccountPage.module.scss";
import EditProfileForm from "./EditProfileForm";
import { useUserStore } from "../../store/useUserStore";

const AccountPage = () => {
  
  const {user} = useUserStore((state)=>({user: state.user}));

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="container">
        <main className={s.accountPage} id="account-page">
          <div className={s.wrapper}>
            <PagesHistory history={["/", "My Account"]} />

            <p className={s.welcomeMessage}>
              Welcome! <Link to="/profile">{user?.username}</Link>
            </p>
          </div>

          <div className={s.accountPageContent}>
            <AccountMenuSection />
            <EditProfileForm />
          </div>
        </main>
      </div>
    </>
  );
};
export default AccountPage;
