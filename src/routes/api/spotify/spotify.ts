import { SPOTIFY_CLIENT, SPOTIFY_REFRESH_TOKEN, SPOTIFY_REDIRECT_URI } from '$env/static/private';
import type { PlayerData } from './types';
import { mapNowPlaying, mapRecentlyPlayed } from './types';

const token_endpoint = "https://accounts.spotify.com/api/token";
const now_playing_endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
const recently_played_endpoint = "https://api.spotify.com/v1/me/player/recently-played";

const getAccessToken = async () => {
  const { access_token } = await fetch(token_endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${SPOTIFY_CLIENT}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    })
  })
  .then(res => res.json());

  return access_token;
}

const buildSpotifyCommonHeaders = (access_token : string) => ({
  Authorization: `Bearer ${access_token}`  
});


export const getPlayerData = async () : Promise<PlayerData> => {
  const access_token = await getAccessToken();

  let response = await fetch(now_playing_endpoint, {
    headers: buildSpotifyCommonHeaders(access_token)
  });

  // Nothing playing, get recently played instead
  if(response.status === 204) {
    response = await fetch(recently_played_endpoint, {
      headers: buildSpotifyCommonHeaders(access_token)
    });
  
    if(response.status !== 200)
      return { message: 'error', code: response.status, data: null };

    const player_data = await response.json();

    if(!player_data?.items)
      return { message: 'error', code: -1, data: null };

    return { message: 'success', code: 200, data: mapRecentlyPlayed(player_data) };
    
  } else if(response.status !== 200)
    return { message: 'error', code: response.status, data: null };
  
  const player_data = await response.json();

  if(!player_data?.item)
    return { message: 'error', code: -1, data: null };

    
   return { message: 'success', code: 200, data:  mapNowPlaying(player_data) };
}
