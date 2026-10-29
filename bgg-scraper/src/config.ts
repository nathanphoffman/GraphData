// the bgg user whose collection is used in the search, set in .env (see .env.example)
const username = process.env.BGG_USERNAME;
if (!username) {
    throw new Error("BGG_USERNAME is not set. Copy .env.example to .env and put your bgg username in it.");
}
export const BGG_USERNAME: string = username;

// games whose titles start with any of these are left out of the database
export const EXCLUDED_TITLE_PREFIXES = [
    'UNDAUNTED',
    'UNMATCHED',
    'CLANK!',
    'TICKET TO RIDE',
    'MARVEL',
    'ZOMBICIDE',
    'UNLOCK',
    'DISNEY',
    'CHRONICLES OF CRIME',
    'DICE THRONE',
];
