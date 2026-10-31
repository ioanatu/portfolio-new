import clsx from 'clsx';
import styles from './ChipList.module.css';

type ChipListProps = {
  items: readonly string[];
  label?: string;
  className?: string;
};

export const ChipList = ({ items, label, className }: ChipListProps) => (
  <ul aria-label={label} className={clsx(styles.chipList, className)}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
