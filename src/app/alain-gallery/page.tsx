import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Alain Martinos Gallery | Salon Alain Martinos",
  description: "A photographic gallery of Alain Martinos.",
  alternates: { canonical: "/alain-gallery" },
};

type GalleryImage = {
  src: string;
  alt: string;
};

// Add your 30 photos to: public/images/alain-gallery/
// Name them: 01.jpg, 02.jpg, 03.jpg ... 30.jpg
const galleryImages: readonly GalleryImage[] = Array.from(
  { length: 37 },
  (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      src: `/images/alain-gallery/${number}.jpg`,
      alt: `Alain Martinos gallery photograph ${index + 1}`,
    };
  },
);

export default function AlainGalleryPage() {
  return (
    <main className="alain-full-gallery">
      <div className="alain-full-gallery-grid">
        {galleryImages.map((image) => (
          <figure key={image.src} className="alain-full-gallery-image">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </figure>
        ))}
      </div>

      <style>{`
        .alain-full-gallery {
          min-height: 100vh;
          padding: 16px;
          background: #12081f;
        }

        .alain-full-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          width: min(100%, 1440px);
          margin: 0 auto;
        }

        .alain-full-gallery-image {
          position: relative;
          aspect-ratio: 4 / 5;
          margin: 0;
          overflow: hidden;
          background: #241334;
        }

        @media (max-width: 1024px) {
          .alain-full-gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .alain-full-gallery {
            padding: 8px;
          }

          .alain-full-gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
        }
      `}</style>
    </main>
  );
}