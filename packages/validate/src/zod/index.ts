import { z } from 'zod';


// article-overview-page content type
export const ArticleOverviewPageSchema = z.object({
  _uid: z.string(),
  component: z.literal("article-overview-page"),
  meta_title: z.string(),
  meta_description: z.string(),
  headline: z.string(),
});

// article-page content type
export const ArticlePageSchema = z.object({
  _uid: z.string(),
  component: z.literal("article-page"),
  headline: z.string(),
  image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  text: z.string(),
  call_to_action: z.any(),
  categories: z.any(),
  meta_title: z.string(),
  meta_description: z.string(),
});

// banner content type
export const BannerSchema = z.object({
  _uid: z.string(),
  component: z.literal("banner"),
  background_image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  background_image_cover: z.boolean(),
  background_image_alignment: z.enum(["left", "center", "right"]),
  background_image_width: z.enum(["100", "75", "50"]),
  background_video: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  background_color: z.string(),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
  buttons: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  text_alignment: z.enum(["center", "left"]),
});

// banner-reference content type
export const BannerReferenceSchema = z.object({
  _uid: z.string(),
  component: z.literal("banner-reference"),
  banners: z.any(),
});

// button content type
export const ButtonSchema = z.object({
  _uid: z.string(),
  component: z.literal("button"),
  style: z.enum(["default", "ghost"]),
  background_color: z.string(),
  text_color: z.enum(["white", "primary-dark"]),
  size: z.enum(["small", "medium", "large"]),
  link: z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional(),
  label: z.string(),
});

// category content type
export const CategorySchema = z.object({
  _uid: z.string(),
  component: z.literal("category"),
  headline: z.string(),
  icon: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  meta_title: z.string(),
  meta_description: z.string(),
});

// contact-form-section content type
export const ContactFormSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("contact-form-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  text: z.string(),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  quote: z.string(),
  name: z.string(),
  position: z.string(),
});

// default-page content type
export const DefaultPageSchema = z.object({
  _uid: z.string(),
  component: z.literal("default-page"),
  meta_title: z.string(),
  meta_description: z.string(),
  body: z.array(z.object({
        component: z.string(),
        _uid: z.string(),
        _editable: z.string().optional()
      }).and(z.record(z.any()))).optional(),
});

// faq-entry content type
export const FaqEntrySchema = z.object({
  _uid: z.string(),
  component: z.literal("faq-entry"),
  question: z.string(),
  answer: z.string(),
});

// faq-section content type
export const FaqSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("faq-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
  faq_entries: z.array(z.object({
          component: z.literal("faq-entry"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
});

// featured-articles-section content type
export const FeaturedArticlesSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("featured-articles-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
  articles: z.any(),
  cols: z.enum(["2", "3", "4"]),
  background_color: z.string(),
});

// form-section content type
export const FormSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("form-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  form: z.enum(["contact", "newsletter"]),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
});

// grid-card content type
export const GridCardSchema = z.object({
  _uid: z.string(),
  component: z.literal("grid-card"),
  bold_text: z.string(),
  label: z.string(),
  text: z.string(),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  row_span: z.enum(["1", "2"]),
  border: z.boolean(),
  background_image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  icon_width: z.enum(["48", "80", "160", "200"]),
  icon: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
});

// grid-section content type
export const GridSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("grid-section"),
  cards: z.array(z.object({
          component: z.enum(["grid-card", "price-card", "image-card"]),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  cols: z.enum(["2", "3", "4"]),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
  background_color: z.string(),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
});

// headline-segment content type
export const HeadlineSegmentSchema = z.object({
  _uid: z.string(),
  component: z.literal("headline-segment"),
  text: z.string(),
  highlight: z.enum(["none", "color_1", "color_2", "color_3"]),
});

// hero-section content type
export const HeroSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("hero-section"),
  text: z.string(),
  header: z.string(),
  buttons: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  preserve_image_aspect_ratio: z.boolean(),
  layout: z.enum(["stacked", "split"]),
  background_color: z.string(),
  secondary_background_color: z.string(),
  text_alignment: z.enum(["left", "center"]),
  image_decoration: z.boolean(),
});

// image-card content type
export const ImageCardSchema = z.object({
  _uid: z.string(),
  component: z.literal("image-card"),
  image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  label: z.string(),
  text: z.string(),
  background_color: z.string(),
});

// image-text-section content type
export const ImageTextSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("image-text-section"),
  background_color: z.string(),
  reverse_mobile_layout: z.boolean(),
  reverse_desktop_layout: z.boolean(),
  eyebrow: z.string(),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  text: z.string(),
  buttons: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  preserve_image_aspect_ratio: z.boolean(),
});

// latest-articles-section content type
export const LatestArticlesSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("latest-articles-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
});

