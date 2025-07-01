import styles from "./page.module.css";
import { getStoryblokApi } from '../lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';
import { validate } from "@repo/validate";

export default async function About() {
    const { data } = await fetchData();
    const result = validate(data.story.content);
    console.log(result);

    return (
        <div className="page">
            {!result.success && <div className="error">{result.error}</div>}
            <StoryblokStory story={data.story} />
        </div>
    );
}
export async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/about`, { version: 'draft' });
}