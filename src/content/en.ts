/**
 * English content. Every string on the site lives here.
 * To add German or Arabic, copy this file to de.ts / ar.ts and translate.
 */
export const en = {
  meta: {
    siteName: "Salon Alain",
    titleTemplate: "%s | Salon Alain – Hair & Beauty by Alain Martinos",
    defaultDescription:
      "Salon Alain – Hair & Beauty by Alain Martinos. Lebanese-German hairdresser and visagist with 25+ years of experience. Haircuts, color, balayage, highlights and beauty transformations in Zouk Mikael – Jounieh, Lebanon, and Germany.",
  },

  nav: {
    items: [
      { label: "Home", href: "/" },
      // { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Hair Salon", href: "/hair-salon" },
      { label: "Our Work", href: "/our-work" },
      { label: "Alain Martinos", href: "/alain-martinos" },
      { label: "Contact Us", href: "/contact" },
    ],
    book: "Book Appointment",
    menu: "Menu",
    close: "Close",
  },

  home: {
    hero: {
      // name: "Salon Alain",
      // line1: "Hair & Beauty",
      // line2: "by Alain Martinos",
      tagline: "Where beauty becomes art.",
      copy: "More than 25 years of artistry, experience and passion in hair, beauty and personal transformation — from Lebanon to Germany.",
      ctaPrimary: "Book Appointment",
      ctaSecondary: "Explore Our Work",
      scroll: "Scroll",
    },
    intro: {
      kicker: "Introduction",
      heading: "The art of beauty",
      p1: "For more than 25 years, Alain Martinos has dedicated his career to creating beauty through hair, styling, color and personal transformation.",
      p2: "Blending Lebanese glamour with European elegance, Alain approaches every client individually — creating looks designed around personality, facial features and lifestyle.",
      cta: "Discover Alain",
      facts: [
        { value: "25+", label: "years of artistry" },
        { value: "2", label: "countries, one signature" },
        { value: "1", label: "look made for you" },
      ],
    },
    services: {
      kicker: "Services",
      heading: "Our services",
      subtitle: "Personalized beauty, created around you.",
      cta: "View All Services",
    },
    salon: {
      kicker: "The salon",
      heading: "The salon",
      subtitle: "A personal space created for beauty.",
      cta: "Discover the Salon",
    },
    work: {
      kicker: "Portfolio",
      heading: "Our work",
      subtitle: "Every look is personal. Every transformation tells a story.",
      cta: "See the Full Portfolio",
    },
    video: {
      kicker: "Video",
      heading: "Beauty in motion",
      subtitle: "Discover transformations, styling moments and the artistry behind Salon Alain.",
      cta: "View More on YouTube",
      play: "Play video",
    },
    cta: {
      heading: "Your next look starts here",
      copy: "Whether you're looking for a subtle refresh or a complete transformation, every appointment begins with understanding you.",
      lebanon: "Book in Lebanon",
      germany: "Book in Germany",
    },
  },

  services: {
    list: [
      { slug: "haircolor", name: "Hair Color", short: "Professional color transformations with depth, dimension and elegance.", group: "color" },
      { slug: "haircuts", name: "Haircuts", short: "Personalized cuts designed around face shape, personality and lifestyle", group: "cut" },
      { slug: "balayage", name: "Balayage", short: "Natural, luminous and seamlessly blended color.", group: "balayage" },
      { slug: "highlights", name: "Highlights", short: "Classic and modern highlight techniques customized to every client.", group: "balayage" },
      { slug: "glossing", name: "Glossing", short: "Enhance shine, refresh tone and restore vibrancy.", group: "treatments" },
      { slug: "brushing-styling", name: "Brushing & Styling", short: "Elegant styling for everyday confidence or special occasions.", group: "styling" },
      { slug: "face-framing", name: "Face-Framing", short: "Strategically placed color and styling designed to complement facial features.", group: "styling" },
      { slug: "beauty-transformations", name: "Beauty Transformations", short: "A complete personalized approach combining color, cut, styling and visual harmony.", group: "transformations" },
    ],
    page: {
      title: "Services",
      description: "Haircuts, hair color, balayage, highlights, glossing, brushing & styling, face-framing and complete beauty transformations by Alain Martinos in Lebanon and Germany.",
      heading: "Services",
      subtitle: "Beauty designed around you.",
      intro: "Every service begins with a conversation. Alain studies your features, your hair and the life you live, then designs a look that belongs to you alone.",
      bookThis: "Book This Service",
      durationLabel: "Duration",
      priceLabel: "From",
      priceNote: "Prices are indicative and confirmed during your consultation.",
      groups: [
        {
          id: "cut",
          title: "Cut",
          lead: "Precision shaping that respects the way your hair falls and the way you move.",
          items: [
            { name: "Signature Haircut", desc: "A personalized cut designed around face shape, personality and lifestyle, finished with a blow-dry.", duration: "60 min", price: "—" },
            { name: "Restyle & Reshape", desc: "A complete change of length or shape, planned together during a dedicated consultation.", duration: "75 min", price: "—" },
            { name: "Fringe & Maintenance", desc: "Keep your signature cut sharp between full appointments.", duration: "20 min", price: "—" },
          ],
        },
        {
          id: "color",
          title: "Color",
          lead: "Depth, dimension and elegance — color that looks like it grew that way.",
          items: [
            { name: "Full Color", desc: "Professional color transformation with depth and shine, matched to your skin tone and eyes.", duration: "90 min", price: "—" },
            { name: "Root Touch-Up", desc: "Seamless regrowth coverage that blends invisibly into your existing color.", duration: "60 min", price: "—" },
            { name: "Color Correction", desc: "Careful, multi-step correction for color that didn't turn out as planned.", duration: "By consultation", price: "—" },
          ],
        },
        {
          id: "balayage",
          title: "Balayage & Highlights",
          lead: "Hand-painted light — natural, luminous and seamlessly blended.",
          items: [
            { name: "Balayage", desc: "Sun-kissed, low-maintenance dimension painted by hand for a soft, natural grow-out.", duration: "150 min", price: "—" },
            { name: "Highlights", desc: "Classic and modern foil techniques customized to every client, from subtle to bright.", duration: "120 min", price: "—" },
            { name: "Face-Framing Highlights", desc: "Strategically placed brightness around the face to open up and illuminate your features.", duration: "75 min", price: "—" },
          ],
        },
        {
          id: "treatments",
          title: "Treatments",
          lead: "Restore, refresh and protect.",
          items: [
            { name: "Glossing", desc: "Enhance shine, refresh tone and restore vibrancy between color appointments.", duration: "45 min", price: "—" },
            { name: "Deep Repair Treatment", desc: "Intensive nourishment for hair that has been colored, heat-styled or exposed to the sun.", duration: "45 min", price: "—" },
          ],
        },
        {
          id: "styling",
          title: "Styling",
          lead: "Elegant styling for everyday confidence or special occasions.",
          items: [
            { name: "Brushing", desc: "A polished blow-dry finish — smooth, voluminous or softly waved.", duration: "45 min", price: "—" },
            { name: "Occasion Styling", desc: "Editorial styling for weddings, evenings and moments that deserve to be remembered.", duration: "60–90 min", price: "—" },
            { name: "Bridal Hair", desc: "A trial session and wedding-day styling, planned around your dress, veil and vision.", duration: "By consultation", price: "—" },
          ],
        },
        {
          id: "transformations",
          title: "Transformations",
          lead: "A complete personalized approach combining color, cut, styling and visual harmony.",
          items: [
            { name: "Beauty Transformation", desc: "Cut, color and styling designed together as one composition — the full Salon Alain experience.", duration: "Half day", price: "—" },
            { name: "Visagist Consultation", desc: "Alain's trained eye for faces: a personal analysis of features, color harmony and the looks that will suit you best.", duration: "45 min", price: "—" },
          ],
        },
      ],
    },
  },

  about: {
    title: "About",
    description: "Discover Salon Alain — the philosophy, the 25+ years of experience, and the personalized approach to beauty between Lebanon and Germany.",
    heading: "About Salon Alain",
    subtitle: "Where beauty is created, not copied.",
    sections: [
      {
        id: "salon",
        title: "The salon",
        body: [
          "Salon Alain was created as a personal beauty environment — a place where experience, creativity and passion come together in a calm, elegant setting.",
          "Based in Zouk Mikael – Jounieh, and reaching clients in Germany, the salon is an extension of Alain Martinos himself: artistic, warm and made with an unmistakable love for beauty.",
        ],
      },
      {
        id: "philosophy",
        title: "Our philosophy",
        body: [
          "Beauty should be individual, sophisticated, feminine and expressive. Trends come and go; what stays is the way you feel when you see yourself.",
          "Every look at Salon Alain is composed rather than copied — adapted to your personality, your features and the life you live.",
        ],
        quote: "Beauty is not merely something we see — it is something we create, express and preserve.",
      },
      {
        id: "experience",
        title: "25+ years of experience",
        body: [
          "Alain's career in hairdressing and beauty spans more than a quarter of a century — cutting, coloring, balayage, highlights, glossing, styling, brushing, face-framing and complete transformations.",
          "That experience means calm hands, an honest eye and the confidence to tell you what will truly suit you.",
        ],
      },
      {
        id: "two-worlds",
        title: "Beauty between Lebanon & Germany",
        body: [
          "Born in Lebanon and having built a life in Germany, Alain understands both the glamour and aesthetic traditions of the Middle East and the European approach to fashion, beauty and individual expression.",
          "The result is a signature that feels at home in Beirut and in Berlin alike: polished, personal and never overdone.",
        ],
      },
      {
        id: "personal",
        title: "A personalized approach",
        body: [
          "There is no menu of looks at Salon Alain. Each appointment begins with understanding you — your face shape, your hair, your routine and the moments you are preparing for.",
          "From there, Alain designs cut, color and styling as one harmonious composition.",
        ],
      },
    ],
    why: {
      title: "Why Salon Alain",
      points: [
        { title: "A trained visagist's eye", desc: "Alain studies faces as well as hair, so color and cut are chosen to flatter your features." },
        { title: "Two cultures, one signature", desc: "Lebanese glamour meets European elegance in a style that is polished and personal." },
        { title: "Time, not turnover", desc: "Appointments are unhurried. Your consultation is part of the service, never an extra." },
        { title: "Honest advice", desc: "Twenty-five years of experience means you will hear what truly suits you." },
      ],
    },
    cta: "Meet Alain Martinos",
  },

  salon: {
    title: "Hair Salon",
    description: "Welcome to Salon Alain in Zouk Mikael – Jounieh, Lebanon. Discover the space, the styling stations, the atmosphere and the client experience designed by Alain Martinos.",
    heading: "Welcome to Salon Alain",
    subtitle: "A space designed as an extension of Alain's artistic identity.",
    intro: [
      "Salon Alain was never meant to be simply a place to have one's hair done. Alain envisioned a personal beauty environment where experience, creativity and passion could come together.",
      "Soft light, lavender details, unhurried appointments and a single guiding idea: every person who sits in the chair should leave feeling more like themselves.",
    ],
    pullQuote: "Every person who sits in the chair should leave feeling more like themselves.",
    experience: {
      title: "The experience",
      items: [
        { title: "Consultation", desc: "Every visit begins with a conversation about your hair, your features and the look you have in mind." },
        { title: "Styling stations", desc: "Calm, well-lit stations designed for precision work and comfortable, relaxed sittings." },
        { title: "Beauty details", desc: "Carefully chosen products, mirrors and finishing touches that complete the look." },
        { title: "Atmosphere", desc: "Music, warmth and the personal attention of a stylist who has done this for 25 years." },
      ],
    },
    galleryTitle: "Inside the salon",
    locationsTitle: "Our locations",
    mapPlaceholder: "Map will appear here",
    openInMaps: "Open in Maps",
    hoursTitle: "Opening hours",
    book: "Book Here",
  },

  work: {
    title: "Our Work",
    description: "Portfolio of hair color, balayage, blonde, brunette, highlights, haircuts, styling and complete transformations by Alain Martinos.",
    heading: "Our work",
    subtitle: "Every look is personal. Every transformation tells a story.",
    all: "All",
    // categories: [
    //   { id: "all", label: "All" },
    //   { id: "balayage", label: "Balayage" },
    //   { id: "blonde", label: "Blonde" },
    //   { id: "brunette", label: "Brunette" },
    //   { id: "color", label: "Color" },
    //   { id: "haircuts", label: "Haircuts" },
    //   { id: "styling", label: "Styling" },
    //   { id: "transformations", label: "Transformations" },
    // ],
    empty: "No looks in this category yet.",
    lightbox: { close: "Close", prev: "Previous image", next: "Next image" },
  },

  alain: {
    title: "Alain Martinos",
    description: "The story of Alain Martinos — Lebanese-German hairdresser, visagist, singer and Barbie collector with more than 25 years of experience in beauty.",
    roles: ["Hairdresser", "Visagist", "Singer", "Barbie Collector", "Creative Artist"],
    heading: "Alain Martinos",
    intro:
      "Alain Martinos is a Lebanese-German hairdresser, visagist, singer, and one of the most passionate Barbie collectors in the Middle East. His life and career have been built around one central idea:",
    thesis: "Beauty is not merely something we see — it is something we create, express, and preserve.",
    introAfter:
      "For Alain, hair, makeup, music, fashion, and dolls are not separate worlds. They are different forms of the same artistic language: ways of transforming imagination into something real.",
    chapters: [
      {
        id: "passion",
        number: "I",
        title: "A passion for beauty",
        paragraphs: [
          "Alain's professional journey in hairdressing and beauty spans more than 25 years. From an early age, he was fascinated by transformation — the ability of a hairstyle, color, makeup look, or carefully created image to completely change the way someone feels about themselves.",
          "Over the years, he developed his identity as both a hairdresser and visagist, combining technical precision with an artistic eye. His work encompasses cutting, coloring, balayage, highlights, glossing, styling, brushing, face-framing, and personalized beauty transformations.",
          "His philosophy is not simply to follow trends. Alain believes that beauty should be individual, sophisticated, feminine, and expressive — adapted to the personality and features of each person.",
        ],
        aside: {
          title: "This philosophy became the foundation of Salon Alain — Hair & Beauty by Alain Martinos.",
          body: "Based in Zouk Mikael – Jounieh, Lebanon, Alain created his salon as more than simply a place to have one's hair done. He envisioned a personal beauty environment where experience, creativity, and passion could come together. The salon is an extension of Alain himself: elegant, artistic, personal, and created with an unmistakable love for beauty.",
        },
      },
      {
        id: "singer",
        number: "II",
        title: "Alain the singer",
        paragraphs: [
          "Alain has been singing since 2001. Music has remained an important part of his creative identity for more than two decades.",
          "Singing offered Alain another medium through which to express emotion, dreams, vulnerability, strength, glamour, and femininity.",
          "One of his most important artistic inspirations is Lebanese superstar Nawal Al Zoghbi. Her presence, femininity, elegance, glamour, and distinctive artistic identity became a lasting source of inspiration. For Alain, her artistry represented the possibility of bringing together femininity, glamour, music, personality, and visual identity into something unforgettable.",
          "Music remains an important part of Alain's identity today.",
        ],
        quote: "Singing is another way of creating beauty — with emotion instead of color.",
      },
      {
        id: "collector",
        number: "III",
        title: "Alain the Barbie collector",
        paragraphs: [
          "Alain's passion for Barbie collecting began in 2002, although the emotional connection began much earlier. As a child, Alain's first Barbie was a 1991 Hawaii Barbie, made in China. The doll became deeply associated with childhood imagination and his fascination with beauty, fashion, femininity, and fantasy.",
          "Years later, losing that childhood Barbie became an emotional memory that stayed with him. Instead of allowing that connection to disappear, Alain transformed it into something extraordinary. He began collecting.",
          "What started as a personal passion eventually became a lifelong project. Today, Alain has assembled a collection of more than 10,000 Barbie dolls, with a particular appreciation for the classic eras — especially the glamorous Superstar aesthetic of the 1980s and 1990s.",
        ],
        studies: {
          title: "He studies",
          items: ["Eras", "Editions", "Manufacturing countries", "Packaging variations", "Fashion designs", "Collectible versions", "Photography", "Cultural history"],
        },
        closing: [
          "For Alain, these dolls are not simply toys. They are pieces of fashion history, pop culture, design, childhood, and memory.",
        ],
        triptych: ["Each doll represents a moment in time.", "Each box preserves an aesthetic.", "Each face carries a story."],
      },
      {
        id: "more",
        number: "IV",
        title: "More than a collection",
        paragraphs: [
          "Alain considers himself not simply a collector, but also a Barbie historian, enthusiast, and preservationist. His collection represents decades of dedication.",
          "His love for Barbie connects naturally with the other worlds in his life.",
        ],
        lenses: [
          { role: "As a hairdresser", what: "he studies hair." },
          { role: "As a visagist", what: "he studies faces and makeup." },
          { role: "As a singer", what: "he studies performance and glamour." },
          { role: "As a collector", what: "he studies fashion, styling, photography, packaging, and cultural history." },
        ],
        closing: ["Barbie brings many different parts of Alain's creative personality together."],
      },
      {
        id: "two-worlds",
        number: "V",
        title: "A life between two worlds",
        paragraphs: [
          "Born in Lebanon, Alain later built a life in Germany while maintaining a deep connection to his Lebanese roots. Living between cultures gave him a distinctive perspective on beauty and identity.",
          "He understands both the glamour and aesthetic traditions of the Middle East and the European approach to fashion, beauty, and individual expression. His life has never fitted neatly into one category.",
        ],
        identities: ["A hairdresser.", "A visagist.", "A singer.", "A collector.", "A creative personality."],
        closing: ["Above all, he is someone who has always searched for ways to express himself through beauty and art."],
      },
      {
        id: "education",
        number: "VI",
        title: "Education beyond beauty",
        paragraphs: [
          "Although Alain is known professionally for hair and beauty, his academic background extends into another field: law. He completed advanced legal studies, including a D.E.A. in Intellectual Property Law.",
          "This unusual combination of law, beauty, music, and collecting reflects the complexity of his interests. Intellectual property, fashion, design, celebrity culture, art, and collectibles all intersect with worlds Alain naturally understands from different perspectives.",
        ],
      },
    ],
    inspiration: {
      title: "Inspiration",
      items: [
        { title: "Nawal Al Zoghbi", sub: "Music & glamour", desc: "Presence, femininity and a distinctive artistic identity — the proof that glamour and personality can become unforgettable." },
        { title: "Barbie", sub: "Beauty, fashion & imagination", desc: "Fashion history in miniature: eras, packaging, faces and the childhood dream of transformation." },
        { title: "Hair & Beauty", sub: "Artistic transformation", desc: "The daily craft of changing how someone feels about themselves — with scissors, color and light." },
        { title: "His own journey", sub: "Resilience", desc: "The long road between two countries, and the will to rebuild whenever it was needed." },
      ],
      resilience: {
        lead: "Alain's path has not always been easy. He has experienced difficult periods, professional disappointments, personal challenges, and moments when he had to rebuild himself.",
        lines: ["Yet creativity remained.", "Beauty remained.", "Music remained.", "Barbie remained.", "And so did Alain."],
      },
    },
    meaning: {
      title: "The meaning behind Alain Martinos",
      lead: "Alain's story is ultimately not about the number of years he has worked, the number of songs he has sung, or even the number of Barbie dolls he owns. It is about passion.",
      passions: ["A passion for creating beauty.", "A passion for music.", "A passion for fashion.", "A passion for preserving memories.", "A passion for remaining authentic."],
      arcs: [
        { from: "From a childhood Barbie", to: "to a collection exceeding 10,000 dolls." },
        { from: "From singing since 2001", to: "to building a career in beauty." },
        { from: "From Lebanon to Germany", to: "and back again." },
        { from: "From studying law", to: "to creating beauty transformations." },
      ],
      closing: [
        "Alain Martinos has never been only one thing.",
        "He has created a life where beauty, music, fashion, law, collecting, and imagination meet.",
      ],
    },
    finalQuote: {
      lines: ["Beauty is my profession.", "Music is my voice.", "Barbie is my history.", "Creativity is who I am."],
      attribution: "Alain Martinos",
    },
    cta: "Book with Alain",
  },

  contact: {
    title: "Contact Us",
    description: "Book an appointment with Alain Martinos in Zouk Mikael – Jounieh, Lebanon, or in Germany. Call, WhatsApp or send a request online.",
    heading: "Let's create your next look",
    subtitle: "Tell us a little about yourself and we will be in touch to confirm your appointment.",
    whatsapp: "Book via WhatsApp",
    whatsappMessage: "Hello Salon Alain, I would like to book an appointment.",
    details: { phone: "Phone", whatsapp: "WhatsApp", instagram: "Instagram", email: "Email" },
    form: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      location: "Preferred location",
      locationPlaceholder: "Choose a location",
      service: "Service",
      servicePlaceholder: "Choose a service",
      date: "Preferred date",
      message: "Message",
      messagePlaceholder: "Anything you'd like Alain to know beforehand?",
      submit: "Request Appointment",
      sending: "Sending…",
      success: "Thank you — your request has been received. We will confirm your appointment shortly.",
      error: "Something went wrong. Please try again or reach us directly on WhatsApp.",
      fallbackNote: "Prefer to talk? Send us a WhatsApp message and we will reply personally.",
    },
  },

  footer: {
    tagline: "Hair & Beauty by Alain Martinos",
    navTitle: "Navigation",
    contactTitle: "Contact",
    hoursTitle: "Opening hours",
    locationsTitle: "Locations",
    follow: "Follow",
    rights: "All Rights Reserved.",
    copyright: "© {year} Salon Alain – Hair & Beauty by Alain Martinos.",
  },

  common: {
    bookAppointment: "Book Appointment",
    viewAll: "View all",
    readMore: "Read more",
    backHome: "Back to home",
    notFound: { title: "Page not found", body: "The page you are looking for does not exist or has moved." },
  },
} as const;
