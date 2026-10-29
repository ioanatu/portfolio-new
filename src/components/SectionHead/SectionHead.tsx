import type { ReactNode, Ref } from 'react';
import styles from './SectionHead.module.css';

type SectionHeadProps = {
  tag: string;
  title: string;
  titleId: string;
  intro: string;
  note?: string;
  pageTitle?: boolean;
  before?: ReactNode;
  titleRef?: Ref<HTMLHeadingElement>;
};

export const SectionHead = ({
  tag,
  title,
  titleId,
  intro,
  note,
  pageTitle = false,
  before,
  titleRef,
}: SectionHeadProps) => {
  const Heading = pageTitle ? 'h1' : 'h2';

  return (
    <div className={styles.sectionHead}>
      {before}
      <span className={styles.tag}>{tag}</span>
      <Heading
        ref={titleRef}
        id={titleId}
        className={pageTitle ? styles.pageTitle : styles.title}
        tabIndex={pageTitle ? -1 : undefined}
      >
        {title}
      </Heading>
      <p className={styles.intro}>{intro}</p>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
};

//  <Container>
//       <ClientList title={CLIENTS_TITLE} clients={CLIENTS} />
//     </Container>
