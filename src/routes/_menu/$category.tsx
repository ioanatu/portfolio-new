import { createFileRoute, redirect } from '@tanstack/react-router'
import { CertificationBadges } from '../../components/CertificationBadges'
import { SectionPanel } from '../../components/SectionPanel'
import { SECTION_CONTENT } from '../../features/home/content'

export const Route = createFileRoute('/_menu/$category')({
  beforeLoad: ({ params }) => {
    if (!(params.category in SECTION_CONTENT)) throw redirect({ to: '/' })
  },
  component: Section,
})

function Section() {
  const { category } = Route.useParams()
  const { title, paragraphs, certifications } = SECTION_CONTENT[category]

  // Keyed so the rise-in animation replays for every section
  return (
    <SectionPanel
      key={category}
      title={title}
      rise={!certifications}
      wide={!!certifications}
    >
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {certifications && (
        <CertificationBadges certifications={certifications} />
      )}
    </SectionPanel>
  )
}
