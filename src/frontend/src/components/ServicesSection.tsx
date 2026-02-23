import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, TrendingUp, Smartphone, Search, Zap } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.',
  },
  {
    icon: Palette,
    title: 'Brand Design',
    description: 'Comprehensive branding solutions that capture your essence and resonate with your target audience.',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Strategic marketing campaigns that amplify your reach and convert visitors into loyal customers.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences on any device.',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Data-driven SEO strategies to boost your visibility and rank higher in search engine results.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast websites optimized for speed, accessibility, and conversion rates.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white">
            Our <span className="text-coral">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to elevate your business and engage your audience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-coral/50"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-coral group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-coral transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
