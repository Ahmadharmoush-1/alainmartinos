/**
 * Site-wide configuration:
 * contact details, locations, social links and videos.
 *
 * Edit this file to update phone numbers,
 * addresses, social media and hours everywhere.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://salonalain.com"
).replace(/\/$/, "");

/* =========================================================
   SITE
========================================================= */

export const site = {
  name: "Salon Alain",

  fullName: "Salon Alain – Hair & Beauty by Alain Martinos",

  owner: "Alain Martinos",

  /* =======================================================
     CONTACT
  ======================================================= */

  /**
   * I left the normal phone as your previous placeholder
   * because you only gave me the WhatsApp number.
   *
   * Replace these two when you have the salon phone number.
   */
  phone: "+961 70 585 661",

  phoneHref: "tel:+96170585661",

  /**
   * WhatsApp
   *
   * Using the number exactly as you provided it.
   * whatsappNumber MUST contain digits only.
   */
  whatsapp: "96170585661",

  whatsappNumber: "96170585661",

  email: "hello@salonalain.com",

  /* =======================================================
     SOCIAL MEDIA
  ======================================================= */

  social: {
    instagram:
      "https://www.instagram.com/salon_alain_hair_and_beauty/",

    facebook:
      "https://www.facebook.com/profile.php?id=61581423362816",

    tiktok:
      "https://www.tiktok.com/@alainmartinos?_r=1&_t=ZS-99j5Wz7IdVs",

    youtube:
      "https://www.youtube.com/@alainmartinos6403",
  },

  /* =======================================================
     GOOGLE MAPS
  ======================================================= */

  maps:
    "https://www.google.com/maps/place/Salon+Alain+Hair+%26+Beauty+-+Alain+Martinos/@33.9694255,35.6165458,17z/data=!4m14!1m7!3m6!1s0x151f3f34a4e5a4f9:0xd8ca22d31b961e6c!2sSalon+Alain+Hair+%26+Beauty+-+Alain+Martinos!8m2!3d33.9694255!4d35.6191207!16s%2Fg%2F11v5fb7ws_!3m5!1s0x151f3f34a4e5a4f9:0xd8ca22d31b961e6c!8m2!3d33.9694255!4d35.6191207!16s%2Fg%2F11v5fb7ws_?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D",

  /* =======================================================
     LOCATIONS
  ======================================================= */

  locations: [
    {
      id: "lebanon",

      country: "Lebanon",

      title: "Salon Alain Hair & Beauty – Alain Martinos",

      addressLines: [
        "Zouk Mikael – Jounieh",
        "Lebanon",
      ],

      /**
       * Leave empty unless you specifically have
       * a Google Maps EMBED URL.
       */
      mapEmbed: "",

      /**
       * Opens the real Salon Alain location
       * in Google Maps.
       */
      mapLink:
        "https://www.google.com/maps/place/Salon+Alain+Hair+%26+Beauty+-+Alain+Martinos/@33.9694255,35.6165458,17z/data=!4m14!1m7!3m6!1s0x151f3f34a4e5a4f9:0xd8ca22d31b961e6c!2sSalon+Alain+Hair+%26+Beauty+-+Alain+Martinos!8m2!3d33.9694255!4d35.6191207!16s%2Fg%2F11v5fb7ws_!3m5!1s0x151f3f34a4e5a4f9:0xd8ca22d31b961e6c!8m2!3d33.9694255!4d35.6191207!16s%2Fg%2F11v5fb7ws_?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D",

      hours: [
        {
          days: "Tuesday – Saturday",
          time: "10:00 – 19:00",
        },

        {
          days: "Sunday – Monday",
          time: "Closed",
        },
      ],

      bookHref:
        "https://wa.me/86170585661?text=Hello%20Salon%20Alain%2C%20I%20would%20like%20to%20book%20an%20appointment%20in%20Lebanon",
    },

    {
      id: "germany",

      country: "Germany",

      title: "Salon Alain – Germany",

      addressLines: [
        "Location to be announced",
        "Germany",
      ],

      mapEmbed: "",

      mapLink: "",

      hours: [
        {
          days: "By appointment",
          time: "Please contact us",
        },
      ],

      bookHref:
        "https://wa.me/86170585661?text=Hello%20Salon%20Alain%2C%20I%20would%20like%20to%20book%20an%20appointment%20in%20Germany",
    },
  ],

  /* =======================================================
     BEAUTY IN MOTION VIDEOS
  ======================================================= */

  /**
   * Local video files.
   *
   * Files should exist inside:
   *
   * public/videos/
   *
   * Example:
   * public/videos/alain-video-1.mp4
   */

  shorts: [
    {
      src: "/videos/alain-video-1.mp4",
      title: "Hair Transformation",
    },

    {
      src: "/videos/alain-video-2.mp4",
      title: "Creative Styling",
    },
  ],
} as const;

/* =========================================================
   WHATSAPP HELPER
========================================================= */

/**
 * Creates a WhatsApp URL.
 *
 * Example:
 *
 * whatsappHref()
 *
 * or:
 *
 * whatsappHref("Hello, I would like to book an appointment")
 */

export const whatsappHref = (text?: string) => {
  const baseUrl = `https://wa.me/${site.whatsappNumber}`;

  if (!text) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(text)}`;
};