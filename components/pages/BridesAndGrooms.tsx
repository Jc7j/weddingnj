'use client'

import Image from 'next/image'

import DecorativeBackground from '@/components/ui/decorative-background'

const weddingParty = [
  {
    id: 'maid-of-honor',
    name: 'Lorem Ipsum',
    role: 'Maid of Honor',
    side: 'bride',
    relationship: 'Best Friend',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    bgColor: '#F0D5D5',
    accentColor: '#E6D5F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'best-man',
    name: 'Dolor Sit',
    role: 'Best Man',
    side: 'groom',
    relationship: 'Brother',
    story:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    bgColor: '#D5E0E6',
    accentColor: '#D4E6D5',
    image: '/dogs/fish.png',
  },
  {
    id: 'bridesmaid-1',
    name: 'Consectetur Adipiscing',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'College Friend',
    story:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    bgColor: '#E6D5F0',
    accentColor: '#F0D5D5',
    image: '/dogs/kobe.png',
  },
  {
    id: 'groomsman-1',
    name: 'Eiusmod Tempor',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'Childhood Friend',
    story:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bgColor: '#D4E6D5',
    accentColor: '#D5E0E6',
    image: '/dogs/molly.png',
  },
  {
    id: 'bridesmaid-2',
    name: 'Incididunt Labore',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'Sister',
    story:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    bgColor: '#F0E6D5',
    accentColor: '#E6D5F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'groomsman-2',
    name: 'Magna Aliqua',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'Cousin',
    story:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    bgColor: '#F5DDD5',
    accentColor: '#D4E6D5',
    image: '/dogs/fish.png',
  },
  {
    id: 'bridesmaid-3',
    name: 'Veniam Quis',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'Work Friend',
    story:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    bgColor: '#D5E6F0',
    accentColor: '#F0D5D5',
    image: '/dogs/kobe.png',
  },
  {
    id: 'groomsman-3',
    name: 'Nostrud Exercitation',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'College Roommate',
    story:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
    bgColor: '#E6D5F0',
    accentColor: '#D5E0E6',
    image: '/dogs/molly.png',
  },
  {
    id: 'bridesmaid-4',
    name: 'Ullamco Laboris',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'Childhood Friend',
    story:
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.',
    bgColor: '#D5E6F0',
    accentColor: '#E6D5F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'groomsman-4',
    name: 'Aliquip Commodo',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'Brother',
    story:
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.',
    bgColor: '#F5DDD5',
    accentColor: '#D4E6D5',
    image: '/dogs/fish.png',
  },
]

export default function BridesAndGroomsSection() {
  return (
    <section
      id="wedding-party"
      className="relative min-h-screen w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <DecorativeBackground variant="light" density="medium" />

      {/* Floating Hearts Animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`floating-heart-${Date.now()}-${i}`}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 3}s`,
            }}
          >
            <span className="text-2xl opacity-10">💕</span>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-2 font-medium text-muted-foreground/70 text-xs tracking-[0.3em]">
            WEDDING PARTY
          </p>
          <h2 className="mb-4 font-serif text-3xl text-foreground/90 sm:text-4xl lg:text-6xl">
            Bridesmaids & Groomsmen
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {weddingParty.map((member) => (
            <div key={member.id} className="group relative h-full">
              {/* Card Background with Pattern */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30"
                style={{ backgroundColor: member.accentColor }}
              />

              {/* Main Card */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                {/* Card Header */}
                <div
                  className="relative px-6 pt-6 pb-4"
                  style={{ backgroundColor: `${member.bgColor}40` }}
                >
                  <h3 className="mb-1 font-serif text-foreground text-xl">
                    {member.name}
                  </h3>
                  <p className="font-medium text-foreground/60 text-sm">
                    {member.role}
                  </p>
                  {member.relationship && (
                    <p className="mt-1 text-foreground/50 text-xs">
                      {member.relationship}
                    </p>
                  )}
                </div>

                {/* Image Container */}
                <div className="relative mx-4 mb-4 h-64 overflow-hidden rounded-2xl shadow-inner after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: member.accentColor }}
                  />
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>

                {/* Story */}
                <div className="flex-1 px-6 pb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.story}
                  </p>
                </div>

                {/* Decorative Bottom Stripe */}
                <div
                  className="absolute right-0 bottom-0 left-0 h-1"
                  style={{ backgroundColor: member.accentColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(10px);
          }
          66% {
            transform: translateY(-15px) translateX(-10px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  )
}
