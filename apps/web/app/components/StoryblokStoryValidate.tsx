import { validate } from '@repo/validate';
import { StoryblokStory, } from '@storyblok/react/rsc';
import { ValidationError } from './ValidationError';

export async function StoryblokStoryValidate({ story }: { story: any }) {
    const result = validate(story.content);
    
    if (!result.success) {
        return <ValidationError error={result.error}>
            <StoryblokStory story={story} />
        </ValidationError>;
    }
    
    return <StoryblokStory story={story} />;
}