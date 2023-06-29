import React from 'react'
//Styled components
import { Title, BackButton } from "../styledComponents"

interface Props {
    text: string
}

const ThankYouPage = ({ text }: Props) => {
  return (
    <div>
        <Title>{text}</Title>
        <div className='flex justify-between mt-6 mb-6'>
            <BackButton onClick={() => window.location.reload()} >Domov</BackButton>
        </div>
    </div>
  )
}

export default ThankYouPage
