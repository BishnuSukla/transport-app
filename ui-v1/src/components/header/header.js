import './header.scss';
import { useState } from 'react';
import i18next from 'i18next';
import SelectDropdown from '../select/select-dropdown';
function Header(){
    const [isLanguageDropdownOpened, setisLanguageDropdownOpened] = useState(false);
    const [languageSelected, setLanguageSelected] = useState('en');
    const [isProfileOptionOpened, setisProfileOptionOpened] = useState(false);
    const [profileOptionSelected, setProfileOptionSelected] = useState('');
    function toggleLanguageDropdown(){
        setisLanguageDropdownOpened(!isLanguageDropdownOpened)
        setisProfileOptionOpened(false)
    }
    function toggleProfileOptions(){
        setisProfileOptionOpened(!isProfileOptionOpened)
        setisLanguageDropdownOpened(false)
    }
    function changeAppLanguage(lang){
        i18next.changeLanguage(lang);
        toggleLanguageDropdown();
    }
    const languageOptions = [
        {key:"en", value:"English"},
        {key:"bn", value:"বাংলা"},
        {key:"as", value:"অসমীয়া"}
    ]

    const profileOptions = [
        {key:"profile", value:"Profile"},
        {key:"cabsInfo", value:"Cabs Info"},
        {key:"logout", value:"Logout"}
    ]

    return (
        <div class="header-container">
            <div class="header-container__logo">
                helloCab
            </div>
            <div  class="header-container__nav">
                <a className={isLanguageDropdownOpened?'active-nav':''} onClick={toggleLanguageDropdown} title="Language"><i class="fa fa-language header-container__nav__language" aria-hidden="true"></i>
                    {
                        isLanguageDropdownOpened && (
                                <SelectDropdown options={languageOptions} onSelectLanguage={()=>{setLanguageSelected();setTimeout(()=>toggleLanguageDropdown(),100)}}/>
                        )
                    }
                </a>
                
                <a className={isProfileOptionOpened?'active-nav':''} onClick={toggleProfileOptions} title="Profile"><i class="fa fa-user header-container__nav__profile" aria-hidden="true"></i>
                    {
                        isProfileOptionOpened && (
                                <SelectDropdown options={profileOptions} onSelectLanguage={()=>{setProfileOptionSelected();setTimeout(()=>toggleProfileOptions(),100)}}/>
                        )
                    }
                </a>
              
            </div>
            
        </div>
    )
}

export default Header;