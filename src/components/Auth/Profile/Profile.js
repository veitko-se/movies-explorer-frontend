import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import UserForm from '../UserForm/UserForm';
import './Profile.css';

function Profile({onSignOut, onEdit, onSave, isEditable, isServerError}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="profile">
      <UserForm formName="profile" title={`Привет, ${currentUser.name}!`} buttonText="Сохранить" isButtonVisible={isEditable} onSubmit={onSave} isServerError={isServerError} />
      <div className={`profile__btn-block ${isEditable && 'profile__btn-block_unvisible'}`}>
        <button className="button profile__btn" onClick={onEdit} type="button">Редактировать</button>
        <button onClick={onSignOut} className="button profile__btn profile__btn_type_signout" type="button">Выйти из аккаунта</button>
      </div>
    </main>
  )
}

export default Profile;
