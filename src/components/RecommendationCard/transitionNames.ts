/** Names under which a card, and the text inside it, take part in view transitions. */
export const cardTransitionName = (index: number) => `recommendation-${index}`;

export const contentTransitionName = (cardName: string) => `${cardName}-content`;
