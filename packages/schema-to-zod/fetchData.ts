import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  oauthToken: '',
});

const SPACE_ID = 285464212182782;

async function fetchData() {
  try {
    const response = await Storyblok.get(`spaces/${SPACE_ID}/components/63827769223572`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData(); 