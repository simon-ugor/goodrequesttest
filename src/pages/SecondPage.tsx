import React from 'react'
//SVGs
import { TopBarSecond } from "../svgs"
//Styled components
import { Title, SubTitle } from "../styledComponents"
//Form component
import Form from "../components/Form";

interface Props {
  continueClick: (pageNumber:number) => void
  backClick: (pageNumber:number) => void
}

const SecondPage = ({ continueClick, backClick }: Props) => {
  return (
    <div>
      <div className="mt-10">
        <TopBarSecond />
        <Title>Potrebujeme od Vás zopár informácií</Title>
        <SubTitle className='mt-8'>O Vás</SubTitle>
        
        <Form continueToNextPage={continueClick} backToPreviousPage={backClick} />

      </div>
    </div>
  )
}

export default SecondPage
