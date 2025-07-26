import React, { useState } from 'react';
import { Check, X, Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      icon: Star,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for individuals getting started',
      features: [
        '3 interviews per month',
        'Basic AI questions',
        'Standard video quality',
        'Email support',
        'Basic reports'
      ],
      limitations: [
        'No custom branding',
        'No advanced analytics',
        'No team collaboration'
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Pro',
      icon: Zap,
      price: { monthly: 49, yearly: 39 },
      description: 'Best for growing teams and professionals',
      features: [
        'Unlimited interviews',
        'Advanced AI analysis',
        'HD video recording',
        'Priority support',
        'Detailed AI reports',
        'Calendar integration',
        'Screen sharing',
        'Custom question banks'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-yellow-500 to-yellow-400'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 149, yearly: 119 },
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Pro',
        'Custom branding',
        'Panel interviews',
        'Advanced analytics dashboard',
        'API access',
        'SSO integration',
        'Dedicated support',
        'Custom AI models',
        'White-label solution'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Simple{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your interview needs. 
            Start free and upgrade as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-gray-700 rounded-full p-1 transition-colors duration-200 focus:outline-none"
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                isYearly ? 'translate-x-7' : 'translate-x-0'
              }`}></div>
            </button>
            <span className={`ml-3 ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly
              <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl shadow-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'border-yellow-400/50 shadow-yellow-400/20' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {plan.price.monthly === 0 ? '' : '/month'}
                  </span>
                </div>
                {isYearly && plan.price.monthly > 0 && (
                  <p className="text-sm text-green-400 mt-2">
                    Save ${(plan.price.monthly - plan.price.yearly) * 12}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-center opacity-50">
                    <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-500">{limitation}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 rounded-full font-bold transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:scale-105 shadow-lg hover:shadow-yellow-400/50'
                  : 'border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/10'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 border border-white/10">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-white font-semibold">Features</th>
                  <th className="text-center py-4 px-6 text-white font-semibold">Free</th>
                  <th className="text-center py-4 px-6 text-white font-semibold">Pro</th>
                  <th className="text-center py-4 px-6 text-white font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['Monthly Interviews', '3', 'Unlimited', 'Unlimited'],
                  ['AI Question Generation', '✓', '✓', '✓'],
                  ['Video Recording', '✓', 'HD Quality', 'HD + Cloud Storage'],
                  ['AI Analysis', 'Basic', 'Advanced', 'Custom Models'],
                  ['Team Collaboration', '✗', '✓', '✓'],
                  ['Custom Branding', '✗', '✗', '✓'],
                  ['API Access', '✗', '✗', '✓'],
                  ['Support', 'Email', 'Priority', 'Dedicated']
                ].map((row, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-4 px-6 font-medium">{row[0]}</td>
                    <td className="py-4 px-6 text-center">{row[1]}</td>
                    <td className="py-4 px-6 text-center">{row[2]}</td>
                    <td className="py-4 px-6 text-center">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;