// logo-section content type
export const LogoSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("logo-section"),
  lead: z.string(),
  logos: z.any(),
});

// nav-item content type
export const NavItemSchema = z.object({
  _uid: z.string(),
  component: z.literal("nav-item"),
  link: z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional(),
  label: z.string(),
});

// newsletter-form-section content type
export const NewsletterFormSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("newsletter-form-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
});

// personalized-section content type
export const PersonalizedSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("personalized-section"),
  preview: z.enum(["new_visitor", "returning_visitor"]),
  returning_visitor: z.any(),
  returning_visitor_blocks: z.array(z.object({
        component: z.string(),
        _uid: z.string(),
        _editable: z.string().optional()
      }).and(z.record(z.any()))).optional(),
  new_visitor: z.any(),
  new_visitor_blocks: z.array(z.object({
        component: z.string(),
        _uid: z.string(),
        _editable: z.string().optional()
      }).and(z.record(z.any()))).optional(),
});

// price-card content type
export const PriceCardSchema = z.object({
  _uid: z.string(),
  component: z.literal("price-card"),
  most_popular: z.boolean(),
  headline: z.string(),
  text_1: z.string(),
  price: z.number(),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  text_2: z.string(),
});

// richtext-youtube content type
export const RichtextYoutubeSchema = z.object({
  _uid: z.string(),
  component: z.literal("richtext-youtube"),
  video_id: z.string(),
});

// site-config content type
export const SiteConfigSchema = z.object({
  _uid: z.string(),
  component: z.literal("site-config"),
  primary_highlight_color: z.any(),
  highlight_1_color: z.any(),
  highlight_2_color: z.any(),
  highlight_3_color: z.any(),
  primary_background_color: z.any(),
  background_1_color: z.any(),
  background_2_color: z.any(),
  background_3_color: z.any(),
  background_4_color: z.any(),
  background_5_color: z.any(),
  background_6_color: z.any(),
  background_7_color: z.any(),
  background_8_color: z.any(),
  background_9_color: z.any(),
  background_10_color: z.any(),
  primary_dark_color: z.any(),
  header_light: z.boolean(),
  disable_rounded_corners: z.boolean(),
  footer_light: z.boolean(),
  footer_decoration: z.boolean(),
  use_custom_colors: z.boolean(),
  colors: z.any(),
  colored_headlines: z.boolean(),
  use_custom_fonts: z.boolean(),
  custom_font_display: z.string(),
  custom_font_body: z.string(),
  x: z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional(),
  footer_headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  footer_about: z.string(),
  footer_nav_1_headline: z.string(),
  footer_nav_1: z.array(z.object({
          component: z.literal("nav-item"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  footer_nav_2_headline: z.string(),
  footer_nav_2: z.array(z.object({
          component: z.literal("nav-item"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  footer_nav_3_headline: z.string(),
  footer_nav_3: z.array(z.object({
          component: z.literal("nav-item"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  header_logo: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  header_nav: z.array(z.object({
          component: z.literal("nav-item"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  header_buttons: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  instagram: z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional(),
  youtube: z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional(),
  facebook: z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional(),
});

// tabbed-content-entry content type
export const TabbedContentEntrySchema = z.object({
  _uid: z.string(),
  component: z.literal("tabbed-content-entry"),
  image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  headline: z.string(),
  description: z.string(),
  button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
});

// tabbed-content-section content type
export const TabbedContentSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("tabbed-content-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
  entries: z.array(z.object({
          component: z.literal("tabbed-content-entry"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
});

// testimonial content type
export const TestimonialSchema = z.object({
  _uid: z.string(),
  component: z.literal("testimonial"),
  quote: z.string(),
  photo: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  name: z.string(),
  role: z.string(),
});

// testimonials-section content type
export const TestimonialsSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("testimonials-section"),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  lead: z.string(),
  testimonials: z.any(),
});

// text-section content type
export const TextSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("text-section"),
  eyebrow: z.string(),
  text_alignment: z.enum(["left", "center"]),
  headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  text: z.string(),
  buttons: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  background_color: z.string(),
});

// two-columns-section content type
export const TwoColumnsSectionSchema = z.object({
  _uid: z.string(),
  component: z.literal("two-columns-section"),
  column_1_headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  column_1_text_1: z.string(),
  column_1_text_2: z.string(),
  column_1_button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  column_1_image: z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional(),
  column_1_background_color: z.string(),
  column_2_headline: z.array(z.object({
          component: z.literal("headline-segment"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  column_2_text_1: z.string(),
  column_2_button: z.array(z.object({
          component: z.literal("button"),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional(),
  column_2_background_color: z.string(),
  column_1_decoration_color: z.string(),
  column_2_decoration_color: z.string(),
});
