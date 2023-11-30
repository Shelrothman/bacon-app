
type Config = {
    TMDB_API_KEY: {
        v3: string,
        v4: string,
    },
    API_BASE_URL: string,
};

export const config: Config = {
    TMDB_API_KEY: {
        v3: process.env.EXPO_PUBLIC_TMDB_API_KEY_V3 || '',
        v4: process.env.EXPO_PUBLIC_TMDB_API_KEY_V4 || '',
    },
    API_BASE_URL: 'https://api.themoviedb.org/3'
};