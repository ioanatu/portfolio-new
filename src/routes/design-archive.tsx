import { createFileRoute } from '@tanstack/react-router';
import { DesignArchivePage } from '../pages/DesignArchivePage/DesignArchivePage';

export const Route = createFileRoute('/design-archive')({
  component: DesignArchivePage,
});
