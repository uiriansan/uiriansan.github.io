interface Artist {
  name : string;
  url : string;
}

interface Album {
  title : string;
  cover : string;
}

interface Track {
  title : string;
  url : string;
  album : Album;
  artists : Artist[];
  progress : number | null;
  duration : number | null;
}

interface NowPlaying {
  track : Track;
}

interface RecentlyPlayed {
  tracks : Track[];
  played_at : string;
}

interface PlayerData {
  message : 'success' | 'error';
  code : number;
  data : NowPlaying | RecentlyPlayed | null;
}

const mapArtist = (artist: any) : Artist => ({
  name: artist.name,
  url: artist.external_urls.spotify
});

const mapAlbum = (src : any) : Album => ({
  title: src.name,
  cover: src.images[0].url
});

const mapPlayingTrack = (data : any) : Track => ({
  title: data.item.name,
  url: data.item.external_urls.spotify,
  progress: data.progress_ms,
  duration: data.item.duration_ms,
  album: mapAlbum(data.item.album),
  artists: data.item.artists.map(mapArtist)
});

const mapRecentTrack = (item: any) : Track => ({
  title: item.track.name,
  url: item.track.external_urls.spotify,
  progress: null,
  duration: null,
  album: mapAlbum(item.track.album),
  artists: item.track.artists.map(mapArtist)
});

const mapNowPlaying = (data : any) : NowPlaying => ({
  track: mapPlayingTrack(data),
});

const mapRecentlyPlayed = (data : any) : RecentlyPlayed => ({
  tracks: data.items.map(mapRecentTrack),
  played_at: data.items[0].played_at
});

export {
  type PlayerData,
  mapNowPlaying,
  mapRecentlyPlayed
}
