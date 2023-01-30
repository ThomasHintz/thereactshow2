'use client'

import { useAudioPlayer } from '@/components/AudioProvider'
import { PlayButton } from '@/components/player/PlayButton'

export function PlayButtonClient({ audioPlayerData, size }) {
  let player = useAudioPlayer(audioPlayerData)

  return (
    <PlayButton player={player} size={size} />
  );
};
