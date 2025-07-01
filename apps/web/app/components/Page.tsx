import {
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import StoryblokServerComponentValidate from './StoryblokServerComponentValidate';

export default function Page({ blok }) {

    return (
        <main>
            {blok.body.map((nestedBlok) => (
                <StoryblokServerComponentValidate blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
    );
}