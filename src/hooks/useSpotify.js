import { useState, useEffect, useCallback } from 'react';

const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1';

const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
];

export const useSpotify = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get tokens from URL (OAuth callback)
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            const expiresIn = params.get('expires_in');

            if (token) {
                setAccessToken(token);
                localStorage.setItem('spotify_access_token', token);
                localStorage.setItem('spotify_token_expiry', Date.now() + expiresIn * 1000);
                window.location.hash = '';
            }
        } else {
            // Check for existing token
            const storedToken = localStorage.getItem('spotify_access_token');
            const tokenExpiry = localStorage.getItem('spotify_token_expiry');

            if (storedToken && tokenExpiry && Date.now() < tokenExpiry) {
                setAccessToken(storedToken);
            }
        }
        setLoading(false);
    }, []);

    // Login to Spotify
    const login = useCallback(() => {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || window.location.origin;

        const authUrl = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=token&show_dialog=true`;

        window.location.href = authUrl;
    }, []);

    // Logout
    const logout = useCallback(() => {
        setAccessToken(null);
        setCurrentTrack(null);
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_expiry');
    }, []);

    // Fetch currently playing track
    const fetchCurrentTrack = useCallback(async () => {
        if (!accessToken) return;

        try {
            const response = await fetch(`${SPOTIFY_API_ENDPOINT}/me/player/currently-playing`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                // No track currently playing
                setCurrentTrack(null);
                setIsPlaying(false);
                return;
            }

            if (response.status === 401) {
                // Token expired
                logout();
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch current track');
            }

            const data = await response.json();

            if (data && data.item) {
                setCurrentTrack({
                    name: data.item.name,
                    artist: data.item.artists.map(artist => artist.name).join(', '),
                    album: data.item.album.name,
                    albumArt: data.item.album.images[0]?.url,
                    duration: data.item.duration_ms,
                    progress: data.progress_ms,
                    isPlaying: data.is_playing,
                    previewUrl: data.item.preview_url,
                });
                setIsPlaying(data.is_playing);
            } else {
                setCurrentTrack(null);
                setIsPlaying(false);
            }

            setError(null);
        } catch (err) {
            console.error('Error fetching current track:', err);
            setError(err.message);
        }
    }, [accessToken, logout]);

    // Auto-refresh current track every 5 seconds
    useEffect(() => {
        if (!accessToken) return;

        fetchCurrentTrack();
        const interval = setInterval(fetchCurrentTrack, 5000);

        return () => clearInterval(interval);
    }, [accessToken, fetchCurrentTrack]);

    return {
        accessToken,
        currentTrack,
        isPlaying,
        loading,
        error,
        login,
        logout,
    };
};
