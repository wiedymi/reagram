import React, { ReactNode, useState } from 'react'
import { Input } from '@/components/base'
import { authStyles } from '@/components/common'
import { AUTH_FORM } from '@/constants'
import { createAuthForm, authorizationStateWaitPhoneNumber, getListOfCountries } from '@/helpers'

const {
  Wrapper,
  Img,
  Content,
  Title,
  Subtitle,
  SelectItem,
  SelectWrapper,
  CountryCode,
  CountryName,
  Flag,
  CountryWrapper,
  NextStageButton,
} = authStyles

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
      <SelectItem key={country.iso2} value={country.dialCode}>
        <SelectWrapper>
          <CountryWrapper>
            <Flag>{country.flag}</Flag>
            <CountryName>{getCountryName(country.name)}</CountryName>
          </CountryWrapper>
          <CountryCode>+{country.dialCode}</CountryCode>
        </SelectWrapper>
      </SelectItem>
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
    <Wrapper>
      <Img src="/assert/logo.png" />
      <Content>
        <Title variant="h4">Sign in to Telegram</Title>
        <Subtitle>Please confirm your country and enter your phone number</Subtitle>
        <Input
          label={`Country`}
          variant="outlined"
          select
          placeholder="Country"
          onChange={handleSelect}
        >
          {getCountries()}
        </Input>
        <Input
          name={name}
          type="text"
          value={placeholderValue}
          onChange={validate}
          label={`Phone Number`}
          variant="outlined"/>

        <NextStageButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          nextStageButton={nextStageButton}
        >
          next
        </NextStageButton>
      </Content>
    </Wrapper>
  )
}

export default createAuthForm(AUTH_FORM.PHONE, authorizationStateWaitPhoneNumber, PhoneForm)
