/**
 * Image registry. All photos referenced by the site are declared here so they
 * can be swapped for real salon photography in one place.
 * Paths are relative to /public. Keep width/height accurate for CLS-free loading.
 */
export type SiteImage = { src: string; alt: string; width: number; height: number };

export const salonImages: SiteImage[] = [
  { src: "/images/salon-01.jpg", alt: "Styling station at Salon Alain", width: 1400, height: 1000 },
  { src: "/images/salon-02.jpg", alt: "Mirror and lavender details of the salon", width: 1400, height: 1750 },
  { src: "/images/salon-03.jpg", alt: "Product display at Salon Alain", width: 1400, height: 1000 },
  { src: "/images/salon-04.jpg", alt: "Washing and treatment area", width: 1400, height: 1400 },
  { src: "/images/salon-05.jpg", alt: "Salon interior with natural light", width: 1400, height: 1750 },
  { src: "/images/salon-06.jpg", alt: "Client experience at Salon Alain", width: 1400, height: 1000 },
];

export type WorkCategory =
  | "balayage"
  | "blonde"
  | "brunette"
  | "color"
  | "haircuts"
  | "styling"
  | "transformations"
  | "highlights"
  | "before-after";

export type WorkImage = SiteImage & { category: WorkCategory[]; title: string };

export const workImages: WorkImage[] = [
  { src: "/images/work-01.jpg", alt: "Soft caramel balayage", title: "Caramel balayage", category: ["balayage", "brunette"], width: 1200, height: 1500 },
  { src: "/images/work-02.jpg", alt: "Bright blonde transformation", title: "Luminous blonde", category: ["blonde", "transformations", "before-after"], width: 1200, height: 1200 },
  { src: "/images/work-03.jpg", alt: "Face-framing highlights", title: "Face-framing highlights", category: ["highlights", "blonde"], width: 1200, height: 1600 },
  { src: "/images/work-04.jpg", alt: "Precision bob haircut", title: "Precision bob", category: ["haircuts"], width: 1200, height: 1400 },
  { src: "/images/work-05.jpg", alt: "Glamorous evening styling", title: "Evening styling", category: ["styling"], width: 1200, height: 1200 },
  { src: "/images/work-06.jpg", alt: "Rich chocolate brunette color", title: "Chocolate brunette", category: ["brunette", "color"], width: 1200, height: 1500 },
  { src: "/images/work-07.jpg", alt: "Dimensional color transformation", title: "Dimensional color", category: ["color", "transformations", "before-after"], width: 1200, height: 1300 },
  { src: "/images/work-08.jpg", alt: "Honey balayage with glossing", title: "Honey balayage", category: ["balayage", "blonde"], width: 1200, height: 1600 },
  { src: "/images/work-09.jpg", alt: "Long layered haircut", title: "Long layers", category: ["haircuts", "styling"], width: 1200, height: 1200 },
  { src: "/images/work-10.jpg", alt: "Cool ash blonde highlights", title: "Ash blonde highlights", category: ["highlights", "blonde", "color"], width: 1200, height: 1500 },
  { src: "/images/work-11.jpg", alt: "Bridal styling", title: "Bridal styling", category: ["styling", "transformations"], width: 1200, height: 1400 },
  { src: "/images/work-12.jpg", alt: "Complete beauty transformation", title: "Complete transformation", category: ["transformations", "before-after", "color"], width: 1200, height: 1300 },
];

export const alainImages: SiteImage[] = [
  { src: "/images/alain-intro.jpg", alt: "Alain Martinos in the salon", width: 1200, height: 1500 },
  { src: "/images/alain-02.jpg", alt: "Alain Martinos at work", width: 1200, height: 1500 },
  { src: "/images/alain-03.jpg", alt: "Alain Martinos performing", width: 1200, height: 1200 },
  { src: "/images/alain-04.jpg", alt: "Part of Alain's Barbie collection", width: 1200, height: 1500 },
  { src: "/images/alain-05.jpg", alt: "Alain Martinos between Lebanon and Germany", width: 1200, height: 1500 },
];

export const heroImages = {
  salon: {
    src: "/images/hero-salon.jpg",
    alt: "Salon Alain interior",
    width: 2000,
    height: 1250,
  },

  about: {
    src: "/images/about-hero.jpg",
    alt: "Salon Alain atmosphere",
    width: 2000,
    height: 1250,
  },

  services: {
    src: "/images/services-hero.jpg",
    alt: "Hair color and styling at Salon Alain",
    width: 2000,
    height: 1100,
  },

  contact: {
    src: "/images/contact.jpg",
    alt: "Salon Alain reception",
    width: 1400,
    height: 1600,
  },

  beautyLove: {
    src: "/images/beauty-love-bg.png",
    alt: "Salon Alain Beauty is made with Love",
    width: 1228,
    height: 1216,
  },
};
export const videos = [
  {
    src: "/videos/alain-video-1.mp4",
    title: "Who is Alain Martinos",
  },
  {
    src: "/videos/alain-video-2.mp4",
    title: "Alain  Martinos the Visagist",
  },
  {
    src: "/videos/alain-video-4.mp4",
    title: "Alain Martinos with the Highlights Techniques ",
  },
  {
    src: "/videos/alain-video-8.mp4",
    title: "Alain Martinos Cut‘n Style & haircuts Techniques",
  }, {
    src: "/videos/alain-video-7.mp4",
    title: "Alain Martinos Funny Video",
  }, {
    src: "/videos/alain-video-10.mp4",
    title: "Salon Alain Hair & Beauty - by Alain Martinos",
  }, {
    src: "/videos/alain-video-3.mp4",
    title: "Alain Martinos Working Day",
  }, {
    src: "/videos/alain-video-9.mp4",
    title: "Alain Martinos beauty shots",
  }, {
    src: "/videos/alain-video-11.mp4",
    title: "Salon Alain Hair & Beauty - by Alain Martinos",
  }, {
    src: "/videos/alain-video-13.mp4",
    title: "Alain Martinos balayage technique with paintings without foils",
  },
   {
    src: "/videos/alain-video-14.mp4",
    title: "Alain Martinos & Men’s haircut in Germany ",
  },
];
