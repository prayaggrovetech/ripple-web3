export function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "CONNECT WALLET",
      description: "Link your Web3 wallet in seconds. Support for MetaMask, WalletConnect, and 50+ wallets. Your keys, your crypto."
    },
    {
      number: "2",
      title: "BRIDGE ASSETS",
      description: "Cross-chain bridge from any network. Ethereum, Polygon, Arbitrum, Solana - seamless multi-chain experience."
    },
    {
      number: "3",
      title: "CHOOSE PROTOCOL",
      description: "Access top DeFi protocols. Uniswap, Aave, Compound, Curve - all integrated in one interface."
    },
    {
      number: "4",
      title: "EARN YIELD",
      description: "Start earning with automated strategies. Liquidity mining, yield farming, and staking rewards up to 20% APY."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="space-y-4 group">
              <div className="text-6xl md:text-[208px] font-extrabold hero-title group-hover:scale-105 transition-transform duration-300">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-foreground mono">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}