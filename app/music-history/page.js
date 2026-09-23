import Link from 'next/link'
import { periods } from './data/periods'

const modules = [
  { href: '/music-history/composers', mark: '01', title: '作曲家档案', ru: 'Композиторы', desc: '按人物进入俄罗斯音乐史，理解创作阶段、风格、学派与代表作品。' },
  { href: '/music-history/schools', mark: '02', title: '俄罗斯音乐学派', ru: 'Музыкальные школы', desc: '理解民族乐派、学院传统与不同创作谱系之间的继承、分化与影响。' },
  { href: '/music-history/topics/romance', mark: '03', title: '俄罗斯浪漫曲', ru: 'Русский романс', desc: '以诗歌、语言、声乐与钢琴织体为线索，梳理俄罗斯艺术歌曲的发展脉络。' },
  { href: '/music-history/topics/opera', mark: '04', title: '俄罗斯歌剧', ru: 'Русская опера', desc: '从民族题材、文学改编到人物塑造，进入俄罗斯歌剧的核心作品与历史语境。' },
  { href: '/music-history/glossary', mark: '05', title: '俄中音乐百科', ru: 'Музыкальный словарь', desc: '集中查询俄中音乐术语、体裁、技法与音乐史概念，适合学习与论文写作。' },
]

export default function MusicHistoryPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <section className="relative overflow-hidden border-b border-[#d9d0c0] bg-[#101b27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(139,30,36,.22),transparent_33%),radial-gradient(circle_at_82%_14%,rgba(201,154,72,.15),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/75">Russian Music History</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">把人物、作品、学派与历史时期连成一条线。</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base md:leading-8">这部分不是按“地图地点”浏览，而是按知识关系组织：先建立时代框架，再进入作曲家、歌剧、浪漫曲与术语。</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="gift-kicker">Knowledge Modules</p>
            <h2 className="mt-2 font-serif text-3xl">五个入口，建立完整知识框架</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {modules.map((item, index) => (
                <Link key={item.href} href={item.href} className={`group rounded-[26px] border border-[#ddd5c5] bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#c9b995] hover:shadow-xl hover:shadow-slate-900/5 ${index === modules.length - 1 ? 'sm:col-span-2' : ''}`}>
                  <div className="flex items-center justify-between"><span className="font-serif text-lg text-[#8b1e24]">{item.mark}</span><span className="text-xs text-slate-300">→</span></div>
                  <h3 className="mt-6 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{item.ru}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#d8cebd] bg-[#ede4d5] p-6 md:p-8">
            <p className="gift-kicker">How to read</p>
            <h2 className="mt-2 font-serif text-3xl">建议的学习顺序</h2>
            <div className="mt-7 space-y-5">
              {[
                ['1', '先看时期', '知道作品所处的历史位置，不把不同年代的语言混在一起。'],
                ['2', '再看人物与学派', '理解作曲家之间真正的师承、审美分歧和共同语汇。'],
                ['3', '进入体裁专题', '用歌剧和浪漫曲把“音乐史知识”转化成具体作品经验。'],
                ['4', '最后查术语', '在阅读、上课和论文写作时，把俄语专业词汇补进知识结构。'],
              ].map(([n, t, d]) => (
                <div key={n} className="grid grid-cols-[36px_1fr] gap-3 border-b border-[#d8cebd] pb-5 last:border-0 last:pb-0">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#101b27] font-serif text-sm text-amber-100">{n}</span>
                  <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{d}</p></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#ddd5c5] bg-white/55">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="gift-kicker">Timeline</p>
          <h2 className="mt-2 font-serif text-3xl">五段时期脉络</h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-5">
            {periods.map((period, index) => (
              <article key={period.id} className="relative rounded-[24px] border border-[#ddd5c5] bg-[#faf7f0] p-5">
                <div className="flex items-center justify-between"><span className="font-serif text-lg text-[#8b1e24]">{String(index + 1).padStart(2, '0')}</span><span className="text-[10px] text-slate-400">{period.startYear}—{period.endYear}</span></div>
                <h3 className="mt-5 font-serif text-xl leading-snug">{period.name}</h3>
                <p className="mt-1 min-h-9 text-[11px] leading-5 text-slate-400">{period.nameRu}</p>
                <p className="mt-4 text-xs leading-6 text-slate-600">{period.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="rounded-[28px] bg-[#101b27] p-7 text-white md:flex md:items-center md:justify-between md:p-9">
          <div><p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Start here</p><h2 className="mt-2 font-serif text-2xl md:text-3xl">第一次进入，建议先从作曲家开始。</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">人物最容易建立记忆锚点，再向作品、学派和时期扩展。</p></div>
          <Link href="/music-history/composers" className="mt-6 inline-flex rounded-full bg-amber-100 px-5 py-3 text-sm font-semibold text-slate-950 md:mt-0">浏览作曲家 →</Link>
        </div>
      </section>
    </main>
  )
}
