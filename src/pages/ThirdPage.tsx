import React, { useState } from 'react'
//SVGs
import { TopBarThird } from "../svgs"
//Styled components
import { Title, ContinueButton, SubTitle, BackButton, PrimaryText } from "../styledComponents"
//Redux
import { useSelector } from "react-redux"
//API POST call
import { contributionPost } from '../api/api'
//Thank you page
import ThankYouPage from './ThankYouPage'

interface Props {
  backClick: (pageNumber:number) => void
}

const ThirdPage = ({ backClick }: Props) => {

  const personalInformation = useSelector((state: any) => state.personalInformation.value);
  const generalInformation = useSelector((state: any) => state.generalInformation.value);

  const [checked, setChecked] = useState(false);

  const [checkboxWarning, setCheckboxWarning] = useState(false)

  const [thankYouPage, setThankyouPage] = useState(false);
  const [thankYouPageText, setThankYouPageText] = useState("");

  const submitContribution = async () => {

    if (checked) {
      //construct object and call api
      const response = await contributionPost(
        personalInformation.firstName,
        personalInformation.lastName,
        personalInformation.email,
        personalInformation.prefix + personalInformation.phone,
        generalInformation.amount,
        generalInformation.shelter.id != 0 ? generalInformation.shelter.id : NaN
      )

      if (response.messages) {
        setThankYouPageText(response.messages[0].message);
        setThankyouPage(true);
      }
      
    } else {
      //highligh checbox
      setCheckboxWarning(true);
    }
  }

  return (
    <div>
      <div className="mt-10">
        <TopBarThird />

        {thankYouPage ? <ThankYouPage text={thankYouPageText} /> : 
        <>
        <Title>Skontrolujte si zadané údaje</Title>

        <SubTitle className="mt-8">Akou formou chcem pomôcť</SubTitle>
        <PrimaryText>{generalInformation.helpType}</PrimaryText>
        <SubTitle>Najviac mi záleží na útulku</SubTitle>
        <PrimaryText>{generalInformation.shelter.name}</PrimaryText>
        <SubTitle>Suma ktorou checm pomôcť</SubTitle>
        <PrimaryText>{generalInformation.amount + " €"}</PrimaryText>
        <SubTitle>Meno a priezvisko</SubTitle>
        <PrimaryText>{personalInformation.firstName + " " + personalInformation.lastName}</PrimaryText>
        <SubTitle>E-mailová adresa</SubTitle>
        <PrimaryText>{personalInformation.email}</PrimaryText>
        <SubTitle>Telefónne číslo</SubTitle>
        <PrimaryText>{personalInformation.prefix + " " + personalInformation.phone}</PrimaryText>

        <div className="form-control flex flex-row w-full justify-start">
          <input onClick={() => setCheckboxWarning(false)} checked={checked} onChange={() => setChecked(!checked)} type="checkbox" className={checkboxWarning? "checkbox mr-2 border-red": "checkbox mr-2"} />
          <span className={checkboxWarning ? "text-red" : ""}>Súhlasím so spracovaním mojich osobných údajov</span>
        </div>

        <div className='flex justify-between mt-6 mb-6'>
          <BackButton onClick={() => backClick(3)}>Späť</BackButton>
          <ContinueButton onClick={submitContribution}>Odoslať formulár</ContinueButton>
        </div>
        </>
        }

      </div>
    </div>
  )
}

export default ThirdPage
