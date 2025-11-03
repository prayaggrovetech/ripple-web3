import { Users, DollarSign, Globe, Shield } from "lucide-react";

export function AchievementsSection() {
    const achievements = [
        {
            icon: Users,
            title: "Active DeFi users",
            value: "2.5M+",
            description: "Millions of users trust our platform for decentralized finance operations and yield generation."
        },
        {
            icon: DollarSign,
            title: "Total Value Locked",
            value: "$12.8B",
            description: "Billions in assets secured across multiple blockchain networks and DeFi protocols."
        },
        {
            icon: Globe,
            title: "Supported chains",
            value: "15+",
            description: "Multi-chain support including Ethereum, Polygon, Arbitrum, Solana, and more."
        },
        {
            icon: Shield,
            title: "Security audits",
            value: "100%",
            description: "All smart contracts audited by leading security firms. Zero exploits since launch."
        }
    ];

    return (
        <section className="px-4 py-16 md:px-8 md:py-24">
            <div className="mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 leading-tight hero-title">
                    PROTOCOL METRICS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {achievements.map((achievement, index) => {
                        const IconComponent = achievement.icon;
                        return (
                            <div key={index} className="group relative rounded-2xl overflow-hidden">
                                <div className="h-80 p-12 flex flex-col justify-between glass border-r border-b border-border hover:glow transition-all duration-700 ease-out">
                                    
                                    {/* Floating Icon */}
                                    <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                                        <IconComponent size={120} className="text-primary" />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] mb-8 mono">
                                            {achievement.title}
                                        </div>
                                        
                                        <div className="mb-6">
                                            <div className="text-7xl md:text-8xl font-black text-foreground leading-none tracking-tighter group-hover:text-primary transition-colors duration-500 mono">
                                                {achievement.value}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <p className="text-muted-foreground text-sm leading-relaxed font-normal max-w-xs">
                                            {achievement.description}
                                        </p>
                                    </div>
                                    
                                    {/* Animated accent line */}
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 animated-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}