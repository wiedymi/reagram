import React, { useState, useCallback } from 'react'
import gql from 'graphql-tag'
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
      <S.Main>Desktop</S.Main>
    </Layout>
  )
}

export default Main
