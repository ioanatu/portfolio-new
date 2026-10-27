import type { ReactNode, Ref } from 'react'
import styles from './CategoryMenu.module.css'

export interface CategoryMenuItem {
  id: string
  label: string
}

interface CategoryMenuProps {
  items: readonly CategoryMenuItem[]
  /**
   * Renders one item's interactive element, e.g. a router `Link`. It must apply
   * `className` and mark the active item with `aria-current`.
   */
  renderItem: (item: CategoryMenuItem, className: string) => ReactNode
  ariaLabel?: string
  ref?: Ref<HTMLElement>
}

export function CategoryMenu({
  items,
  renderItem,
  ariaLabel = 'Categories',
  ref,
}: CategoryMenuProps) {
  return (
    <nav ref={ref} className={styles.menu} aria-label={ariaLabel}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>{renderItem(item, styles.item)}</li>
        ))}
      </ul>
    </nav>
  )
}
