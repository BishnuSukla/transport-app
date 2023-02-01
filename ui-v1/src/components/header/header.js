import './header.scss';
import { useState } from 'react';
import i18next from 'i18next';
function Header(){
    const [isLanguageDropdownOpened, setisLanguageDropdownOpened] = useState(false);
    console.log(process.env.REACT_APP_GOOGLE_LOC_API_KEY);
    function toggleLanguageDropdown(){
        setisLanguageDropdownOpened(!isLanguageDropdownOpened)
    }
    function changeAppLanguage(lang){
        i18next.changeLanguage(lang);
        toggleLanguageDropdown();
    }
    return (
        <div class="header-container">
            <div class="header-container__logo">
                helloCab
            </div>
            <div  class="header-container__nav">
                <a className={isLanguageDropdownOpened?'active-nav':''} onClick={toggleLanguageDropdown} title="Language"><i class="fa fa-language header-container__nav__language" aria-hidden="true"></i></a>
                <a title="Profile"><i class="fa fa-user header-container__nav__profile" aria-hidden="true"></i></a>
                {
                    isLanguageDropdownOpened && (
                        <div className="header-container__nav__language-dropdown">
                            <ul>
                                <li onClick={()=>changeAppLanguage('en')}>English</li>
                                <li onClick={()=>changeAppLanguage('be')}>বাংলা</li>
                            </ul>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}

export default Header;