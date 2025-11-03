export function StatsSection() {
  const stats = [
    {
      value: "100k+",
      label: "ACTIVE USERS",
      description: "Join thousands of investors who trust our platform for their investment needs."
    },
    {
      value: "$500M+",
      label: "ASSETS UNDER MANAGEMENT",
      description: "Over half a billion dollars in assets managed through our platform."
    },
    {
      value: "30+",
      label: "COUNTRIES SUPPORTED",
      description: "Available in over 30 countries worldwide with local support."
    },
    {
      value: "97%",
      label: "CUSTOMER SATISFACTION",
      description: "Consistently high ratings from our satisfied customer base."
    }
  ];

  return (
    <section className="px-4 py-16 md:px-8 md:py-24 bg-gray-50 rounded-3xl mx-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            TRUSTED BY INVESTORS
          </h2>
          <p className="text-gray-600 text-lg">
            Our platform continues to grow with the trust of investors worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="text-4xl md:text-5xl font-bold">
                {stat.value}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider">
                {stat.label}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}