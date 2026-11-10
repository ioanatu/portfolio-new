export type Recommendation = {
  author: string;
  role: string;
  /** The most telling sentence, copied word for word from the description. */
  highlight: string;
  description: string[];
  featured?: boolean;
};

export const RECOMMENDATIONS_TITLE = 'What former colleagues say';
export const RECOMMENDATIONS_INTRO = '';

export const RECOMMENDATIONS: readonly Recommendation[] = [
  {
    author: 'Mariusz B.',
    featured: true,
    highlight: "I consider her one of the most talented and reliable people I've worked with.",
    role: 'Software Developer — Mariusz worked with Ioana on the same team',
    description: [
      "I had the pleasure of working with Ioana for about three years at sonnen GmbH, where she was part of the frontend team, working primarily with React. I consider her one of the most talented and reliable people I've worked with.",
      'Ioana is exceptionally well organized and has a strong sense of ownership. She can take a goal, break it down, and drive it to completion with almost no oversight, flagging and addressing any obstacles as soon as they arise. She never avoided a difficult task or a new challenge. Although her main area of expertise was frontend, she also contributed to the backend codebase and demonstrated an end-to-end mindset when approaching feature development. I am particularly happy to see she has continued developing her skills within the AWS ecosystem. Moreover, I always saw her deliver on time without compromising on quality.',
      "Ioana is also an excellent communicator, which allows her to keep all stakeholders aligned and to collaborate efficiently with other developers, designers, and product owners. She was invaluable during the refinements, always attentive to details and asking all the right questions. Finally, she was performing great in an agile environment, where we often had to coordinate our work across the BE/FE split and around dependencies on other teams' deliverables.",
      "On top of that, Ioana is cheerful, driven to keep growing, and a great team player who made the team better. If you're looking for an extremely reliable person that will drive your product forward with fresh ideas and dedication, Ioana should be your choice.",
    ],
  },
  {
    author: 'Mariam A.',
    highlight:
      'She is a talented engineer who deeply cares about code quality, delivers high-quality products, and is always eager to learn new things.',
    role: 'Senior Software Engineer — Mariam worked with Ioana on the same team',
    description: [
      'It was a pleasure working with Ioana as a frontend developer at Sonnen. She is a talented engineer who deeply cares about code quality, delivers high-quality products, and is always eager to learn new things.',
      'Beyond frontend work, I was impressed by her AWS knowledge and her strong communication skills. She has a great way of bridging tech and strategy, making it easy to turn complex ideas into smooth solutions. I learned a lot from working with her.',
      'She is proactive, helpful, and a great teammate.',
    ],
  },
  {
    author: 'Michiel S.',
    highlight:
      'Her ability to translate complex requirements into elegant, user-friendly interfaces consistently elevated the quality of our products.',
    role: 'Digital Product Development — Michiel managed Ioana directly',
    description: [
      'Working with Ioana was a real privilege. As a frontend engineer specialized in React, she brought not only technical precision but also a deep commitment to mastering her craft. Her ability to translate complex requirements into elegant, user-friendly interfaces consistently elevated the quality of our products.',
      'What stood out most was her dedication to growth—she invested significant time and energy into deepening her engineering skills, always pushing herself to learn more and stay ahead of the curve. Combined with her strong communication and business understanding, she was a bridge between tech and strategy, making her an invaluable team member.',
    ],
  },
];
