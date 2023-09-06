import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import './Profile.css';


function Profile() {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  function onEdit() {
    setIsEditable(true);
  };

  function onSignOut() {
    //localStorage.removeItem('token');
    navigate('/sign-in');
  }

  return (
    <section className="profile">
      <UserForm formName="profile" title="Привет, Виталий!" buttonText="Сохранить" isButtonVisible={isEditable} />
      <div className={`profile__btn-block ${isEditable && 'profile__btn-block_unvisible'}`}>
        <button className="button profile__btn" onClick={onEdit}>Редактировать</button>
        <button onClick={onSignOut} className="button profile__btn profile__btn_type_signout">Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;
