import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { Project } from '../../content/projects';
import { GithubIcon } from '../GithubIcon/GithubIcon';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Omit<Project, 'cover'>;
  cover: ReactNode;
  coverClassName?: string;
};

export const ProjectCard = ({
  project: { name, href, linkLabel, repoHref, description },
  cover,
  coverClassName,
}: ProjectCardProps) => (
  <article className={styles.projectCard}>
    <div className={clsx(styles.cover, coverClassName)}>{cover}</div>
    <div className={styles.body}>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
          {linkLabel}
        </a>
        <a
          className={styles.repo}
          href={repoHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on GitHub`}
        >
          <GithubIcon size={18.52} />
        </a>
      </div>
    </div>
  </article>
);
