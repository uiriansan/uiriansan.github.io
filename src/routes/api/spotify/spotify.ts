import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from '$env/static/private';
import type { NowPlaying, RecentlyPlayed } from './types';
import { mapNowPlaying, mapRecentlyPlayed } from './types';

const redirect_uri = "http://localhost:5173"
const token_endpoint = "https://accounts.spotify.com/api/token";
const now_playing_endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
const recently_played_endpoint = "https://api.spotify.com/v1/me/player/recently-played";

const getAccessToken = async () => {
  const { access_token } = await fetch(token_endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
      redirect_uri,
    })
  })
  .then(res => res.json());

  return access_token;
}


export const getPlayerData = async () : Promise<NowPlaying | RecentlyPlayed | null> => {
  const access_token = await getAccessToken();

  let response = await fetch(now_playing_endpoint, {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  // Nothing playing, get recently played instead
  if(response.status === 204) {
    response = await fetch(recently_played_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
  
    if(response.status === 204) return null;

    const player_data = await response.json();

    if(!player_data?.items) return null;

    return mapRecentlyPlayed(player_data);
  }
  const player_data = await response.json();

  if(!player_data?.item) return null;

  return mapNowPlaying(player_data);
}
