import StoryblokServerComponentValidate from './StoryblokServerComponentValidate';
export default function Grid({ blok }) {
    return (
        <div className="grid">
            {blok.columns.map((nestedBlok) => (
                <StoryblokServerComponentValidate blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </div>
    );
};