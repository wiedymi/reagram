import React, { ReactNode } from 'react'
import { Icon } from '@/components/common'
import * as S from './styles'

type INoSelectedChat = {
  children: ReactNode
}

const options = [
  {
    text: 'Private',
    icon: 'newprivate_svg.svg',
  },
  {
    text: 'Group',
    icon: 'newgroup_svg.svg',
  },
  {
    text: 'Channel',
    icon: 'newchannel_svg.svg',
  },
]

const NoSelectedChat = (props: INoSelectedChat): ReactNode => {
  return (
    <S.Wrapper>
      <S.Forum />
      <S.Title>
        Open Chat <br /> or create a new one
      </S.Title>
      <S.OptionsWrapper>
        {options.map(({ text, icon }) => {
          return (
            <S.CircleWrapper key={text}>
              <S.Circle>
                <Icon image={icon} sizeIcon="40px" />
              </S.Circle>
              <S.Subtitle>{text}</S.Subtitle>
            </S.CircleWrapper>
          )
        })}
      </S.OptionsWrapper>
    </S.Wrapper>
  )
}

export default NoSelectedChat
