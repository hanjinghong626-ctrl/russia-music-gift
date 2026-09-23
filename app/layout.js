import './globals.css'

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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
