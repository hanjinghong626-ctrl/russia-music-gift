import SiteHeader from '../../components/SiteHeader'
import SchoolsClient from './SchoolsClient'
import { conservatories } from '../data/conservatories'

export const metadata = {
  title: '俄罗斯音乐院校 | 俄罗斯音乐留学',
  description: '按城市、专业方向与 2026/27 官方核实状态浏览俄罗斯主要音乐学院。',
}

export default function SchoolsPage() {
  const verifiedCount = conservatories.filter(s => s.verification.level === 'verified').length

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[#d9d0c0] bg-[#101b27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(201,154,72,.16),transparent_30%),radial-gradient(circle_at_10%_0%,rgba(139,30,36,.20),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/75">Conservatory Guide · 2026/27</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-5xl">从“认识学校”，推进到“能开始准备申请”。</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base md:leading-8">每所院校现在都尽量给出官方入口、声乐路径、考试结构、俄语要求和招生时间线。已核实与待核实信息分开标注，不用旧年份或中介转载补空白。</p>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div><p className="font-serif text-2xl text-amber-100">{conservatories.length}</p><p className="mt-1 text-[11px] text-white/45">核心院校</p></div>
              <div><p className="font-serif text-2xl text-amber-100">{verifiedCount}</p><p className="mt-1 text-[11px] text-white/45">官方已核实</p></div>
              <div><p className="font-serif text-2xl text-amber-100">2026</p><p className="mt-1 text-[11px] text-white/45">当前基准年</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[#ddd5c5] bg-[#efe7d6]/70">
        <div className="mx-auto max-w-7xl px-5 py-3 text-xs leading-5 text-slate-600 md:px-8">
          说明：现在是 2026 年 9 月，2026/27 招生周期大多已经结束。本页保留“已核实基准”，方便为下一轮提前准备；2027/28 发布后需要重新核对日期、名额和考试节目。
        </div>
      </div>

      <SchoolsClient schools={conservatories} />
    </main>
  )
}
