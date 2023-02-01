import faker from 'faker'
import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useTranslation } from "react-i18next";
import getCityNames from './cities';

function DropdownComp(){
  const {t} = useTranslation();
  const addressDefinitions = getCityNames();
  return (
    <Dropdown placeholder={t('enter_source_name')} search selection options={addressDefinitions} />
  )
}

export default DropdownComp;