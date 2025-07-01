import {
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { validate } from '@repo/validate';
import { ValidationError } from './ValidationError';

export default function StoryblokServerComponentValidate({blok}: {blok: any}) {
    const validatedBlok = validate(blok);
    console.log('********* validatedBlok *********')
    console.log(validatedBlok)
    
    if (!validatedBlok.success) {
        return (
            <ValidationError error={validatedBlok.error}>
                <StoryblokServerComponent blok={blok} key={blok._uid} />
            </ValidationError>
        );
    }
    
    return <StoryblokServerComponent blok={blok} key={blok._uid} />;
}