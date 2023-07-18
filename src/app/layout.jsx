import './globals.css';

import { AudioPlayer } from '@/components/player/AudioPlayer'
import { AudioProvider } from '@/components/AudioProvider'

import Providers from './providers';

export const metadata = {
  title: {
    default: 'The React Show - Weekly React Focused Podcast',
    template: '%s | The React Show'
  }
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          <Providers>{children}</Providers>
          <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
            <AudioPlayer />
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
