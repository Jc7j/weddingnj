'use client'

import DecorativeBackground from '@/components/ui/decorative-background'

import type { ReactNode } from 'react'

const questions: Array<{ q: string; a: ReactNode }> = [
  {
    q: 'How do I RSVP?',
    a: (
      <>
        <a
          href="#rsvp"
          className="text-foreground/90 underline underline-offset-2 hover:text-foreground"
        >
          Fill out the RSVP form
        </a>{' '}
        and select the guests that you'll be bringing. Add your email so you can
        be notified of any updates.
      </>
    ),
  },
  {
    q: 'When is the RSVP deadline?',
    a: 'Please RSVP by Wednesday, April 1st 2026.',
  },
  {
    q: 'What should I do if I cannot make it?',
    a: 'We\'re sorry that you can\'t make it to our wedding, we understand traveling can be difficult. Please let us know as soon as possible and RSVP "no" so we can plan accordingly. If there are any changes about your RSVP, contact James or Nicole.',
  },
  {
    q: 'Can I bring a plus one or children?',
    a: 'Only guests listed on your invitation are invited due to limited capacity. We appreciate your understanding.',
  },
  {
    q: 'What time should guests arrive?',
    a: 'Please arrive 15-30 minutes before the ceremony so you can settle in and enjoy the garden setting.',
  },
  {
    q: 'Is there a dress code?',
    a: "Garden-formal or semi-formal. Attire examples are available above. The entire event will be outdoors so please dress accordingly. Please don't wear white.",
  },
  {
    q: "What's the weather like this time of year? Will it be hot? Should I bring anything?",
    a: "Typical daytime temperatures will be hot and humid, but in the evening, it'll be warm with a slight breeze. Hand fans and water will be available.",
  },
  {
    q: 'What happens if it rains?',
    a: 'We have a weather-appropriate backup within the garden to keep guests comfortable.',
  },
  {
    q: 'Is there parking available?',
    a: "Yes, Imelda's Garden has on-site parking.",
  },
  {
    q: 'What should I gift?',
    a: 'Your presence is the greatest gift! However, if you want to gift us something then we kindly request funds for our honeymoon.',
  },
  {
    q: 'Can I take photos during the ceremony?',
    a: "We kindly request an unplugged ceremony since we'll have professional photographers during the event. However, after the ceremony you can take all the photos you want.",
  },
  {
    q: 'Who should I contact if I have questions about the wedding day?',
    a: "If you have additional questions that aren't listed above, please contact James or Nicole.",
  },
]

export default function QASection() {
  return (
    <section id="qa" className="relative w-full bg-background py-16 lg:py-20">
      <DecorativeBackground variant="light" density="sparse" />
      <div className="container relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
        <h2 className="mb-6 text-center font-serif text-2xl text-foreground/90 sm:mb-8 sm:text-3xl lg:text-4xl">
          FAQ
        </h2>
        <div className="space-y-4 sm:space-y-5">
          {questions.map((item) => (
            <div
              key={item.q}
              className="border-muted-foreground/10 border-b pb-3 sm:pb-4"
            >
              <h4 className="mb-1.5 font-medium text-base text-foreground/90 sm:mb-2 sm:text-lg lg:text-xl">
                {item.q}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base lg:text-lg">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
