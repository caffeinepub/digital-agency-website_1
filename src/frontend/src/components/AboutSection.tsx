import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Target, Heart } from 'lucide-react';

const values = [
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Your success is our priority. We listen, understand, and deliver solutions that exceed expectations.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in every project, ensuring quality and attention to detail.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on measurable outcomes that drive real business growth and ROI.',
  },
  {
    icon: Heart,
    title: 'Passionate',
    description: 'We love what we do and it shows in every pixel, line of code, and strategy we create.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white">
            About <span className="text-coral">CodeCrafter</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate designers, developers, and strategists dedicated to creating exceptional digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-charcoal dark:text-white">
              Crafting Digital Excellence Since 2020
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CodeCrafter is more than just a digital agency – we're your partners in growth. With a proven track record of delivering innovative solutions, we combine creativity with technical expertise to bring your vision to life.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our multidisciplinary team works collaboratively to ensure every project not only meets but exceeds expectations. From startups to established enterprises, we've helped businesses of all sizes achieve their digital goals.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-coral mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-coral mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-coral mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-coral/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h4 className="text-lg font-bold text-charcoal dark:text-white">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
