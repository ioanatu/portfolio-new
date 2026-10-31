import clsx from 'clsx';
import type { SkillGroup } from '../../content/skills';
import { ChipList } from '../ChipList/ChipList';
import styles from './SkillCard.module.css';

type SkillCardProps = {
  group: SkillGroup;
};

export const SkillCard = ({
  group: { label, title, description, skills, featured },
}: SkillCardProps) => (
  <article className={clsx(styles.skillCard, featured && styles.featured)}>
    <span className={styles.label}>{label}</span>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    <ChipList items={skills} label={`${title} skills`} className={styles.chips} />
  </article>
);
