import SiteHeader from '../../components/SiteHeader'
import './globals.css'

export default function MusicHistoryLayout({ children }) {
  return (
    <div className="music-history-wrapper">
      <SiteHeader />
      {children}
    </div>
  )
}
