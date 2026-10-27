import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
} from '@tanstack/react-router'
import { WaveSurfaceMenu } from '../components/WaveSurfaceMenu'
import { CATEGORIES, DEFAULT_CATEGORY_INDEX } from '../features/home/content'

export const Route = createFileRoute('/_menu')({
  component: MenuLayout,
})

/** The wave surface and menu stay mounted while the section changes. */
function MenuLayout() {
  const { category } = useParams({ strict: false })
  const index = CATEGORIES.findIndex(({ id }) => id === category)

  return (
    <WaveSurfaceMenu
      presets={CATEGORIES}
      surfaceIndex={index === -1 ? DEFAULT_CATEGORY_INDEX : index}
      renderItem={(item, className) => (
        <Link
          to="/$category"
          params={{ category: item.id }}
          className={className}
        >
          {item.label}
        </Link>
      )}
    >
      <Outlet />
    </WaveSurfaceMenu>
  )
}
