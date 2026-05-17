import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, MapPin, Phone } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  const contactInfo = [
    { icon: <Mail className="text-primary-500" />, label: 'Email', value: 'sameerxdev@gmail.com', href: 'mailto:sameerxdev@gmail.com' },
    { icon: <Phone className="text-secondary-500" />, label: 'Phone', value: '0321 6903462', },
    { icon: <MapPin className="text-accent-500" />, label: 'Location', value: 'Sahiwal, Punjab, Pakistan', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-widest font-bold text-primary-500 mb-4">Connect</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">
            Get In <span className="text-gradient">Touch</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">Let's discuss your next project</h4>
              <p className="text-zinc-500 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or 
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a 
                  key={info.label} 
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card hover:border-primary-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{info.label}</div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-8">
              <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">Follow Me</div>
              <div className="flex gap-4">
                {[
                  { icon: <GitHubIcon />, href: 'https://github.com/Sameer-Builds' },
                  { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/sameer-akhtar-601349381/' }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary-500/50 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-primary-500" />
                    </div>
                    <h5 className="text-2xl font-bold text-white mb-2">Message Sent!</h5>
                    <p className="text-zinc-500">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider ml-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider ml-1">Your Message</label>
                      <textarea 
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center py-5 group"
                    >
                      {status === 'loading' ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
