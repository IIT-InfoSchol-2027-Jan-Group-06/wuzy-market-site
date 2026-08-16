export const slots = [
  { key: 'action', opts: ['play football', 'go to a gig', 'find a reading group', 'run at 6am', 'play board games', 'cook something'] },
  { key: 'count', opts: ['14', '16', '12', '18', '20'] },
  { key: 'city', opts: ['Colombo', 'Gampaha', 'Kandy', 'Galle'] },
  { key: 'day', opts: ['Saturday', 'Sunday', 'next week'] }
];

export const clips = ['football', 'gjig', 'reading', 'run', 'games', 'cook'];

export const negations = [
  'not a dating app.',
  'not another group chat that dies in four days.',
  'not four hundred strangers in a conference hall.',
  "not a feed to scroll while you're already at home."
];

export const bubbles = ['you going saturday?', 'idk who else is going', 'only if you go', 'same tbh', "ok so nobody's going", 'next time fr', 'we say that every time'];

export const stats = [
  { n: '72.9%', t: 'have skipped something they actually wanted to go to. Not because the event was bad. Because walking in alone is worse than staying home.' },
  { n: '60.6%', t: 'say they cannot find people who like the same things they do. They exist. They are twenty minutes away. There has just never been a reason for you to be in the same room.' },
  { n: '52.9%', t: "will talk to almost anyone, the second there is a shared reason to. So Wuzy's entire job is to build the reason." }
];

export const screens = [
  { src: '/screens/s1.png', cap: "find what's on near you, not near everyone" },
  { src: '/screens/s2.png', cap: 'the whole plan on one screen' },
  { src: '/screens/s3.png', cap: 'your ticket lives here. it opens when you arrive.' },
  { src: '/screens/s4.png', cap: 'proof you actually went' },
  { src: '/screens/s5.png', cap: 'and who you went with' }
];

export const stubs = [
  { img: '/stubs/stub-01.jpg', name: 'jungle run 2026', date: '19 JUN', note: 'we all hated it. we are going again.' },
  { img: '/stubs/stub-02.jpg', name: 'board games, mount lavinia', date: '04 MAY', note: 'met 4 people, still in the group chat.' },
  { img: '/stubs/stub-03.jpg', name: '6am run, marine drive', date: '22 JUN', note: 'three of us. one showed up late. fine.' },
  { img: '/stubs/stub-04.jpg', name: 'reading group, bambalapitiya', date: '11 JUL', note: 'nobody finished the book.' },
  { img: '/stubs/stub-05.jpg', name: 'cook night, nugegoda', date: '02 AUG', note: 'the rice was a disaster.' },
  { img: '/stubs/stub-06.jpg', name: 'gig, colombo 07', date: '09 AUG', note: 'lost my voice, found a group chat.' }
];

export const eventsLive = 7;

// swap for the real Formspree / Worker id before launch
export const formEndpoint = 'https://formspree.io/f/REPLACE_ME';
