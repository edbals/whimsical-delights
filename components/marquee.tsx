export default function Marquee() {
  const items = [
    'Angel Food',
    'Red Velvet',
    'Carrot Cake',
    'Chiffon',
    'Pound Cake',
    'Sponge Cake',
    'Butter Cake',
    'Genoise',
    'Biscuit Cake',
    'Flourless',
  ]

  const text = items.map((item) => `${item} ✦`).join('  ')

  return (
    <div className="w-full bg-rose/20 border-y border-rose/30 overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-sm font-medium text-rose font-sans tracking-wide px-4">
          {text}&nbsp;&nbsp;&nbsp;{text}
        </span>
        <span className="text-sm font-medium text-rose font-sans tracking-wide px-4" aria-hidden>
          {text}&nbsp;&nbsp;&nbsp;{text}
        </span>
      </div>
    </div>
  )
}
