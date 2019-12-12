import React, { ReactNode, useState, useRef } from 'react'
import { getAudioFile, fancyTimeFormat, bytesToSize, useTelegram, USE_TELEGRAM } from '@/helpers'
import { TYPES } from '@/constants'
import * as C from '@/components/common'
import * as S from './styles'

type IAudioMessage = {
  children: ReactNode;
  message: object;
  me: object;
  index: number;
}

const getTime = (time): string => {
  const date = new Date(+`${time}000`)

  return `${date.getHours()}:${date.getMinutes()}`
}

const toPercents = (portion, total): string => {
  return ((portion / total) * 100).toFixed(2)
}

const handleDownloadProcessFile = (id, update): string => {
  console.log('update', update)
  const { file } = update

  const total = file.expectedSize
  const portion = file.local.downloadedSize

  if (file.id !== id) {
    return null
  }

  const percentage = toPercents(portion, total) + '%'

  const result = `${percentage} - ${bytesToSize(portion)} of ${bytesToSize(total)}`

  return result
}

export const AudioMessage = ({ message, me }: IAudioMessage): ReactNode => {
  const audioRef = useRef()
  const [audio, setAudio] = useState(false)
  const [audioStatus, setAudioState] = useState({
    playing: false,
  })

  const [timeTracking, setTimeTracking] = useState({
    time: '',
    percentageTime: 0,
  })

  const { id } = message.content.audio.audio
  const { title, performer } = message.content.audio
  const query = {
    id,
    type: TYPES.FILES.AUDIO,
    priority: 3,
  }

  const [play, { updating, processing, storage }] = useTelegram(USE_TELEGRAM.PLAY_AUDIO)

  const { files } = storage.getState()

  const isChashed = getAudioFile(id, files)
  if (isChashed && !audio) {
    setAudio(isChashed)
  }

  const handleClick = async (): void => {
    if (!audio) {
      const result = await play(query)

      setAudio(getAudioFile(id, result.files))

      return
    }

    if (!audioStatus.playing) {
      audioRef.current.play()
      setAudioState({
        playing: true,
      })

      return
    }

    audioRef.current.pause()
    setAudioState({
      playing: false,
    })
  }

  const isMe = message.senderUserId === me.id
  const onTimeUpdate = (): void => {
    const { currentTime, duration } = audioRef.current
    const portion = Math.floor(currentTime)
    const total = Math.floor(duration)
    const time = fancyTimeFormat(portion) + ' / ' + fancyTimeFormat(total)

    const percentageTime = toPercents(portion, total)

    setTimeTracking({ time, percentageTime })
  }

  const setMoment = (e): string => {
    const elemRect = e.target.getBoundingClientRect()

    const rawPercents = toPercents(e.pageX - elemRect.left, elemRect.width)

    const percents = +`${+rawPercents === 100 ? 1 : '0.' + Math.floor(rawPercents)}`
    const newTime = audioRef.current.duration * percents
    audioRef.current.currentTime = newTime
  }

  return (
    <S.MessageBubble isMe={isMe}>
      <S.Message flex>
        {audio && (
          <audio src={audio} hidden ref={audioRef} onTimeUpdate={onTimeUpdate}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        )}
        <S.PlayButton onClick={handleClick} isMe={isMe}>
          {!processing && <C.Icon image={audioStatus.playing ? 'pause_svg.svg' : 'play_svg.svg'} />}
          {!audio && processing && <C.Icon image="close_svg.svg" />}
        </S.PlayButton>
        <S.AudioInfo>
          <S.AudioTitle>{title}</S.AudioTitle>
          {timeTracking.time.length > 0 ? (
            <C.LinearProgress value={timeTracking.percentageTime} handleClick={setMoment} />
          ) : (
            <S.AudioSubtitle isMe={isMe}>{performer}</S.AudioSubtitle>
          )}
          {timeTracking && <p>{timeTracking.time}</p>}
          {processing && (
            <S.AudioLoadingText>{handleDownloadProcessFile(id, updating)}</S.AudioLoadingText>
          )}
        </S.AudioInfo>
      </S.Message>
      <S.Status>
        <S.Date>{getTime(message.date)}</S.Date>
      </S.Status>
    </S.MessageBubble>
  )
}
