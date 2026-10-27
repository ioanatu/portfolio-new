import cloudPractitioner from '../../assets/certifications/cloud-practitioner.png'
import aiPractitioner from '../../assets/certifications/ai-practitioner.png'
import solutionsArchitectAssociate from '../../assets/certifications/solutions-architect-associate.png'
import type { Certification } from '../../components/CertificationBadges'
import { DEFAULT_PRESETS } from '../../components/WaveSurfaceMenu'

export const CATEGORIES = DEFAULT_PRESETS
export const DEFAULT_CATEGORY_INDEX = 1

export interface SectionContent {
  title: string
  paragraphs: readonly string[]
  certifications?: readonly Certification[]
}

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
]

const AWS_CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner (CLF-C02)',
    image: cloudPractitioner,
    issued: '2021-10',
  },
  {
    name: 'AWS Certified AI Practitioner (AIF-C01)',
    image: aiPractitioner,
    issued: '2026-09',
  },
  {
    name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    image: solutionsArchitectAssociate,
    issued: '2026-10',
  },
]

export const HOME_CONTENT: SectionContent = {
  title: 'Hello',
  paragraphs: LOREM,
}

export const SECTION_CONTENT: Readonly<Record<string, SectionContent>> =
  Object.fromEntries(
    CATEGORIES.map((category) => [
      category.id,
      {
        title: category.label,
        paragraphs: LOREM,
        ...(category.id === 'aws-certifications' && {
          paragraphs: LOREM.slice(0, 1),
          certifications: AWS_CERTIFICATIONS,
        }),
      },
    ]),
  )
