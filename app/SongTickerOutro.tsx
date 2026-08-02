import { SongTickerBehavior } from "./SongTickerBehavior";

const spotifySongs = [
  "40 Days",
  "V'erastich Li",
  "Halev Sheli",
  "Tefilas HaEmunah",
  "Nafsheinu",
  "Piha Pascha",
  "Tefilas Hashla",
  "Keitzad",
  "Lecha Dodi (Modzitz)",
] as const;

function SongGroup() {
  return (
    <span className="song-ticker-group" aria-hidden="true">
      {spotifySongs.map((song) => (
        <span className="song-ticker-item" key={song}>
          <span>{song}</span>
          <span className="song-ticker-separator">✦</span>
        </span>
      ))}
    </span>
  );
}

export function SongTickerOutro() {
  return (
    <section className="song-ticker-stage" aria-label="Aharon Berk songs">
      <SongTickerBehavior />
      <div className="song-ticker-window" aria-hidden="true">
        <div className="song-ticker-track">
          <SongGroup />
          <SongGroup />
        </div>
      </div>

      <ul className="song-ticker-accessible-list">
        {spotifySongs.map((song) => (
          <li key={song}>{song}</li>
        ))}
      </ul>
    </section>
  );
}
