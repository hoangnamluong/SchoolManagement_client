import ProfileForm from "../../../components/User/ProfileForm";
import useAuthSelector from "../../../hooks/Selectors/useAuthSelector";
import "./profileManagement.scss";

const ProfileManagement = () => {
  const { userInfo } = useAuthSelector();

  return (
    <div className="profile-management">
      <div className="profile-management__inner">
        <div className="profile-management__title">
          <h2>Profile Management</h2>
        </div>
        <div className="profile-management__user">
          <div style={{ backgroundImage: `url(${userInfo.image})` }}></div>
          <h4>{userInfo.username}</h4>
        </div>
        <div className="profile-management__form">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};
export default ProfileManagement;
