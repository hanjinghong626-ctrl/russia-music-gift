import Link from 'next/link'
import SiteHeader from '../../../components/SiteHeader'
import vocalData from '../../../public/data/vocal-exercises.json'
import VocalExercisesClient from './VocalExercisesClient'

export const metadata = {
  title: '经典练声曲库',
  description: '按作曲家与声部浏览经典声乐练声曲教材。',
}

export default function VocalExercisesPage() {
  const collections = vocalData.collections || []
  const metadata = vocalData.metadata || {}

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[#d9d0c0] bg-[#101b27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(139,30,36,.24),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(201,154,72,.16),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/45"><Link href="/sheet-music" className="hover:text-white">俄罗斯声乐曲库</Link><span>／</span><span>练声曲</span></div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/75">Vocal Technique Library</p>
          <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">经典练声曲库</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base md:leading-8">从基础呼吸、连贯发声到灵活性与声区统一，按经典教材建立一条可检索的技术训练路径。所有外部乐谱链接使用前请自行核对来源页面的版权与授权条件。</p>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div><p className="font-serif text-2xl text-amber-100">{metadata.totalCollections || collections.length}</p><p className="mt-1 text-[11px] text-white/45">曲集</p></div>
              <div><p className="font-serif text-2xl text-amber-100">{metadata.totalPieces || 515}</p><p className="mt-1 text-[11px] text-white/45">作品</p></div>
              <div><p className="font-serif text-2xl text-amber-100">6</p><p className="mt-1 text-[11px] text-white/45">声部类型</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="mb-7">
          <p className="gift-kicker">Collections</p>
          <h2 className="mt-2 font-serif text-3xl">按教材浏览</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">可按作曲家、曲集名称、难度或声部快速筛选。</p>
        </div>
        <VocalExercisesClient collections={collections} />
      </section>

      <section className="border-t border-[#ddd5c5] bg-[#efe7da]">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="gift-kicker">Practice Path</p>
          <h2 className="mt-2 font-serif text-3xl">练声曲怎么用，才不是“机械刷题”</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', '先确定技术目标', '每次只针对一两个问题：气息、连贯、换声区、灵活性或音准，不要把一首练声曲当成所有问题的万能药。'],
              ['02', '选择合适音区', '练习音高应服务于当前声部与技术状态。遇到不适合的调性，优先与教师确认是否移调。'],
              ['03', '从慢速建立动作', '先保证元音、呼吸和声区转换稳定，再逐步提高速度；技术动作不稳定时追求速度通常收益很低。'],
              ['04', '把技术迁移到作品', '练声曲的最终价值是进入艺术歌曲、歌剧咏叹调等真实音乐语境，而不是单独完成练习本身。'],
            ].map(([n,t,d]) => <div key={n} className="rounded-[24px] border border-[#d9cfbf] bg-white/65 p-5"><p className="font-serif text-xl text-[#8b1e24]">{n}</p><h3 className="mt-4 font-semibold">{t}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{d}</p></div>)}
          </div>
        </div>
      </section>
    </main>
  )
}
