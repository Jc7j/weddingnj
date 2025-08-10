'use client'

const questions = [
  {
    q: 'What is the dress code?',
    a: 'Cocktail attire. Please wear something comfortable for an outdoor garden wedding. Consider bringing a light jacket as it may get cool in the evening.',
  },
  {
    q: 'Is there parking available?',
    a: "Yes, there's ample free parking at Imelda's Garden. The venue has a dedicated parking area that can accommodate all guests.",
  },
  {
    q: 'Can I bring a plus one?',
    a: 'We have reserved a seat for you and your invited guests. Please refer to your invitation for details. If you have questions, feel free to reach out to us directly.',
  },
  {
    q: 'Are children welcome?',
    a: 'While we love your little ones, we have decided to make this an adults-only celebration. We hope you understand and can enjoy a night off!',
  },
  {
    q: 'Will there be vegetarian/vegan options?',
    a: 'Yes! We will have vegetarian and vegan options available. Please let us know about any dietary restrictions when you RSVP.',
  },
  {
    q: 'What time should I arrive?',
    a: 'Please arrive by 3:30 PM. The ceremony will begin promptly at 4:00 PM.',
  },
  {
    q: 'Is there a wedding registry?',
    a: 'Your presence at our wedding is the greatest gift of all. If you wish to honor us with a gift, a contribution to our honeymoon fund would be appreciated.',
  },
  {
    q: 'Will there be transportation provided?',
    a: 'We recommend arranging your own transportation to and from the venue. There are local taxi services and ride-sharing options available in the area.',
  },
  {
    q: 'What if I have food allergies?',
    a: 'Please indicate any food allergies or dietary restrictions when you RSVP. Our catering team will do their best to accommodate your needs.',
  },
  {
    q: 'Can I take photos during the ceremony?',
    a: 'We kindly ask that you refrain from taking photos during the ceremony. We have a professional photographer who will capture these special moments. Feel free to take photos during the reception!',
  },
]

export default function QASection() {
  return (
    <section id="qa" className="w-full bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-4xl px-6 lg:px-12">
        <h2 className="mb-8 text-center font-serif text-3xl text-foreground/90 lg:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {questions.map((item) => (
            <div
              key={item.q}
              className="border-muted-foreground/10 border-b pb-4"
            >
              <h3 className="mb-2 font-medium text-base text-foreground/90 lg:text-lg">
                {item.q}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
