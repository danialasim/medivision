import { Zap, MessageCircle, Stethoscope, Shield, TrendingUp, Clock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get comprehensive analysis of your medical reports in seconds with AI-powered insights and detailed breakdowns.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "Chat with AI",
    description: "Ask questions about your reports and get detailed explanations in simple, easy-to-understand language.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Stethoscope,
    title: "Specialist Recommendations",
    description: "Receive personalized specialist recommendations and actionable next steps based on your analysis.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Health Insights",
    description: "Track abnormal values, understand severity levels, and get insights into your overall health status.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your medical data is processed securely with enterprise-grade encryption and never stored permanently.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Access AI-powered medical report analysis anytime, anywhere, without waiting for appointments.",
    gradient: "from-red-500 to-pink-500",
  },
]

export function FeatureCards() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Better Health
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to understand your medical reports and take control of your health
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-transparent hover:shadow-2xl transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
                <div className="absolute inset-0 rounded-3xl bg-white dark:bg-gray-900 opacity-0 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
