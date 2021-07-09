import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { AppStateType } from '../../redux/store';


type TProps = TMapStateToProps;

const Header: React.FC<TProps> = ({ hasNotCompletedTask, lessonsNubers }) => {
   const [burgerClicked, setBurgerClicked] = useState(false);
   const [dropdownButtonClicked, setDropdownButtonClicked] = useState(false);
   const dropdownButtonClassName = dropdownButtonClicked ? 'navigation__item navigation__item_dropdown _touched' : 'navigation__item navigation__item_dropdown';

   const dropdownButtonOnClick = () => {
      if (isMobile) {
         setDropdownButtonClicked(!dropdownButtonClicked);
      }
   };

   const burgerOnClick = () => {
      setBurgerClicked(!burgerClicked);
      document.body.classList.toggle('_disble-scroll');
   };

   const closeMobileMenu = () => {
      setBurgerClicked(false);
      document.body.classList.remove('_disble-scroll');
   };

   return (
      <header className='header'>
         <div className='container'>
            <nav className='header__navigation navigation'>
               <span className='navigation__logo-link'>CallaN</span>
               <ul className={burgerClicked ? 'navigation__list _active' : 'navigation__list'}>
                  <li className='navigation__item'>
                     <NavLink onClick={closeMobileMenu} className={hasNotCompletedTask ? 'navigation__link _notification' : 'navigation__link'} to='/homework'>Homework</NavLink>
                  </li>
                  <li onClick={dropdownButtonOnClick} className={dropdownButtonClassName}>
                     <span className='navigation__link'>Lessons</span>
                     <svg className='navigation__arrow' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 451.847 451.847'>
                        <path d='M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                           c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                           c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z'/>
                     </svg>
                     <div className='dropdown'>
                        <ul className='dropdown__list'>
                           {lessonsNubers.map(({number, is_current}) =>
                              <li key={number} className={is_current ? 'dropdown__item dropdown__item_current' : 'dropdown__item'}>
                                 <Link onClick={closeMobileMenu} className='dropdown__link' to={`/lessons/${number}`}>Lesson {number}</Link>
                              </li>)
                           }
                        </ul>
                     </div>
                  </li>
                  <li className='navigation__item'>
                     <NavLink onClick={closeMobileMenu} className='navigation__link' to='/vocabulary'>Vocabulary</NavLink>
                  </li>
               </ul>
               <button onClick={burgerOnClick} className={burgerClicked ? 'burger _active' : 'burger'}>
                  <span></span>
               </button>
            </nav>
         </div>
      </header>
   );
};


const mapStateToProps = (state: AppStateType) => ({
   hasNotCompletedTask: state.app.hasNotCompletedTask,
   lessonsNubers: state.app.lessonsNumbers
});

type TMapStateToProps = ReturnType<typeof mapStateToProps>;

export default connect<TMapStateToProps, unknown, unknown, AppStateType>(mapStateToProps)(Header);