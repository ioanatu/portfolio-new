import { createFileRoute } from '@tanstack/react-router'
import { SectionPanel } from '../../components/SectionPanel'
import { HOME_CONTENT } from '../../features/home/content'

export const Route = createFileRoute('/_menu/')({
  component: Home,
})

function Home() {
  return (
    <SectionPanel title={HOME_CONTENT.title}>
      {HOME_CONTENT.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </SectionPanel>
  )
}
