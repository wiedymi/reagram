import React, { ReactNode, useState } from 'react'
import * as C from '@/components/common'
import { AUTH_FORM } from '@/constants'
import { createAuthForm, authorizationStateWaitPhoneNumber, getListOfCountries } from '@/helpers'

type Props = {
  children: ReactNode;
  name: string;
  state: Any;
  type: string;
  value: string;
  handleChange(): void;
  handleClick(): void;
}

const getCountries = (): ReactNode => {
  const countries = getListOfCountries()
  const getCountryName = (name): string => {
    if (name.indexOf('United') !== -1) {
      return name.split(' ')[0] + ' ' + name.split(' ')[1]
    }

    return name.split(' ')[0]
  }

  return countries.map(country => {
    return (
      <C.authStyles.SelectItem key={country.iso2} value={country.dialCode}>
        <C.authStyles.SelectWrapper>
          <C.authStyles.CountryWrapper>
            <C.authStyles.Flag>{country.flag}</C.authStyles.Flag>
            <C.authStyles.CountryName>{getCountryName(country.name)}</C.authStyles.CountryName>
          </C.authStyles.CountryWrapper>
          <C.authStyles.CountryCode>+{country.dialCode}</C.authStyles.CountryCode>
        </C.authStyles.SelectWrapper>
      </C.authStyles.SelectItem>
    )
  })
}

const PhoneForm = (props: Props): ReactNode => {
  const { name, value, handleChange, handleClick } = props
  const [countryCode, setCountryCode] = useState('')
  const [nextStageButton, setNextStageButton] = useState(false)
  const placeholderValue = countryCode.length > 0 && value.indexOf('+') === -1 ? '+' + value : value
  const handleSelect = ({ target }): void => {
    if (countryCode.length === 0) {
      setCountryCode(`+${target.value}`)
    }

    handleChange({
      target: {
        value: target.value.replace('+', ''),
      },
    })
  }

  const validate = ({ target }): void => {
    const phone = target.value.replace('+', '')

    const isValid = /(7|8|9)\d{9}/.test(phone)
    const isDigital = /^-?\d*\.?\d*$/.test(phone)

    if (!isDigital) {
      return
    }

    setNextStageButton(false)
    if (isValid) {
      setNextStageButton(true)
    }

    handleChange({
      target: {
        value: phone,
      },
    })
  }

  return (
    <C.authStyles.Wrapper>
      <C.authStyles.Img src="/assert/logo.png" />
      <C.authStyles.Content>
        <C.authStyles.Title variant="h4">Sign in to Telegram</C.authStyles.Title>
        <C.authStyles.Subtitle>
          Please confirm your country and enter your phone number
        </C.authStyles.Subtitle>
        <C.Input
          label={`Country`}
          variant="outlined"
          select
          placeholder="Country"
          onChange={handleSelect}
        >
          {getCountries()}
        </C.Input>
        <C.Input
          name={name}
          type="text"
          value={placeholderValue}
          onChange={validate}
          label={`Phone Number`}
          variant="outlined"/>

        <C.authStyles.NextStageButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          nextStageButton={nextStageButton}
        >
          next
        </C.authStyles.NextStageButton>
      </C.authStyles.Content>
    </C.authStyles.Wrapper>
  )
}

export default createAuthForm(AUTH_FORM.PHONE, authorizationStateWaitPhoneNumber, PhoneForm)
