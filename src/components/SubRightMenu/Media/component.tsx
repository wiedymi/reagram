import React, { ReactNode, useState } from 'react'
import * as S from './styles'

type IMedia = {
  children: ReactNode
}

const Media = (props: IMedia): ReactNode => {
  const [tab, setTab] = useState('Media')

  const handleChange = (e, nextTab): void => {
    setTab(nextTab)
  }

  return (
    <S.Wrapper>
      <S.Tabs value={tab} onChange={handleChange} aria-label="styled tabs example">
        <S.Tab label="Media" value={'Media'} />
        <S.Tab label="Docs" value={'Docs'} />
        <S.Tab label="Links" value={'Links'} />
        <S.Tab label="Audio" value={'Audio'} />
      </S.Tabs>
    </S.Wrapper>
  )
}

export default Media
