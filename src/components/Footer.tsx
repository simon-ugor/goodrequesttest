//SVGs
import { GoodboyLogo } from "../svgs";
//Styled components
import { SubTitle } from "../styledComponents"

const Footer = () => {
  return (
    <div className="grid grid-cols-3 bg-white pt-20">
        <div></div>
        <div className='bg-white flex flex-row justify-between'>
            <div className=''><GoodboyLogo /></div>
            <div className='flex flex-col'>
                <SubTitle>Nadácia Good boy</SubTitle>
                <a href=''>link</a>
                <a href=''>link</a>
                <a href=''>link</a>
            </div>
            <div className=''>
                <SubTitle>Nadácia Good boy</SubTitle>
                <p>Lorem ipsum</p>
            </div>
            <div className=''>
                <SubTitle>Nadácia Good boy</SubTitle>
                <p>Lorem ipsum</p>
            </div>
        </div>
        <div></div>
  </div>
  )
}

export default Footer
