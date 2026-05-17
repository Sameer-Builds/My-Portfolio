import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'JavaScript', level: 88 },
        { name: 'Bootstrap', level: 88 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'React.js', level: 80 }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Figma', level: 85 },
        { name: 'Vercel', level: 95 },
        { name: 'Postman', level: 88 },
        { name: 'Cursor', level: 90 },
        { name: 'Antigravity', level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-widest font-bold text-secondary-500 mb-4">Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">
            Technical <span className="text-gradient">Stack</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: catIndex * 0.2 }}
              className="p-2"
            >
              <h4 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                <span className="w-10 h-1 bg-primary-500 rounded-full" />
                {category.title}
              </h4>
              
              <div className="space-y-8">
                {category.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-3">
                      <span className="text-zinc-300 text-lg font-medium">{skill.name}</span>
                      <span className="text-zinc-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
          Skills
        </div>
      </div>
    </section>
  );
};

export default Skills;
