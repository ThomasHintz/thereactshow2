import './globals.css';

import { AudioPlayer } from '@/components/player/AudioPlayer'
import { AudioProvider } from '@/components/AudioProvider'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          {children}
          <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
            <AudioPlayer />
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
