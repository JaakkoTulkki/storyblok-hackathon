import { storyblokEditable } from "@storyblok/react";

const Text = ({ blok }) => {
    return (
        <h2 style={{ textAlign: "center" }} {...storyblokEditable(blok)}>
            {blok.eyebrow}
        </h2>
    );
};

export default Text;
