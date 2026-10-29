import styles from './EmphasizedText.module.css';

type EmphasizedTextProps = {
  text: string;
  /** Phrases to set in bold inside `text`, matched regardless of case. */
  terms?: readonly string[];
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Text with some of its phrases in bold. */
export const EmphasizedText = ({ text, terms = [] }: EmphasizedTextProps) => {
  if (terms.length === 0) return text;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'i');
  const lowerTerms = terms.map((term) => term.toLowerCase());

  // Splitting on a capture group puts every match at an odd index
  return text.split(new RegExp(pattern, 'gi')).map((part, index) =>
    index % 2 === 1 && lowerTerms.includes(part.toLowerCase()) ? (
      <strong key={index} className={styles.emphasizedText}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
};
