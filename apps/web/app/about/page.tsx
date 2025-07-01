import styles from "./page.module.css";
import { getStoryblokApi } from '../lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function About() {
    const { data } = await fetchData();
    console.log(data);

    return (
        <div className="page">
            <StoryblokStory story={data.story} />
        </div>
    );
}
export async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/about`, { version: 'draft' });
}