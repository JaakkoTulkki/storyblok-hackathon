import { validate } from '@repo/validate';
import { StoryblokStory, } from '@storyblok/react/rsc';

export async function StoryblokStoryValidate({ story }: { story: any }) {
    const result = validate(story.content);
    console.log(result);

    return (
        <div>
            {!result.success && <div className="error">{result.error}</div>}
            <StoryblokStory story={story} />
        </div>
    );
}