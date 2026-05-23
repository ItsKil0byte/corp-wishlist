export default function StepByStep({ title = "Как это работает?", steps }) {
  return (
    <section className="w-full max-w-[1440px] mx-auto py-16 md:py-24 px-4 md:px-12 space-y-16 md:space-y-20">
      <div className="text-center space-y-3 md:space-y-4" data-reveal>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
          {title}
        </h2>
        <div className="h-1.5 w-20 md:w-24 bg-main-theme mx-auto rounded-full" />
      </div>

      <div className="relative space-y-16 md:space-y-12">
        {/* Connection Line (Desktop Only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-main-theme/20 via-blue-400/20 to-transparent hidden lg:block -translate-x-1/2" />

        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-24 ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
            data-reveal
          >
            {/* Image side */}
            <div className="w-full lg:w-1/2 group">
              <div className="glass-frame !p-2 md:!p-3 shadow-xl md:shadow-2xl group-hover:shadow-main-theme/10 group-hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-main-theme/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover rounded-xl md:rounded-2xl shadow-sm group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content side */}
            <div className={`w-full lg:w-1/2 space-y-5 md:space-y-6 ${
              index % 2 !== 0 ? "lg:text-right" : "lg:text-left"
            }`}>
              <div className={`flex items-center gap-4 mb-2 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : "text-left"
              }`}>
                <span className="flex items-center justify-center size-10 md:size-12 rounded-xl md:rounded-2xl bg-main-theme text-gray-900 text-lg md:text-xl font-black shadow-lg shadow-main-theme/20 shrink-0">
                  {index + 1}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-main-theme/20 to-transparent hidden lg:block" />
              </div>
              
              <h3 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                {step.title}
              </h3>
              
              {step.description && (
                <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl lg:mx-0">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
