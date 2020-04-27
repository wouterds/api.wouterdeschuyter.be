import {
  spotifyGetCurrentSongPlaying,
  spotifyGetLastPlayedSong,
  spotifyIsAuthorized,
} from 'services/spotify';

const spotifyIsConnected = () => spotifyIsAuthorized();

const spotifyListeningTo = async () => {
  const currentSong = await spotifyGetCurrentSongPlaying();
  if (currentSong) {
    return currentSong;
  }

  const lastPlayedSong = await spotifyGetLastPlayedSong();
  if (lastPlayedSong) {
    return lastPlayedSong;
  }

  return null;
};

export default {
  spotifyIsConnected,
  spotifyListeningTo,
};
