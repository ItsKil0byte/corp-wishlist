const stats = [
  { val: "0", title: "Ненужных подарков" },
  { val: "100%", title: "Попадание в цель" },
  { val: "2 мин", title: "Вашего времени" },
];

export default function Stats() {
  return (
    <section className="bg-main-theme-lite rounded-2xl p-12 text-center hover:-translate-y-1 transition-all shadow-xl border border-main-theme/10">
      <h2 className="text-3xl text-gray-900 font-bold mb-8">
        Сделаем праздники в вашем отделе веселее!
      </h2>
      <div className="flex flex-wrap justify-center gap-12">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-4xl font-black text-main-theme drop-shadow-sm">
              {stat.val}
            </span>
            <span className="text-gray-600 mt-1 font-medium">{stat.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
