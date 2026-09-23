import './globals.css'
import { Noto_Serif_SC, Noto_Sans_SC, Playfair_Display } from 'next/font/google'

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-sc',
  display: 'swap',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-sc',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: {
    default: '俄罗斯音乐留学',
    template: '%s · 俄罗斯音乐留学',
  },
  description: '面向中文音乐学习者的俄罗斯音乐留学、院校、曲库、音乐史与俄中术语知识平台。',
  applicationName: '俄罗斯音乐留学',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: '俄音留学',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f7f3ea',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={`${notoSerifSC.variable} ${notoSansSC.variable} ${playfair.variable}`}>
      <body className="font-sans-sc">{children}</body>
    </html>
  )
}
