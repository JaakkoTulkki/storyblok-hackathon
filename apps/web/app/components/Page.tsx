import {
    StoryblokServerComponent,
} from '@storyblok/react/rsc';


export default function Page({ blok }) {

    console.log(blok);

    return (
        <main>
            {blok.body.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
    );
}