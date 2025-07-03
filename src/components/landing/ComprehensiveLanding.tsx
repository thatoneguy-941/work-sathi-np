import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, Users, FileText, Star, CheckCircle, ArrowRight, 
  Shield, Zap, Globe, Clock, DollarSign, BarChart3, 
  MessageSquare, Trophy, Smartphone, Palette, Quote
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedDemo from '@/components/demo/AnimatedDemo';

const ComprehensiveLanding = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: 'Smart Client Management',
      description: 'Organize clients with tags, track project history, and maintain detailed profiles with payment preferences.',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Project Tracking',
      description: 'Kanban boards, time tracking, file uploads, and deadline management in one unified workspace.',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: 'Professional Invoicing',
      description: 'Branded PDF invoices with auto-numbering, eSewa/Khalti integration, and payment tracking.',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Business Analytics',
      description: 'Revenue insights, client profitability, TDS calculations, and downloadable reports.',
      color: 'text-orange-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Bank-level security, automatic backups, and 99.9% uptime guarantee for your business data.',
      color: 'text-red-600'
    },
    {
      icon: Zap,
      title: 'Automation Tools',
      description: 'Automated payment reminders, recurring invoices, and smart notifications via WhatsApp/Email.',
      color: 'text-yellow-600'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Shrestha',
      role: 'Web Developer',
      company: 'Kathmandu',
      content: 'Worksathi transformed my freelance business. I can now track everything from one place and get paid faster.',
      rating: 5
    },
    {
      name: 'Priya Maharjan',
      role: 'Graphic Designer',
      company: 'Lalitpur',
      content: 'The invoice generator saves me hours every week. The eSewa integration is perfect for Nepali clients.',
      rating: 5
    },
    {
      name: 'Amit Tamang',
      role: 'Digital Marketer',
      company: 'Pokhara',
      content: 'Finally, a tool made for Nepal! The TDS calculator alone is worth the subscription.',
      rating: 5
    }
  ];

  const stats = [
    { number: '1000+', label: 'Active Freelancers' },
    { number: '50,000+', label: 'Invoices Generated' },
    { number: 'Rs. 10Cr+', label: 'Revenue Processed' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 clients',
        'Basic invoicing',
        'Project tracking',
        'Static QR codes',
        'Email support'
      ],
      isPopular: false,
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Pro Monthly',
      price: '399',
      period: 'per month',
      description: 'For active freelancers',
      features: [
        'Unlimited clients & projects',
        'Branded PDF invoices',
        'Dynamic QR codes',
        'Payment reminders',
        'TDS dashboard',
        'Priority support',
        'WhatsApp integration'
      ],
      isPopular: true,
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const
    },
    {
      name: 'Pro Yearly',
      price: '3,499',
      period: 'per year',
      description: 'Best value for professionals',
      features: [
        'Everything in Pro Monthly',
        'Contract templates',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Phone support',
        '27% savings'
      ],
      isPopular: false,
      buttonText: 'Choose Yearly',
      buttonVariant: 'outline' as const,
      badge: 'Save 27%'
    }
  ];

  const faqItems = [
    {
      question: 'Is Worksathi suitable for Nepali freelancers?',
      answer: 'Absolutely! Worksathi is specifically designed for Nepal with eSewa/Khalti integration, TDS calculations, and support for Nepali and English languages.'
    },
    {
      question: 'Can I use my own branding on invoices?',
      answer: 'Yes! Pro users can upload their logo, customize colors, and create professional branded invoices that match their business identity.'
    },
    {
      question: 'How does the payment integration work?',
      answer: 'We generate QR codes for eSewa and Khalti payments automatically. When clients pay, the invoice status updates automatically in your dashboard.'
    },
    {
      question: 'Is my data secure?',
      answer: 'We use bank-level encryption and store all data in secure servers. Your business information is protected with enterprise-grade security measures.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Demo */}
      <section className="symmetric-container symmetric-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit bg-blue-50 text-blue-700 border-blue-200">
                🇳🇵 Made for Nepal
              </Badge>
              <h1 className="text-heading">
                The Complete Freelance
                <span className="block text-primary">Business Platform</span>
              </h1>
              <p className="text-body max-w-2xl">
                Manage clients, track projects, generate professional invoices, and get paid faster. 
                Built specifically for Nepali freelancers with eSewa/Khalti integration and TDS support.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-4" onClick={() => window.location.href = '/auth'}>
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">1000+</span> freelancers trust Worksathi
              </div>
            </div>
          </div>

          {/* Animated Demo Window */}
          <div className="lg:sticky lg:top-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur"></div>
              <AnimatedDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="symmetric-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="symmetric-container symmetric-section">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-subheading">
            Everything You Need to Grow Your Business
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            From client management to payment collection, we've built every tool 
            a Nepali freelancer needs to run a professional business.
          </p>
        </div>

        <div className="symmetric-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="symmetric-container symmetric-section bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl mx-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-subheading text-white">
            Loved by Freelancers Across Nepal
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            See how Worksathi is helping freelancers grow their business and get paid faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 opacity-50 mb-4" />
                <p className="mb-6 leading-relaxed">{testimonial.content}</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm opacity-80">{testimonial.role}</div>
                  <div className="text-sm opacity-60">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="symmetric-container symmetric-section">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-subheading">
            Choose Your Plan
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features 
            with no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative h-full ${plan.isPopular ? 'border-2 border-primary shadow-lg scale-105' : ''}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-6 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="space-y-1">
                  <div className="text-4xl font-bold">
                    Rs. {plan.price}
                    <span className="text-lg text-muted-foreground font-normal">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full" 
                  size="lg"
                  onClick={() => window.location.href = '/auth'}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="symmetric-container symmetric-section">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-subheading">
            Frequently Asked Questions
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Have questions? We've got answers. Can't find what you're looking for? 
            Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqItems.map((item, index) => (
            <Card key={index} className="border-none bg-white/80 backdrop-blur">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="symmetric-container symmetric-section">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
          <CardContent className="text-center space-y-8 py-16">
            <h2 className="text-subheading text-white">
              Ready to Transform Your Freelance Business?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of successful freelancers who trust Worksathi to manage 
              their business and get paid faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="symmetric-container py-16 border-t">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">Worksathi</span>
          </div>
          <p className="text-muted-foreground">
            Empowering Nepali freelancers to build successful businesses.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Worksathi. Made with ❤️ in Nepal.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComprehensiveLanding;