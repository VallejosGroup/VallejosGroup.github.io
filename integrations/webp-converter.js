import { convertImages } from "../scripts/convert-images.js";

/**
 * Astro integration for converting images to WebP format
 */
export default function webpConverter() {
  return {
    name: "webp-converter",
    hooks: {
      "astro:build:done": async ({ dir, routes, pages, logger }) => {
        logger.info("Converting images to WebP format...");

        try {
          // Run the image conversion
          await convertImages();
          logger.info("✅ Image conversion completed successfully");
        } catch (error) {
          logger.error("❌ Image conversion failed:", error.message);
          // Don't fail the build if image conversion fails
        }
      },
    },
  };
}
