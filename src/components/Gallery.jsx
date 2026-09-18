import React from 'react';
import HoverImageReveal from './HoverImageReveal';

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const fallbackGallery = {
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
  const [items, setItems] = useState(fallbackGallery)

  useEffect(() => {
    if (!supabase) {
      // keep fallback items and show a console hint
      console.warn('Supabase not configured — using fallback gallery images')
      return
    }

    let mounted = true
    async function load() {
      try {
        const keys = ['gallery_item1','gallery_item2','gallery_item3','gallery_item4','gallery_item5','gallery_item6']
        const { data, error } = await supabase.from('assets').select('key,url').in('key', keys)
        if (error) {
          // silent fallback
          return
        }
        if (!mounted) return
        const map = {};
        (data || []).forEach(a => { map[a.key] = a.url })
        const custom = { ...fallbackGallery }
        for (let i = 1; i <= 6; i++) {
          const k = `gallery_item${i}`
          if (map[k]) custom[`item${i}`].image.src = map[k]
        }
        setItems(custom)
      } catch (e) {
        console.error(e)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div id="gallery" className="h-screen w-full bg-white">
      <HoverImageReveal
        items={items}
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
