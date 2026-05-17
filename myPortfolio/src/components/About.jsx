import { motion } from 'framer-motion';
import { Award, Code2, Users2, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '3+', icon: <Award className="text-primary-500" /> },
    { label: 'Projects Completed', value: '50+', icon: <Zap className="text-secondary-500" /> },
    { label: 'Happy Clients', value: '20+', icon: <Users2 className="text-accent-500" /> },
    { label: 'Tech Stack', value: '15+', icon: <Code2 className="text-primary-500" /> },
  ];

  return (
    <section id="about" className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-widest font-bold text-primary-500 mb-4">Discovery</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">
            About <span className="text-gradient">Me</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-2xl font-bold text-white mb-6">
              I'm Sameer, a passionate developer building the future of the web.
            </h4>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Based in the digital world, I specialize in crafting high-end, responsive, 
              and user-centric web applications. My approach blends technical excellence 
              with creative design to deliver products that truly stand out.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl group hover:border-primary-500/50 transition-colors"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-[500px] border border-white/10 group">
              <img 
                src="/Sameer.jpeg"
                alt="Profile"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Code2 className="text-primary-500" />
                </div>
                <div>
                  <div className="text-white font-bold">Web Developer</div>
                  <div className="text-xs text-zinc-400">Transforming ideas into reality</div>
                </div>
              </div>
            </div>

            {/* Decorative backgrounds */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
