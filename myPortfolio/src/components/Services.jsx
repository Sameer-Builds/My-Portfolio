import { motion } from 'framer-motion';
import { Code, LayoutTemplate, MonitorSmartphone, Zap, Globe, Search } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="text-primary-500" />,
      title: 'Frontend Development',
      description: 'Building responsive, high-performance web applications using modern frameworks like React and Next.js.',
    },
    {
      icon: <LayoutTemplate className="text-secondary-500" />,
      title: 'Figma to React',
      description: 'Converting professional Figma designs into pixel-perfect, interactive, and responsive React/Next.js components.',
    },
    {
      icon: <MonitorSmartphone className="text-accent-500" />,
      title: 'Responsive Design',
      description: 'Crafting fluid and adaptable layouts that provide a seamless experience across all screen sizes and devices.',
    },
    {
      icon: <Zap className="text-primary-500" />,
      title: 'Performance Optimization',
      description: 'Enhancing web speed and performance through code splitting, lazy loading, and optimized asset management.',
    },
    {
      icon: <Globe className="text-secondary-500" />,
      title: 'E-Commerce',
      description: 'Implementing full-scale e-commerce platforms with secure payments and inventory management.',
    },
    {
      icon: <Search className="text-accent-500" />,
      title: 'SEO Optimization',
      description: 'Enhancing website visibility and performance to rank higher in search engine results.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-widest font-bold text-primary-500 mb-4">Values</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">
            My <span className="text-gradient">Services</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card p-10 rounded-3xl group hover:border-primary-500/50 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary-500/10 transition-all">
                {service.icon}
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-500 transition-colors">
                {service.title}
              </h4>
              <p className="text-zinc-500 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
