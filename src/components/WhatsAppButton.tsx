"use client";

export function WhatsAppButton() {
  // Replace with Alain's WhatsApp number.
  // International format only: no +, spaces, or dashes.
  const phoneNumber = "96170585661";

  const message =
    "Hello Salon Alain, I would like to book an appointment.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Salon Alain on WhatsApp"
      className="
        group
        fixed
        bottom-5
        right-5
        z-[100]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_8px_30px_rgba(0,0,0,0.22)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-105
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#25D366]
        sm:bottom-7
        sm:right-7
        sm:h-16
        sm:w-16
      "
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 w-7 sm:h-8 sm:w-8"
      >
        <path d="M16.04 3C9.43 3 4.06 8.37 4.06 14.98c0 2.11.55 4.17 1.59 5.98L3 29l8.27-2.58a11.93 11.93 0 0 0 5.76 1.47h.01C23.65 27.89 29 22.52 29 15.91 29 9.3 23.64 3 16.04 3Zm0 22.86h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.91 1.53 1.31-4.79-.24-.39a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.91 7.02c0 5.47-4.45 9.92-9.07 10.5Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.93 8.93 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>

      {/* Desktop tooltip */}
      <span
        className="
          pointer-events-none
          absolute
          right-full
          mr-3
          hidden
          whitespace-nowrap
          rounded-full
          bg-ink
          px-4
          py-2
          font-sans
          text-xs
          font-medium
          text-white
          opacity-0
          shadow-lg
          transition-opacity
          duration-300
          group-hover:opacity-100
          sm:block
        "
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}