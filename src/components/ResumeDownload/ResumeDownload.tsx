import { buttonClassName } from '../Button/buttonClassName';
import styles from './ResumeDownload.module.css';

type ResumeDownloadProps = {
  label: string;
  links: readonly { label: string; href: string }[];
};

/** A line of text followed by one button per resume version, each opening its PDF in a new tab. */
export const ResumeDownload = ({ label, links }: ResumeDownloadProps) => (
  <div className={styles.resumeDownload}>
    <p>{label}</p>
    <div className={styles.buttons}>
      {links.map(({ label: linkLabel, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName({ variant: 'secondary', size: 'small' })}
        >
          {linkLabel}
        </a>
      ))}
    </div>
  </div>
);
