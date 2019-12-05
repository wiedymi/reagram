import React, { ReactNode, useRef, useState } from 'react'
import { toImage } from '@/helpers'
import { Wrapper, Image, Circle, Input } from './styles'

type Props = {
  children: ReactNode;
}

const SelectImage = (props: Props): ReactNode => {
  const inputEl = useRef(null)
  const [image, setImage] = useState(false)
  const handleFileChange = ({ target }): ReactNode => {
    const [file] = target.files

    const link = toImage(file)

    setImage(link)
  }

  const openPicker = (): void => {
    inputEl.current.click()
  }

  if (props.hidden && props.image) {
    return (
      <Wrapper>
        <Circle image={props.image} hidden>
          <Image src={''} />
        </Circle>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Input
        type="file"
        ref={inputEl}
        accept="image/*"
        capture="camera"
        onChange={handleFileChange}/>
      <Circle image={image}>
        <Image src={!image && '/icons/cameraadd_svg.svg'} onClick={openPicker} />
      </Circle>
    </Wrapper>
  )
}
SelectImage.defaultProps = {
  // bla: 'test',
}

export default SelectImage
