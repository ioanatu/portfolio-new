import {
  AI_PANEL,
  MORE_SKILLS,
  MORE_SKILLS_TITLE,
  SKILL_GROUPS,
  SKILLS_INTRO,
  SKILLS_TITLE,
} from '../../content/skills';
import { AiPanel } from '../AiPanel/AiPanel';
import { ChipList } from '../ChipList/ChipList';
import { Container } from '../Container/Container';
import { SectionHead } from '../SectionHead/SectionHead';
import { SkillCard } from '../SkillCard/SkillCard';
import styles from './SkillsSection.module.css';

const [coreStack, ...otherGroups] = SKILL_GROUPS;
const cardsBeforeAiPanel = 2;

export const SkillsSection = () => (
  <section id="skills" className={styles.section} aria-labelledby="skills-title">
    <Container>
      <SectionHead tag="Skills" title={SKILLS_TITLE} titleId="skills-title" intro={SKILLS_INTRO} />
      <div className={styles.grid}>
        <SkillCard group={coreStack} />
        {otherGroups.slice(0, cardsBeforeAiPanel).map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
        <AiPanel
          title={AI_PANEL.title}
          titleId="ai-title"
          description={AI_PANEL.description}
          skillsTitle={AI_PANEL.skillsTitle}
          skills={AI_PANEL.skills}
          coursesTitle={AI_PANEL.coursesTitle}
          courses={AI_PANEL.courses}
        />
        {otherGroups.slice(cardsBeforeAiPanel).map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
      </div>
      <div className={styles.more}>
        <h3 id="more-skills-title">{MORE_SKILLS_TITLE}</h3>
        <ChipList items={MORE_SKILLS} label={MORE_SKILLS_TITLE} />
      </div>
    </Container>
  </section>
);
