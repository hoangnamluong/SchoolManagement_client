import ProfileForm from "../../../components/User/ProfileForm";
import useUserSelector from "../../../hooks/Selectors/useUserSelector";
import "./profileManagement.scss";

const ProfileManagement = () => {
  const { currentUser } = useUserSelector();

  return (
    <div className="profile-management">
      <div className="profile-management__inner">
        <div className="profile-management__title">
          <h1>Profile Management</h1>
        </div>
        <div className="profile-management__user">
          <div style={{ backgroundImage: `url(${currentUser.image})` }}></div>
          <h4>{currentUser.username}</h4>
        </div>
        <div className="profile-management__form">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};
export default ProfileManagement;
