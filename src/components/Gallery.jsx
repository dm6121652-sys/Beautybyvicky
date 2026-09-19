import React from 'react';
import HoverImageReveal from './HoverImageReveal';

const galleryItems = {
  itemCount: 6,
  item1: {
    text: "BRIDAL GLAM",
    image: { src: "david.png" },
  },
  item2: {
    text: "SOFT NATURAL",
    image: { src: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop" },
  },
  item3: {
    text: "BRIDAL MAKEUP",
    image: { src: "https://images.unsplash.com/photo-1512496015851-a1cbfc38d011?q=80&w=2000&auto=format&fit=crop" },
  },
  item4: {
    text: "FULL GLAM",
    image: { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2000&auto=format&fit=crop" },
  },
  item5: {
    text: "SKIN PREP",
    image: { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop" },
  },
  item6: {
    text: "MASTERCLASSES",
    image: { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop" },
  },
};

export default function Gallery() {
  return (
    <div id="gallery" className="h-screen w-full bg-white">
      <HoverImageReveal
        items={galleryItems}
        backgroundColor="#FFFFFF"
        textColor="#3A2A20"
        dimColor="#D3C9C1"
        font={{
          fontFamily: "Playfair Display",
          fontWeight: 400,
          fontSize: "3.5vw",
          lineHeight: "1.1em",
          letterSpacing: "0.02em",
          textAlign: "center"
        }}
        align="center"
        imageWidth={300}
        imageHeight={400}
        rounded={16}
        rowGap={20}
      />
    </div>
  );
}
