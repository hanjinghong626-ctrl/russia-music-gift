import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '../../../components/SiteHeader'
import ApplicationActions from '../../../components/ApplicationActions'
import { conservatories } from '../../data/conservatories'

export function generateStaticParams() {
  return conservatories.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const school = conservatories.find(s => s.slug === slug)
  return {
    title: school ? `${school.name} | 俄罗斯音乐留学` : '院校档案',
    description: school ? `${school.name}的 2026/27 招生、声乐考试、俄语要求与官方入口。` : '俄罗斯音乐院校档案',
  }
}

function ExternalLink({ href, children, quiet = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={quiet
        ? 'inline-flex items-center gap-1.5 text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-[#8b1e24]'
        : 'inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-sm text-white transition hover:bg-white/16'}
    >
      {children}<span aria-hidden>↗</span>
    </a>
  )
}

function SectionCard({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`rounded-[28px] border border-[#ddd5c5] bg-white/86 p-6 md:p-8 ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl text-slate-950">{title}</h2>
      <div className="mt-5 text-sm leading-7 text-slate-600">{children}</div>
    </section>
  )
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex gap-3">
          <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#a36c32]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function SchoolDetailPage({ params }) {
  const { slug } = await params
  const school = conservatories.find(s => s.slug === slug)
  if (!school) notFound()

  const verified = school.verification.level === 'verified'

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-slate-900">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#0b1722] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(201,154,72,.16),transparent_30%),radial-gradient(circle_at_10%_0%,rgba(139,30,36,.18),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Link href="/schools" className="text-sm text-white/55 transition hover:text-white">← 返回院校数据库</Link>

          <div className="mt-9 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${verified ? 'border-emerald-200/25 bg-emerald-300/10 text-emerald-100' : 'border-amber-200/25 bg-amber-300/10 text-amber-100'}`}>
              {school.verification.label}
            </span>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] text-white/60">核实至 {school.verification.asOf}</span>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_310px] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2 text-xs text-amber-200/75"><span>{school.city}</span><span>·</span><span>创办传统 {school.founded}</span></div>
              <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">{school.name}</h1>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-white/45 md:text-base">{school.nameRu}</p>
              <p className="mt-6 max-w-3xl text-sm leading-7 text-white/66 md:text-base md:leading-8">{school.short}</p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <ExternalLink href={school.official.admission}>招生入口</ExternalLink>
                <ExternalLink href={school.official.website}>学校官网</ExternalLink>
              </div>
              <ApplicationActions school={{ slug: school.slug }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        <div className={`rounded-[24px] border px-5 py-4 text-sm leading-7 ${verified ? 'border-emerald-900/10 bg-emerald-50/70 text-emerald-950/75' : 'border-amber-900/10 bg-amber-50 text-amber-950/75'}`}>
          <strong className="font-semibold text-current">信息状态：</strong> {school.verification.note} {school.cycleNote}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <SectionCard eyebrow="Study route" title="可申请层级 / 声乐路径">
            <BulletList items={school.studyLevels} />
          </SectionCard>

          <SectionCard eyebrow="Language" title="俄语要求">
            <p>{school.language}</p>
          </SectionCard>

          <SectionCard eyebrow="Vocal entrance" title="声乐专业考试">
            <BulletList items={school.vocalExam} />
          </SectionCard>

          <SectionCard eyebrow="Repertoire" title="曲目准备">
            <BulletList items={school.repertoire} />
          </SectionCard>
        </div>

        <section className="mt-5 overflow-hidden rounded-[28px] border border-[#d8cfbf] bg-[#efe7d6]">
          <div className="border-b border-amber-950/10 px-6 py-6 md:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-900/55">2026 / 2027 cycle</p>
            <h2 className="mt-2 font-serif text-2xl">申请时间线</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {school.timeline.map(([date, detail], index) => (
              <div key={`${date}-${index}`} className="border-b border-amber-950/10 p-6 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0">
                <p className="font-serif text-xl text-[#7d4b22]">{date}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
          <SectionCard eyebrow="Contact" title="官方入口">
            <div className="space-y-3">
              <p><span className="text-slate-400">招生联系：</span>{school.official.contact}</p>
              <div><ExternalLink href={school.official.admission} quiet>打开招生页面</ExternalLink></div>
              {school.official.vocal && <div><ExternalLink href={school.official.vocal} quiet>打开声乐 / 专业要求</ExternalLink></div>}
              <div><ExternalLink href={school.official.website} quiet>打开学校官网</ExternalLink></div>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Sources" title="信息来源与核实原则">
            <p className="mb-5">本页优先使用院校官网、学校招生系统和俄罗斯官方文化机构。没有在 2026/27 官方材料中核实到的细节，会明确写成“需确认”，不会用往年或中介文章填空。</p>
            <div className="space-y-3 border-t border-slate-100 pt-5">
              {school.sources.map(([label, href]) => (
                <div key={href}><ExternalLink href={href} quiet>{label}</ExternalLink></div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-[26px] bg-[#101b27] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-serif text-xl">下一轮申请前，再核对一次官网。</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">俄罗斯院校的日期、名额、考试节目和外国申请规则可能逐年调整。本平台把 2026/27 做成“已核实基准”，不是替代下一年度官方简章。</p>
          </div>
          <Link href="/schools" className="mt-2 inline-flex shrink-0 items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 md:mt-0">继续比较院校</Link>
        </div>
      </section>
    </main>
  )
}
