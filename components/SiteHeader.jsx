'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['/', '首页'],
  ['/schools', '院校'],
  ['/sheet-music', '曲库'],
  ['/music-history', '音乐史'],
  ['/music-history/glossary', '百科'],
  ['/evaluate', '作品预检'],
  ['/my-application', '我的申请'],
]

function isActive(pathname, href) {
  if (href === '/') return pathname === '/'
  if (href === '/music-history') return pathname === '/music-history' || (pathname.startsWith('/music-history/') && !pathname.startsWith('/music-history/glossary'))
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function SiteHeader({ overlay = false }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  const shell = overlay
    ? 'fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08111c]/45 text-white backdrop-blur-xl'
    : 'sticky top-0 z-50 border-b border-[#ddd5c5]/80 bg-[#fbf8f1]/92 text-slate-900 backdrop-blur-xl'

  return (
    <header className={`${shell} pt-[env(safe-area-inset-top)]`}>
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif-sc text-lg transition ${overlay ? 'border-amber-100/25 bg-white/10 text-amber-100 group-hover:border-amber-100/50' : 'border-[#d8ccb6] bg-[#101b27] text-amber-100 group-hover:bg-[#172536]'}`}>♪</span>
          <span className="min-w-0">
            <span className="block truncate font-serif-sc text-[15px] font-semibold tracking-[0.06em] md:text-[17px]">俄罗斯音乐留学</span>
            <span className={`hidden font-display text-[9px] uppercase tracking-[0.25em] sm:block ${overlay ? 'text-white/45' : 'text-slate-400'}`}>Russian Music Study</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map(([href, label]) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-2 transition ${
                  active
                    ? overlay ? 'bg-white/12 text-white' : 'bg-[#ece4d5] text-slate-950'
                    : overlay ? 'text-white/68 hover:bg-white/8 hover:text-white' : 'text-slate-600 hover:bg-white hover:text-slate-950'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? '关闭导航' : '打开导航'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl border transition md:hidden ${overlay ? 'border-white/20 bg-white/8' : 'border-[#ddd5c5] bg-white'}`}
        >
          <span className="text-xl leading-none">{open ? '×' : '≡'}</span>
        </button>
      </div>

      {open && (
        <nav className={`border-t px-5 py-4 md:hidden ${overlay ? 'border-white/10 bg-[#08111c]/95' : 'border-[#ddd5c5] bg-[#fbf8f1]'}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {links.map(([href, label]) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-2xl px-4 py-3 text-sm transition ${active ? (overlay ? 'bg-white/12 text-white' : 'bg-[#101b27] text-white') : (overlay ? 'bg-white/5 text-white/78' : 'bg-white text-slate-700')}`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
