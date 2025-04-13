import { currentToken } from "./auth.js";

export async function getTopTracks(time_range) {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?" + new URLSearchParams({ time_range: time_range }), {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });

    return await response.json();
}

export async function getRecommendedTracks() {
    const favoriteArtist = await getFavoriteArtist();
    const query = `${favoriteArtist} artist:${favoriteArtist}`;
    const encodedQuery = encodeURIComponent(query);
    const searchParams = new URLSearchParams({
        q: encodedQuery,
        type: 'track',
        limit: 50
    });
    const response = await fetch("https://api.spotify.com/v1/search?" + searchParams, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });

    const body = await response.json();
    const tracksSortedByPopularity = body.tracks.items.sort((a, b) => (
        a.popularity > b.popularity ? 1 : b.popularity > a.popularity ? -1 : 0)
    );
    return tracksSortedByPopularity.filter((track) => {
        return track.artists.map((artist) => artist.name).includes(favoriteArtist);
    });
}

export async function getFavoriteArtist() {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?" + new URLSearchParams({ time_range: "long_term" }), {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });

    const body = await response.json();
    return body.items[0].name;
}

export function convertToSongData(tracks) {
    return tracks.map((track) => {
        return {
            artist: getArtists(track.artists),
            title: track.name,
            duration_ms: track.duration_ms,
            id: track.id
        }
    })
}

function getArtists(artists) {
    return artists.map((artist) => artist.name).join(", ");

}