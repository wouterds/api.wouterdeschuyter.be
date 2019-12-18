import axios from 'axios';

const getLastSongPlayed = async () => {
  const { data: responseCurrentSong } = await axios.get(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    },
  );

  if (responseCurrentSong.item) {
    const { item } = responseCurrentSong;
    const artist = item.artists[0].name;
    const album = item.album;
    const title = item.name;
    const spotifyUri = item.external_urls.spotify;
    const isPlaying = true;
    const imageUri = album.images[0].url;
    const time = new Date();

    return {
      artist,
      title,
      spotifyUri,
      isPlaying,
      imageUri,
      time,
    };
  }

  const { data: responseRecentlyPlayed } = await axios.get(
    'https://api.spotify.com/v1/me/player/recently-played?type=track&limit=1',
    {
      headers: {
        authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    },
  );

  if (responseRecentlyPlayed.items.length === 0) {
    return null;
  }

  const item = responseRecentlyPlayed.items[0];
  const artist = item.track.artists[0].name;
  const album = item.track.album;
  const title = item.track.name;
  const spotifyUri = item.track.external_urls.spotify;
  const isPlaying = false;
  const imageUri = album.images[0].url;
  const time = new Date(`${item.played_at}`);

  return {
    artist,
    title,
    spotifyUri,
    isPlaying,
    imageUri,
    time,
  };
};

export default {
  getLastSongPlayed,
};
