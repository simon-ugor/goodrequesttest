//SVGs
import { InstagramLogo, FacebookLogo } from "../svgs"

const Header = () => {
  return (
    <div className="bg-white flex flex-row justify-between items-center pl-20 pr-20 border-b-2 lg:pl-48 lg:pr-48">
        <p>Nadácia GoodBoy</p>
        <div className="flex flex-row">
            <FacebookLogo />
            <InstagramLogo />
        </div>
  </div>
  )
}

export default Header
