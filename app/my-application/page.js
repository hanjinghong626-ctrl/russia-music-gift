import SiteHeader from '../../components/SiteHeader'
import MyApplicationClient from './MyApplicationClient'
import { conservatories } from '../data/conservatories'

export const metadata = {
  title: '我的申请',
  description: '管理俄罗斯音乐留学目标院校、收藏、准备清单与申请进度。',
}

export default function MyApplicationPage() {
  const schools = conservatories.map(school => ({
    slug: school.slug,
    name: school.name,
    nameRu: school.nameRu,
    city: school.city,
    focus: school.focus,
    verification: school.verification,
    official: school.official,
    language: school.language,
    vocalExam: school.vocalExam,
    repertoire: school.repertoire,
    cycleNote: school.cycleNote,
  }))

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-slate-900">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#0b1722] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(201,154,72,.18),transparent_30%),radial-gradient(circle_at_10%_20%,rgba(139,30,36,.2),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/65">Personal application desk</p>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl">我的申请</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
            收藏用于比较，目标院校用于执行。每所目标院校都有独立的俄语、曲目、材料与考试准备进度。
          </p>
          <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs text-white/55">
            本地模式 · 无需注册 · 数据仅保存在当前浏览器
          </div>
        </div>
      </section>
      <MyApplicationClient schools={schools} />
    </main>
  )
}
