import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { checkAuth, signIn, signUp } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpened, setisInfoTooltipOpened] = useState(false);
  const [isInfoTooltipStatus, setisInfoTooltipStatus] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    try {
      await signUp(data);
      setisInfoTooltipOpened(true);
      setisInfoTooltipStatus('success');
      navigate("/sign-in");
    } catch (err) {
      console.log(err)
      setisInfoTooltipOpened(true);
      setisInfoTooltipStatus('fail');
    }
  }

  const handleSignIn = async (data) => {
    const {token} = await signIn(data);
    localStorage.setItem('jwt', token);
    setIsLoggedIn(true);
    setUserEmail(data.email);
    navigate("/");
   
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if(jwt) {
      checkAuth(jwt).then((data) => {
        setIsLoggedIn(true);
        setUserEmail(data.data.email);
        navigate("/");
      });
    }
  }, [navigate])

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate("/sign-in");
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  const handleCardLike = async (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.dislikeCard(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => console.log(err))

    } else {
      api.likeCard(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => console.log(err))
    }

  }

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id === card._id ? '' : c._id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateUser = async ({ name, about }) => {
    try {
      const updatedUser = await api.setUserInfo({ name, about });
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateAvatar = async (data) => {
    try {
      const updatedAvatar = await api.editAvatar(data);
      setCurrentUser(updatedAvatar);
      closeAllPopups();
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newCard = await api.createCard(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.log(err)
    }
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setisInfoTooltipOpened(false);
    setisInfoTooltipStatus('');
  }

  const getCurrentUserInfo = async () => {
    try {
      const currentUserInfo = await api.getUserInfo();
      setCurrentUser(currentUserInfo);
    } catch (err) {
      console.log(err)
    }
  }

  const getCards = async () => {
    try {
      const apiCards = await api.getInitialCards();
      setCards(apiCards);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCurrentUserInfo();
    getCards();
  }, [])

  useEffect(() => {
    const handleEscBtn = (e) => {
      if (e.keyCode === 27)
        closeAllPopups()
    }
    document.addEventListener('keydown', handleEscBtn)
    return () => document.removeEventListener('keydown', handleEscBtn)
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header userEmail={userEmail} onSignOut={handleSignOut} />
          <Routes>
          <Route path="/" element={
               <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main 
                 onEditAvatar={handleEditAvatarClick}
                 onEditProfile={handleEditProfileClick}
                 onAddPlace={handleAddPlaceClick}
                 onCardClick={handleCardClick}
                 onCardLike={handleCardLike}
                 onCardDelete={handleCardDelete}
                 cards={cards}
                />
               </ProtectedRoute>
            }/>
            <Route path="/sign-up" element={<Register onSubmit={handleSignUp} />} />
            <Route path="/sign-in" element={<Login onSubmit={handleSignIn}  />} />
          </Routes>
         
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="deletecard"
          submitBtnText="Да"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip 
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
          status={isInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;