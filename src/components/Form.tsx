import React, { useEffect, useState } from 'react'

//Flags
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
//Formik
import { useFormik } from 'formik';
//Styled components
import { FormInput, FormInputDiv, ContinueButton, BackButton } from "../styledComponents"
//Zod schema
import { personalInformationSchema } from "../zodSchemas/zodSchemas"
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { submitPersonal } from "../features/personalInformation"

interface Props {
    continueToNextPage: (pageNumber:number) => void
    backToPreviousPage: (pageNumber:number) => void
}

const Form = ({ continueToNextPage, backToPreviousPage }: Props) => {

    const dispatch = useDispatch();

    const personalInformation = useSelector((state: any) => state.personalInformation.value);

    useEffect(() => {
        //load values from Redux so when "back" is clicked from 3rd page data are not lost
        formik.setFieldValue("firstName", personalInformation.firstName)
        formik.setFieldValue("lastName", personalInformation.lastName)
        formik.setFieldValue("email", personalInformation.email)
        formik.setFieldValue("phone", personalInformation.phone)
    }, [])

    const formik = useFormik({
        initialValues: {firstName: "", lastName: "", email: "", prefix: "+421", phone: "" },
        onSubmit: values => {
            //zod validation
            const zodTest = personalInformationSchema.safeParse(values);
            if (!zodTest.success) {
                let err = (Object.values(zodTest.error.formErrors)[1]);
                if ("firstName" in err) {
                    formik.setFieldValue("firstName", "");
                    setFirstNameInputStyle({border:"border-red", placeholder:err!.firstName![0]})
                }
                if ("lastName" in err) {
                    formik.setFieldValue("lastName", "");
                    setLastNameInputStyle({border:"border-red", placeholder:err!.lastName![0]})
                }
                if ("email" in err) {
                    formik.setFieldValue("email", "");
                    setEmailInputStyle({border:"border-red", placeholder:err!.email![0]})
                }
                if ("phone" in err) {
                    formik.setFieldValue("phone", "");
                    setPhoneInputStyle({border:"border-red", placeholder:err!.phone![0]})
                }    
            } else {
                //Set Redux global state
                dispatch(submitPersonal(values))
                //Go to next page
                continueToNextPage(2);
            }
        }
    })

    const [firstNameInputStyle, setFirstNameInputStyle] = useState({border: "", placeholder: "Zadajte Vaše meno"});
    const [lastNameInputStyle, setLastNameInputStyle] = useState({border: "", placeholder: "Zadajte Vaše priezvisko"});
    const [emailInputStyle, setEmailInputStyle] = useState({border: "", placeholder: "Zadajte Váš e-mail"});
    const [phoneInputStyle, setPhoneInputStyle] = useState({border: "", placeholder: ""});

  return (
    <form onSubmit={formik.handleSubmit}>
        <FormInputDiv className={firstNameInputStyle.border}>
            <span className='text-black font-bold'>Meno</span>
            <FormInput onClick={() => setFirstNameInputStyle({border: "", placeholder: ""})} id='firstName' onChange={formik.handleChange} value={formik.values.firstName} placeholder={firstNameInputStyle.placeholder}></FormInput>
        </FormInputDiv>
        <FormInputDiv className={lastNameInputStyle.border}>
            <span className='text-black font-bold'>Priezvisko</span>
            <FormInput onClick={() => setLastNameInputStyle({border: "", placeholder: ""})} id='lastName' onChange={formik.handleChange} value={formik.values.lastName} placeholder={lastNameInputStyle.placeholder}></FormInput>
        </FormInputDiv>
        <FormInputDiv className={emailInputStyle.border}>
            <span className='text-black font-bold'>E-mailová adresa</span>
            <FormInput onClick={() => setEmailInputStyle({border: "", placeholder: ""})} id='email' onChange={formik.handleChange} value={formik.values.email} placeholder={emailInputStyle.placeholder}></FormInput>
        </FormInputDiv>

        <FormInputDiv className={phoneInputStyle.border}>
            <span className='text-black font-bold'>Telefónne číslo</span>
            <div className="join w-full bg-white">
                <select id='prefix' onChange={formik.handleChange} className="select join-item bg-white w-3/12 pl-0 pr-0 :active border-none">
                    <option value={"+421"} selected>{getUnicodeFlagIcon('SK')} +421</option>
                    <option value={"+420"}>{getUnicodeFlagIcon('CZ')} +420</option>
                </select>
                <input onClick={() => setPhoneInputStyle({border: "", placeholder: ""})} id='phone' onChange={formik.handleChange} className="input join-item bg-white w-9/12 p-0" value={formik.values.phone} placeholder={phoneInputStyle.placeholder}/>
            </div>
        </FormInputDiv>

        <div className='flex justify-between mt-6 mb-6'>
          <BackButton onClick={() => backToPreviousPage(2)} type='button'>Späť</BackButton>
          <ContinueButton type='submit'>Pokračovať</ContinueButton>
        </div>

    </form>
  )
}

export default Form
