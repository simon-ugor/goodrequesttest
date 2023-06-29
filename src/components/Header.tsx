//SVGs
import { InstagramLogo, FacebookLogo } from "../svgs"

const Header = () => {
  return (
    <div className="bg-white flex flex-row justify-between items-center pl-48 pr-48 border-b-2">
        <p>Nadácia GoodBoy</p>
        <div className="flex flex-row">
            <FacebookLogo />
            <InstagramLogo />
        </div>
  </div>
  )
}

export default Header
