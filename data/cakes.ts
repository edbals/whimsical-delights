export interface Cake {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  tags: string[]
}

export const cakes: Cake[] = [
  {
    id: 'red-velvet-dream',
    name: 'Red Velvet Dream',
    description: 'Classic red velvet layers with velvety cream cheese frosting and a hint of cocoa. A timeless celebration favourite.',
    basePrice: 85,
    image: 'https://placehold.co/600x400/8B1A1A/F5EDE0?text=Red+Velvet+Dream',
    tags: ['Bestseller', 'Classic'],
  },
  {
    id: 'matcha-cloud',
    name: 'Matcha Cloud',
    description: 'Delicate matcha-infused layers with Swiss meringue buttercream and a dusting of ceremonial-grade matcha.',
    basePrice: 90,
    image: 'https://placehold.co/600x400/A8C5A0/1C1C1C?text=Matcha+Cloud',
    tags: ['New', 'Fan Favourite'],
  },
  {
    id: 'golden-lotus',
    name: 'Golden Lotus',
    description: 'Lotus Biscoff caramelised layers with Biscoff spread buttercream and crushed biscuit crumble on top.',
    basePrice: 95,
    image: 'https://placehold.co/600x400/C8883A/FDFAF7?text=Golden+Lotus',
    tags: ['Trending', 'Indulgent'],
  },
  {
    id: 'lemon-sunshine',
    name: 'Lemon Sunshine',
    description: 'Bright lemon drizzle sponge with lemon curd filling and whipped cream cheese frosting. Light and zesty.',
    basePrice: 80,
    image: 'https://placehold.co/600x400/F9F0A0/1C1C1C?text=Lemon+Sunshine',
    tags: ['Light', 'Seasonal'],
  },
  {
    id: 'funfetti-fiesta',
    name: 'Funfetti Fiesta',
    description: 'Vanilla confetti sponge loaded with rainbow sprinkles, finished with a cloud of vanilla Swiss meringue.',
    basePrice: 75,
    image: 'https://placehold.co/600x400/F5E6C8/D4A5A5?text=Funfetti+Fiesta',
    tags: ['Party', 'Kids Favourite'],
  },
  {
    id: 'dark-forest',
    name: 'Dark Forest',
    description: 'Rich Black Forest layers with morello cherries, kirsch-soaked sponge, and clouds of whipped cream.',
    basePrice: 95,
    image: 'https://placehold.co/600x400/2D1B0E/F5EDE0?text=Dark+Forest',
    tags: ['Decadent', 'Classic'],
  },
]
