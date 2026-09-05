/* Everything the four phone screens say, in one place.
 *
 * It lives here rather than in each screen because the frames render the
 * lifted pieces too — a floating message row is the same row as the gap it
 * flies back into. Those strings used to be re-typed in the frame, and had
 * already drifted apart from the screen's copy once.
 *
 * House style, applied throughout:
 *   - Names, places and titles in Title Case
 *   - Buttons and previews in sentence case
 *   - Timestamps bare: `1d`, not `.1d`
 */

const feedImg = (f: string) => `/wuzy/img/feed/${f}`;
const discoverImg = (f: string) => `/wuzy/img/discover/${f}`;
const chatImg = (f: string) => `/wuzy/img/chat/${f}`;
const createImg = (f: string) => `/wuzy/img/create/${f}`;

export const posts = [
  { slotName: 'lana',    name: 'Lana Rae',          place: 'New York',   avatar: feedImg('lana-avatar.jpg'),    photo: feedImg('lana-photo.jpg') },
  { slotName: 'runclub', name: 'New York Run Club', place: 'New Jersey', avatar: feedImg('runclub-avatar.jpg'), photo: feedImg('runclub-photo.jpg') },
  { slotName: 'yash',    name: 'Yash Silva',        place: 'Sri Lanka',  avatar: feedImg('yash-avatar.jpg'),    photo: feedImg('yash-photo.jpg') },
  { slotName: 'raya',    name: 'Raya Singh',        place: 'Mumbai',     avatar: feedImg('raya-avatar.jpg'),    photo: feedImg('raya-photo.jpg') },
];

// The export's own avatars were transposed — Taylor's card wore Lana's face.
export const posters = [
  { slotName: 'p-yeezus',   name: 'Yeezus',   img: feedImg('poster-yeezus.jpg'),   avatar: feedImg('me.jpg') },
  { slotName: 'p-showgirl', name: 'Taylor',   img: feedImg('poster-showgirl.jpg'), avatar: feedImg('taylor.jpg') },
  { slotName: 'p-dutchgp',  name: 'Dutch GP', img: feedImg('poster-dutchgp.jpg'),  avatar: feedImg('dutchgp-avatar.jpg') },
];

// All three rows were "Focus live", hosted by "jordan", wearing one avatar.
export const upcoming = [
  { slotName: 'd-aug8',  name: 'Sunset Sessions',  host: 'Jordan', avatar: discoverImg('jordan.jpg'), photo: discoverImg('row-market.jpg'), day: '8',  month: 'Aug' },
  { slotName: 'd-aug21', name: 'Warehouse Social', host: 'Mika',   avatar: chatImg('allie.jpg'),      photo: discoverImg('row-party.jpg'),  day: '21', month: 'Aug' },
  { slotName: 'd-sep4',  name: 'Neon Marathon',    host: 'Devin',  avatar: chatImg('lily.jpg'),       photo: discoverImg('row-lasers.jpg'), day: '4',  month: 'Sep' },
];

// Two rows shared one avatar, and two previews were the same line twice.
export const threads = [
  { slotName: 'c-alex',    name: 'Alex Wanner',           preview: 'Just do it, bro',     time: '1d', avatar: chatImg('alex.jpg') },
  { slotName: 'c-lily',    name: 'Lily Ruth',             preview: 'Hey!',                time: '1d', avatar: chatImg('allie.jpg') },
  { slotName: 'c-rally',   name: 'The Rally Club',        preview: 'Come join us',        time: '2d', avatar: chatImg('rally-club.jpg') },
  { slotName: 'c-dean',    name: 'Dean Di Laurentis',     preview: 'Be a fun teammate!',  time: '2d', avatar: chatImg('lily.jpg') },
  { slotName: 'c-allie',   name: 'Allie Hayes',           preview: 'You wanna come?',     time: '3d', avatar: feedImg('raya-avatar.jpg') },
  { slotName: 'c-runners', name: 'Colombo Runners Club',  preview: 'Sunday, 6am start',   time: '4d', avatar: chatImg('runners-club.jpg') },
  { slotName: 'c-studio',  name: 'The Studio',            preview: 'Doors open at eight', time: '2d', avatar: chatImg('studio.jpg') },
];

// The host side: someone setting up the next edition of Sunset Sessions, which
// the Discover screen already lists as an upcoming event. The two mockups are
// meant to read as one product rather than two unrelated screenshots.
export const createEvent = {
  banner: {
    slotName: 'ce-banner',
    label: 'Event cover photo',
    img: createImg('banner.jpg'),
  },
  title: {
    slotName: 'ce-title',
    label: 'Event Title',
    value: 'Sunset Sessions Vol. 4',
  },
  description: {
    label: 'Description',
    value: 'Rooftop sets, street food, and the best view in Colombo.',
  },
  // Filled in, not the export's "select date >" placeholders — the screen is
  // showing a host who has done the work, which is the point being sold.
  details: [
    { label: 'Date', value: '14 Mar 2026' },
    { label: 'Time', value: '6:00 PM' },
    { label: 'Location', value: 'Mount Lavinia' },
    { label: 'Category', value: 'Music' },
    { label: 'Private', toggle: 'off' as const },
    { label: 'Paid', toggle: 'on' as const },
  ],
  publish: { slotName: 'ce-publish', label: 'Publish' },
};

// Thousands, one point a week, left to right — the export's shape: a climb, a
// dip, the peak, a fall and a late recovery.
const incomePoints = [3.2, 4.1, 5.8, 5.1, 7.4, 6.3, 3.9, 5.2];
const thousands = (n: number) => `${Number(n.toFixed(1))}K`;

// The other half of the host story: the event created above, now selling. The
// export names a different event here; two names side by side would break the
// one thing these two screens are for, so the name and cover come straight from
// createEvent and cannot drift. The figures are the export's.
export const dashboard = {
  event: {
    name: createEvent.title.value,
    kicker: '14 MAR · MOUNT LAVINIA',
    img: createEvent.banner.img,
  },
  stats: [
    { slotName: 'db-registered', label: 'Registered Attendees', value: '230' },
    { slotName: 'db-sold', label: 'Tickets Sold', value: '150' },
  ],
  income: {
    slotName: 'db-chart',
    label: 'Income Trend',
    range: 'This Month',
    points: incomePoints,
    axis: ['8K', '6K', '4K', '2K', '0'],
    max: 8,
    // Both derived, never typed. The export labelled its peak 12K while drawing
    // it at 33 on a 40 axis, and headlined a total its own points could not add
    // up to. On the one screen whose whole pitch is reporting your money back to
    // you, the three numbers have to agree.
    total: `$${(incomePoints.reduce((a, b) => a + b, 0) * 1000).toLocaleString('en-US')}`,
    peak: thousands(Math.max(...incomePoints)),
  },
};

export const byName = <T extends { slotName: string }>(list: T[], slot: string): T => {
  const found = list.find((i) => i.slotName === slot);
  if (!found) throw new Error(`No content for slot "${slot}"`);
  return found;
};
