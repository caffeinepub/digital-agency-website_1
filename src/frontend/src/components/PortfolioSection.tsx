import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce solution with seamless checkout and inventory management.',
    tags: ['React', 'Node.js', 'Stripe'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Brand Identity Redesign',
    category: 'Branding',
    description: 'Complete brand overhaul for a leading tech startup, including logo and guidelines.',
    tags: ['Design', 'Branding', 'Strategy'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Mobile Fitness App',
    category: 'Mobile Development',
    description: 'Cross-platform fitness tracking app with social features and AI coaching.',
    tags: ['React Native', 'AI', 'Health'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'SaaS Dashboard',
    category: 'Web Development',
    description: 'Analytics dashboard with real-time data visualization and reporting tools.',
    tags: ['TypeScript', 'Charts', 'API'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Marketing Campaign',
    category: 'Digital Marketing',
    description: 'Multi-channel marketing campaign that increased conversions by 300%.',
    tags: ['SEO', 'Social', 'Analytics'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Restaurant Website',
    category: 'Web Design',
    description: 'Beautiful restaurant website with online ordering and reservation system.',
    tags: ['Design', 'UX', 'Booking'],
    color: 'from-red-500 to-pink-500',
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white">
            Our <span className="text-coral">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our latest projects and see how we've helped businesses achieve their digital goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-charcoal dark:text-white group-hover:text-coral transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
