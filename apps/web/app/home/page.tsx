import { StoryblokStoryValidate } from './../components/StoryblokStoryValidate';
import { getStoryblokApi } from './../lib/storyblok';

export default async function Home() {
    const { data } = await fetchData();
    console.log(data);

    return (<StoryblokStoryValidate story={data.story} />);
}
export async function fetchData() {
    const storyblokApi = getStoryblokApi();
    return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}