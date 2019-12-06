import React, { ReactNode, useRef, useState } from 'react'
import { toImage } from '@/helpers'
import * as S from './styles'

type Props = {
  children: ReactNode;
}

const SelectImage = (props: Props): ReactNode => {
  const inputEl = useRef(null)
  const [image, setImage] = useState(props.image)
  const handleFileChange = ({ target }): ReactNode => {
    const [file] = target.files

    const link = toImage(file)

    setImage(link)
  }

  const openPicker = (): void => {
    inputEl.current.click()
  }

  if (props.hidden && image) {
    return (
      <S.Wrapper>
        <S.Circle image={image} hidden>
          <S.Image src={''} />
        </S.Circle>
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper>
      <S.Input
        type="file"
        ref={inputEl}
        accept="image/*"
        capture="camera"
        onChange={handleFileChange}/>
      <S.Circle image={image}>
        <S.Image
          src={!image ? '/icons/cameraadd_svg.svg' : props.select && '/icons/cameraadd_svg.svg'}
          onClick={openPicker}/>
      </S.Circle>
    </S.Wrapper>
  )
}

export default SelectImage
