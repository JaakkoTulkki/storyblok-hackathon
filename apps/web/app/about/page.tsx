
import { StoryblokStoryValidate } from '../components/StoryblokStoryValidate';
import { getStoryblokApi } from '../lib/storyblok';

export default async function About() {
    const { data } = await fetchData();
    return (<StoryblokStoryValidate story={data.story} />);
}
export async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/about`, { version: 'draft' });
}