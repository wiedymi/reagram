import React from 'react'
import Layout from 'components/Layout'
import Header from 'components/Header'
import * as S from './styles'

type Props = {
  children: ReactNode
}

function Main(props: Props) {
  return (
    <Layout>
      <Header />
      <S.Main>Content</S.Main>
    </Layout>
  )
}

export default Main
