import type { ReactNode } from 'react';
import {
  type ProjectCoverId,
  PROJECTS,
  PROJECTS_INTRO,
  PROJECTS_TITLE,
} from '../../content/projects';
import { Container } from '../Container/Container';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import cardStyles from '../ProjectCard/ProjectCard.module.css';
import { DesignSystemCover } from '../ProjectCovers/DesignSystemCover';
import { NapCover } from '../ProjectCovers/NapCover';
import { PortfolioCover } from '../ProjectCovers/PortfolioCover';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './ProjectsSection.module.css';

const COVERS: Record<ProjectCoverId, { cover: ReactNode; className: string }> = {
  portfolio: { cover: <PortfolioCover />, className: cardStyles.coverGrid },
  'design-system': { cover: <DesignSystemCover />, className: cardStyles.coverPage },
  nap: { cover: <NapCover />, className: cardStyles.coverLilac },
};

export const ProjectsSection = () => (
  <section id="projects" className={styles.section} aria-labelledby="projects-title">
    <Container>
      <SectionHead
        tag="Projects"
        title={PROJECTS_TITLE}
        titleId="projects-title"
        intro={PROJECTS_INTRO}
      />
      <ul className={styles.grid}>
        {PROJECTS.map(({ cover, ...project }) => (
          <li key={project.name}>
            <ProjectCard
              project={project}
              cover={COVERS[cover].cover}
              coverClassName={COVERS[cover].className}
            />
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
