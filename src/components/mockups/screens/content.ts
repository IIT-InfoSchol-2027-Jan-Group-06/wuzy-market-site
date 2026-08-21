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

export const byName = <T extends { slotName: string }>(list: T[], slot: string): T => {
  const found = list.find((i) => i.slotName === slot);
  if (!found) throw new Error(`No content for slot "${slot}"`);
  return found;
};
