import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Fullstack', 'Mobile'];

  const projects = [
    {
      title: 'NexTrade E-Commerce',
      description: 'A cutting-edge shopping experience with real-time inventory and global payments.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Fullstack',
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Syncro Task Manager',
      description: 'Collaborative workspace with drag-and-drop boards and team analytics.',
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Frontend',
      tech: ['React', 'Dnd Kit', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'WeatherWise Dashboard',
      description: 'Ultra-precise weather forecasting with interactive satellite maps.',
      image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Frontend',
      tech: ['React', 'OpenWeather', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'DevPulse Community',
      description: 'Social platform for developers to share code and find collaborators.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Fullstack',
      tech: ['Node.js', 'Socket.io', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'CryptoTrack Pro',
      description: 'Real-time cryptocurrency tracking with professional market analysis.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Mobile',
      tech: ['React Native', 'Firebase', 'Web3.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Portfolio 2.0',
      description: 'Ultra-modern portfolio template for creative developers.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Frontend',
      tech: ['React', 'Framer Motion', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest font-bold text-accent-500 mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-12">
            Featured <span className="text-gradient">Projects</span>
          </h3>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-primary-500 border-primary-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card group rounded-3xl overflow-hidden hover:border-primary-500/50 transition-colors"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-dark/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] uppercase font-black tracking-tighter text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a href={project.liveUrl} className="flex items-center gap-2 text-white font-bold hover:text-primary-500 transition-colors">
                      <ExternalLink size={18} />
                      <span>Live</span>
                    </a>
                    <a href={project.githubUrl} className="flex items-center gap-2 text-zinc-500 font-bold hover:text-white transition-colors">
                      <GitHubIcon size={18} />
                      <span>Repo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
