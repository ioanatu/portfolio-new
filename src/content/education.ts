import nuaLogo from '../assets/education/nua-logo.png';
import spicedLogo from '../assets/education/spiced-logo.png';
import tuBerlinLogo from '../assets/education/tu-berlin-logo.png';

export type Study = {
  institution: string;
  years: string;
  title: string;
  logo: string;
  /** The logo is a full-bleed square instead of a mark that needs padding. */
  logoFills?: boolean;
};

export type Language = {
  name: string;
  level: string;
  certificates?: readonly { name: string; year: string }[];
};

export const EDUCATION_TITLE = 'Education & languages';
export const EDUCATION_INTRO =
  'Computer science at a technical university, an intensive engineering bootcamp, the visual training behind my eye for interfaces, and four working languages.';

export const STUDIES_TITLE = 'Studies';
export const LANGUAGES_TITLE = 'Languages';

export const STUDIES: readonly Study[] = [
  {
    institution: 'Spiced Academy, Berlin',
    years: '2020',
    title: 'Full Stack Web Development Bootcamp',
    logo: spicedLogo,
    logoFills: true,
  },
  {
    institution: 'Technische Universität Berlin',
    years: '2018 – 2020',
    title: 'Computer Science',
    logo: tuBerlinLogo,
  },
  {
    institution: 'National University of Arts, Bucharest',
    years: '2007 – 2010',
    title: 'BA, Interior Design',
    logo: nuaLogo,
  },
];

export const LANGUAGES: readonly Language[] = [
  {
    name: 'English',
    level: 'Fluent',
    certificates: [
      { name: 'IELTS Academic', year: '2012' },
      { name: 'English Translator Diploma', year: '2004' },
      { name: 'Cambridge Certificate', year: '2003' },
    ],
  },
  { name: 'German', level: 'Fluent', certificates: [{ name: 'TestDaF C1', year: '2017' }] },
  { name: 'French', level: 'Conversational' },
  { name: 'Romanian', level: 'Native' },
];
