import React, { useEffect, useState } from 'react'
//Styled components
import { PriceButton, Title, SelectButton, PriceInput, ContinueButton, SubTitle } from "../styledComponents"
//SVGs
import { TopBarFirst, Wallet, Paw } from "../svgs";
//Redux
import { useDispatch } from 'react-redux';
import { submitGeneral } from "../features/generalInformation"

interface Props {
  continueClick: (pageNumber:number) => void
}

const FirstPage = ({ continueClick }: Props) => {

  useEffect(() => {
    fetch("https://frontend-assignment-api.goodrequest.dev/api/v1/shelters")
    .then(response => response.json())
    .then(data => setAllShelters(data.shelters))
  }, [])

  const dispatch = useDispatch();

  const toggleClick = (e: React.MouseEvent<HTMLElement>) => {
    let buttonId:string = e.currentTarget.id;
    if (buttonId == "1") {
      setToggleStyle({1: "bg-brown text-white", 2: "bg-white text-black"})
      setHelpType("Chcem finančne prispieť konkrétnemu útulku");
      setMandatory("Povinné *");
    } else {
      setToggleStyle({1: "bg-white text-black", 2: "bg-brown text-white"});
      setHelpType("Chcem finančne prispieť celej nadácii");
      setRedBorders({shelter: "border-gainsboro", priceInput: redBorders.priceInput})
      setMandatory("Nepovinné");
    }
  }

  const priceButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    let buttonId:string = e.currentTarget.id;
    setPriceInput({value: priceInput.value, style: "bg-transparent"})
    setRedBorders({shelter: redBorders.shelter, priceInput: "border-gainsboro"})
    if (buttonId == "5") {
      setPriceButtonStyle({1: "bg-brown", 2: "bg-white", 3: "bg-white", 4: "bg-white", 5: "bg-white", 6: "bg-white"});
      setAmount(5);
    } else if (buttonId == "10") {
      setPriceButtonStyle({1: "bg-white", 2: "bg-brown", 3: "bg-white", 4: "bg-white", 5: "bg-white", 6: "bg-white"});
      setAmount(10);
    } else if (buttonId == "20") {
      setPriceButtonStyle({1: "bg-white", 2: "bg-white", 3: "bg-brown", 4: "bg-white", 5: "bg-white", 6: "bg-white"});
      setAmount(20);
    } else if (buttonId == "30") {
      setPriceButtonStyle({1: "bg-white", 2: "bg-white", 3: "bg-white", 4: "bg-brown", 5: "bg-white", 6: "bg-white"});
      setAmount(30);
    } else if (buttonId == "50") {
      setPriceButtonStyle({1: "bg-white", 2: "bg-white", 3: "bg-white", 4: "bg-white", 5: "bg-brown", 6: "bg-white"});
      setAmount(50);
    } else if (buttonId == "100") {
      setPriceButtonStyle({1: "bg-white", 2: "bg-white", 3: "bg-white", 4: "bg-white", 5: "bg-white", 6: "bg-brown"});
      setAmount(100);
    }
  }

  const dropdownChange = (e:React.FormEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    allShelters.map((s) => {
      if (s.name == value) {
        setShelter({id: s.id, name: s.name})
      }
    })
  }

  const priceInputClick = () => {
    setPriceButtonStyle({1: "bg-white", 2: "bg-white", 3: "bg-white", 4: "bg-white", 5: "bg-white", 6: "bg-white"})
    setPriceInput({value: priceInput.value, style: "bg-brown"})
  }

  const submitClick = () => {
    if (helpType == "Chcem finančne prispieť konkrétnemu útulku" && (shelter.id == 0)) {
      setRedBorders({"shelter": "border-red", "priceInput": redBorders.priceInput});
    } else {
      let values;
      if (priceInput.style == "bg-brown" && (priceInput.value != "" && priceInput.value != "0")) {
        values = {helpType: helpType, shelter: shelter, amount: parseInt(priceInput.value)}
        dispatch(submitGeneral(values))
        continueClick(1);
      } else if (priceInput.style == "bg-brown" && (priceInput.value == "" || priceInput.value == "0")) {
        setRedBorders({"shelter": redBorders.shelter, "priceInput": "border-red"})
      } else {
        values = {helpType: helpType, shelter: shelter, amount: amount}
        dispatch(submitGeneral(values))
        continueClick(1);
      }

    }

  }

  const [toggleStyle, setToggleStyle] = useState({1: "bg-white text-black", 2: "bg-brown text-white"});
  const [priceButtonStyle, setPriceButtonStyle] = useState({1: "bg-brown", 2: "bg-white", 3: "bg-white", 4: "bg-white", 5: "bg-white", 6: "bg-white"});

  const [helpType, setHelpType] = useState("Chcem finančne prispieť celej nadácii");
  const [shelter, setShelter] = useState({id: 0, name: ""});
  const [amount, setAmount] = useState(5);

  const [allShelters, setAllShelters] = useState<{id: number; name: string}[]>([]);

  const [mandatory, setMandatory] = useState("Nepovinné");

  const [priceInput, setPriceInput] = useState({value: "", style: "bg-transparent"});

  const [redBorders, setRedBorders] = useState({"shelter": "border-gainsboro", "priceInput": "border-gainsboro"})

  return (
    <div>
        <div className="mt-10">

          <TopBarFirst />

              <Title>Vyberte si možnosť, ako chcete pomôcť</Title>

              <div className="mt-6 flex flex-row">

                <SelectButton id='1' onClick={toggleClick} dir='ltr' className={`rounded-s-3xl flex flex-col justify-center p-5 md:justify-between ${toggleStyle[1]}`}>
                  <div className="hidden md:block"><Wallet /></div>
                  <p className="font-semibold text-s lg:text-base">Chcem finančne prispieť konkrétnemu útulku</p>
                </SelectButton>

                <SelectButton onClick={toggleClick} id='2' dir='rtl' className={`rounded-s-3xl ${toggleStyle[2]}`}>
                  <div dir='ltr' className="w-full h-full flex flex-col justify-center p-5 md:justify-between">
                    <div className="hidden md:block"><Paw /></div>
                    <p className="font-semibold text-s lg:text-base">Chcem finančne prispieť celej nadácii</p>
                  </div>
                </SelectButton>

              </div>

              <div className="flex justify-between mt-6">
                <SubTitle>O projekte</SubTitle>
                <h3 className="text-black font-semibold">{mandatory}</h3>
              </div>

              <div className="h-16 mt-2">

                <select onChange={(e) => dropdownChange(e)} className={`select w-full max-w-full h-full bg-white focus:border-none ${redBorders.shelter}`}>
                  <option disabled selected>Útulok - Vyberte útulok zo zoznamu</option>
                  {allShelters && allShelters.map((s) => {
                    return <option key={s.id}>{s.name}</option>
                  })}
                </select>

              </div>

              <div className="flex justify-between mt-6">
                <SubTitle>Suma, ktorou chem prispieť</SubTitle>
              </div>

              <div className="flex justify-between mt-2">
                <PriceButton onClick={priceButtonClick} id='5' className={priceButtonStyle[1]}>5 €</PriceButton>
                <PriceButton onClick={priceButtonClick} id='10' className={priceButtonStyle[2]}>10 €</PriceButton>
                <PriceButton onClick={priceButtonClick} id='20' className={priceButtonStyle[3]}>20 €</PriceButton>
                <PriceButton onClick={priceButtonClick} id='30' className={priceButtonStyle[4]}>30 €</PriceButton>
                <PriceButton onClick={priceButtonClick} id='50' className={priceButtonStyle[5]}>50 €</PriceButton>
                <PriceButton onClick={priceButtonClick} id='100' className={priceButtonStyle[6]}>100 €</PriceButton>
                <PriceInput onClick={priceInputClick} className={`border-2 ${priceInput.style} ${redBorders.priceInput}`}>
                  <input onChange={(e) => setPriceInput({value: e.currentTarget.value, style: priceInput.style})} value={priceInput.value=="" ? "" : priceInput.value} className='w-4/6 bg-transparent ml-2 text-black text-center border-b-2 font-bold outline-none'></input>
                  <div className='w-2/6 h-full flex justify-center items-center'><SubTitle>€</SubTitle></div>
                </PriceInput>
              </div>
          </div>
          <div className="flex justify-end mt-6 mb-6">
            <ContinueButton onClick={submitClick}>Pokračovať</ContinueButton>
          </div>
      </div>
  )
}

export default FirstPage
