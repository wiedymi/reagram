import React, { ReactNode } from 'react'
import * as S from './styles'
import CloseIcon from '@material-ui/icons/Close'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'

type Props = {
  children: ReactNode
}

const Header = ({ toggleRightMenu }: Props): ReactNode => (
  <S.Wrapper>
    <S.LeftNav>
      <S.IconButton onClick={toggleRightMenu}>
        <CloseIcon />
      </S.IconButton>
    </S.LeftNav>
    <S.MiddleNav>
      <S.Title>Info</S.Title>
    </S.MiddleNav>
    <S.RightNav>
      <S.IconButton>
        <MoreVertRoundedIcon />
      </S.IconButton>
    </S.RightNav>
  </S.Wrapper>
)

export default Header
