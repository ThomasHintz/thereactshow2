'use client'
import { useMemo } from 'react'

import { useAudioPlayer } from '@/components/AudioProvider'

function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
         <path
           fillRule="evenodd"
           clipRule="evenodd"
           d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
         />
      ) : (
         <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  )
}

export default function Player({ episode, startTime, endTime, children }) {
  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.slug}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)
  const withinTimeframe = player.currentTime >= startTime && player.currentTime <= endTime
  return (
    <button
      onClick={() => { startTime ? (withinTimeframe ? player.toggle() : player.play(startTime)) : player.toggle(); }}
      type="button"
      className={`${startTime ? 'inline-flex mr-2': 'flex'} items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900`}
      aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
                episode.title
              }`}
    >
      <PlayPauseIcon
        playing={startTime ? player.playing && withinTimeframe : player.playing}
        className="h-2.5 w-2.5 fill-current"
      />
      {children}
    </button>
  );
}
