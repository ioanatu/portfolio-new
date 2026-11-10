import { Button, type ButtonProps } from '@ioanatu/component-library';
import { useSectionClick } from '../../hooks/useSectionClick';

type SectionButtonProps = {
  sectionId: string;
  label: string;
  variant: NonNullable<ButtonProps['variant']>;
};

export const SectionButton = ({ sectionId, label, variant }: SectionButtonProps) => {
  const handleClick = useSectionClick(sectionId);

  return <Button href="/" label={label} variant={variant} size="lg" onClick={handleClick} />;
};
