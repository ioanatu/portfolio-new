import { DEFAULT_PRESETS } from '../../components/WaveSurfaceMenu'

export const CATEGORIES = DEFAULT_PRESETS
export const DEFAULT_CATEGORY_INDEX = 1

export interface SectionContent {
  title: string
  paragraphs: readonly string[]
}

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
]

export const HOME_CONTENT: SectionContent = {
  title: 'Hello',
  paragraphs: LOREM,
}

export const SECTION_CONTENT: Readonly<Record<string, SectionContent>> =
  Object.fromEntries(
    CATEGORIES.map((category) => [
      category.id,
      { title: category.label, paragraphs: LOREM },
    ]),
  )
