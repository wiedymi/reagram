import React, { ReactNode } from 'react'
import { getAnimationFile, convertTime } from '@/helpers'
import { getAvatar } from '@/telegram/hooks'
import { TYPES } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

type IAnimationMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

const chooseAnimation = (animation): object => {
  const {
    height,
    width,
    animation: { id },
  } = animation

  return { id, height, width }
}

export const AnimationMessage = ({ message, me, index }: IAnimationMessage): ReactNode => {
  const { id, height, width } = chooseAnimation(message.content.animation)
  const query = {
    id,
    type: TYPES.FILES.ANIMATION,
    priority: index + 1,
  }
  const { data, loading, refetch } = getAvatar(query)

  if (loading) {
    return (
      <S.MessageBubble isMe={message.senderUserId === me.id} height={height} withoutText>
        <S.LoadingWrapper width={width} height={height}>
          <C.Loading width={width} height={height} />
          <S.Status>
            <S.Date image withoutText>
              {convertTime(message.date)}
            </S.Date>
          </S.Status>
        </S.LoadingWrapper>
      </S.MessageBubble>
    )
  }

  const animation = !loading && data ? getAnimationFile(id, data.files, refetch) : ''

  return (
    <S.MessageBubble isMe={message.senderUserId === me.id} height={height} withoutText>
      <S.Animation src={animation} withoutText width={width} height={height}
autoPlay muted loop />
      <S.Status>
        <S.Date image withoutText>
          {convertTime(message.date)}
        </S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
