export default function StepByStep({ title = "Как это работает?", steps }) {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4 space-y-12">
      <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 items-center text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {step.title}
            </h3>

            <div className="w-full aspect-video p-2 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {step.description && (
              <p className="text-gray-600">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
