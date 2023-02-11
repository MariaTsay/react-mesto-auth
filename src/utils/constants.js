//общие переменные
export const popups = document.querySelectorAll('.popup');

//переменные для редактирования профиля
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const profileEditForm = document.forms['edit-profile'];
export const profileEditBtn = document.querySelector('.profile__profile-info-edit-button');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_about');
export const profileName = document.getElementById('profile-name');
export const profileJob = document.getElementById('profile-job');

//переменные для создания карточек
export const cardPopup = document.querySelector('.popup_type_add');
export const cardForm = document.forms['add-place'];
export const cardAddBtn = document.querySelector('.profile__add-button');
export const cardNameInput = document.querySelector('.popup__text_type_place-name');
export const cardLinkInput = document.querySelector('.popup__text_type_place-link');
export const cardListSelector = document.querySelector('.places__list');
export const popupSubmitBtn = cardForm.querySelector('.popup__submit-btn');

//переменные для увеличения фото
export const photoPopup = document.querySelector('.popup_type_photo');
export const popupFullscreenImg = photoPopup.querySelector('.popup__fullscreen-image');
export const popupFullscrImgCaption = photoPopup.querySelector('.popup__description');

//переменные для удаления карточек
export const cardDeletePopup = document.querySelector('.popup_type_delete');
export const cardDeleteForm = document.forms['deletecard-form'];
export const deleteBtn = document.querySelector('.places__delete');

//переменные для редактирования аватара
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const avatarEditForm = document.forms['avatar-form'];
export const avatarEditBtn = document.querySelector('.profile__avatar');
export const avatarLinkInput = document.querySelector('.popup__text_type_avatar-link');

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__text_type_error',
    spanErrorClass: 'popup__error_visible'
};