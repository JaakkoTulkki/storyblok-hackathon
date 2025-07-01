import styles from "./page.module.css";
import { getStoryblokApi } from '../lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';
import { validate } from "@repo/validate";
import { StoryblokStoryValidate } from "../components/StoryblokStoryValidate";

export default async function About() {
    const { data } = await fetchData();
    return (
        <div className="page">
            <StoryblokStoryValidate story={data.story} />
        </div>
    );
}
export async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/about`, { version: 'draft' });
}