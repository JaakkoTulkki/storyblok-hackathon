import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Page from '../components/Page';
import Feature from '../components/Feature';
import Grid from '../components/Grid';
import Teaser from '../components/Teaser';
import Text from '../components/TextSection';

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
    components: {
        "default-page": Page,
        "text-section": Text,
        feature: Feature,
        grid: Grid,
        teaser: Teaser
    },
    use: [apiPlugin],
    apiOptions: {
        region: 'eu',
    },
});