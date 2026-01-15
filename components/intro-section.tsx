export function IntroSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl font-light text-foreground leading-tight text-balance font-riccione">
          <span className="text-muted-foreground/40">Faeth is a design studio for software.</span> We help you build
          from 0 to 1 and beyond.
        </h1>

        {/* Description */}
        <div className="mt-16 md:mt-24 text-left max-w-xl mx-auto">
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            A zero-to-one design studio, on a mission to build what&apos;s next.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We partner with founders and startups to create compelling digital products and brands. Whether you&apos;re
            just getting started, turning a napkin sketch into reality, or reinventing an existing product for the next
            stage of growth, we&apos;ll work with you to make the future arrive a little sooner.
          </p>
        </div>
      </div>
    </section>
  )
}
