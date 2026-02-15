
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SchoolAssistant from './components/SchoolAssistant';
import CursorTrail from './components/CursorTrail';
import { GamesSection } from './components/Games';
import { PageId } from './types';
import { SCHOOL_INFO, GALLERY_IMAGES, THOUGHTS } from './constants';
import { getDailyThought } from './services/geminiService';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [dailyThought, setDailyThought] = useState(THOUGHTS[0]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchThought = async () => {
      const thought = await getDailyThought();
      setDailyThought(thought || THOUGHTS[0]);
    };
    fetchThought();
  }, []);

  useEffect(() => {
    if (activePage === 'gallery') {
      const timer = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [activePage]);

  const renderHome = () => (
    <div className="animate-pop-in space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-16 overflow-hidden">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Drifting Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kids-blue/10 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-kids-pink/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-kids-yellow/10 rounded-full blur-[80px] animate-blob" style={{ animationDelay: '4s' }}></div>
          
          {/* Floating Sparkles & Icons */}
          <div className="absolute top-[15%] left-[5%] text-4xl opacity-20 animate-float">✨</div>
          <div className="absolute top-[60%] left-[10%] text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🎈</div>
          <div className="absolute top-[20%] right-[10%] text-5xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🌟</div>
          <div className="absolute bottom-[20%] left-[40%] text-4xl opacity-20 animate-float" style={{ animationDelay: '2.5s' }}>🎨</div>
          <div className="absolute top-[40%] right-[5%] text-4xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🚀</div>

          {/* Abstract Shapes */}
          <div className="absolute top-10 right-1/4 w-20 h-20 border-4 border-kids-purple/10 rounded-3xl rotate-12 animate-spin-slow"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-kids-green/10 rounded-full animate-bounce-subtle"></div>
        </div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="md:w-3/5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-md mb-6 border-2 border-kids-yellow animate-bounce-subtle">
              <span className="text-xl">🏆</span>
              <span className="font-bold text-sm text-kids-orange uppercase tracking-wider">No. 1 Primary School in Meerut Cantt</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              <span className="text-kids-blue">Where Every Child </span><br/>
              <span className="text-kids-pink">is a Hero! </span>
              <span className="text-kids-orange inline-block animate-wiggle">✨</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium leading-relaxed max-w-2xl">
              Since {SCHOOL_INFO.estd}, we've been blending <strong>Traditional Values</strong> with <strong>AI-Integrated Skills</strong> to nurture the leaders of tomorrow.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setActivePage('contact')} 
                className="group relative px-8 py-4 bg-kids-pink text-white text-xl font-display font-bold rounded-[2rem] shadow-fun hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden"
              >
                <span className="relative z-10">Enroll Today 🚀</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              <button 
                onClick={() => setActivePage('activities')} 
                className="px-8 py-4 bg-white text-kids-blue text-xl font-display font-bold rounded-[2rem] shadow-fun border-4 border-kids-blue hover:bg-blue-50 transition-all"
              >
                Explore Fun Zone 🎮
              </button>
            </div>

            <div className="mt-10 group">
              <div className="glass-card p-6 rounded-[2.5rem] shadow-kids-xl border-l-[12px] border-kids-yellow transform group-hover:-rotate-1 transition-transform">
                <div className="flex gap-4">
                  <div className="text-3xl text-kids-yellow"><i className="fas fa-magic"></i></div>
                  <div>
                    <h4 className="text-[10px] font-black text-kids-purple uppercase tracking-widest mb-1">Magical Thought</h4>
                    <p className="text-gray-800 font-bold italic text-base md:text-lg leading-snug">"{dailyThought}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/5 relative">
            <div className="absolute -inset-10 bg-kids-yellow/20 rounded-full blur-[80px] animate-pulse"></div>
            <div className="relative z-10">
              <img 
                src="https://picsum.photos/800/800?random=hero" 
                alt="Happy Kids" 
                className="blob-shape w-full shadow-2xl border-[8px] border-white animate-float"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border-4 border-kids-green animate-bounce">
                <p className="font-display font-bold text-kids-green text-center text-xs">
                  <span className="text-xl">🤖</span><br/>AI Learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kids-dark mb-4">Why Parents Love Us ❤️</h2>
            <div className="w-24 h-2 bg-kids-pink mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { color: 'bg-kids-blue', icon: '🛡️', title: 'Utmost Safety', text: 'CCTV surveillance & GPS tracked transport for peace of mind.' },
              { color: 'bg-kids-green', icon: '🧠', title: 'Holistic Growth', text: 'Yoga, Value Education, and Sports alongside core academics.' },
              { color: 'bg-kids-purple', icon: '💻', title: 'Future Ready', text: 'Innovative AI classes for kids from Class 1 onwards.' }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-[3rem] shadow-fun border-b-8 border-kids-dark/5 hover:-translate-y-4 transition-all group">
                <div className={`${item.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform text-white`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-20 bg-kids-purple/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto glass-card rounded-[4rem] p-10 md:p-16 border-4 border-white shadow-kids-xl flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 text-[10rem] text-kids-purple/5 font-display rotate-12 pointer-events-none">1990</div>
            <div className="lg:w-1/3 text-center">
              <div className="relative inline-block">
                <img 
                  src="https://picsum.photos/400/400?random=principal" 
                  className="w-64 h-64 rounded-full border-[10px] border-white shadow-2xl mx-auto"
                  alt="Principal"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-kids-yellow text-kids-dark px-6 py-2 rounded-full font-bold shadow-lg border-2 border-white whitespace-nowrap">
                  Principal's Desk
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-display font-bold text-kids-dark">{SCHOOL_INFO.principal}</h3>
                <p className="text-kids-purple font-black uppercase tracking-widest text-xs mt-1">Leading Gurukul since 1990</p>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white/60 p-6 rounded-3xl border-l-8 border-kids-pink shadow-sm">
                <h4 className="text-xl font-display font-bold text-kids-pink mb-4 italic">"Dear Parents & My Dear Little Ones,"</h4>
                <p className="text-gray-700 font-medium leading-relaxed text-lg">
                  Welcome to our family. Since <strong>1990</strong>, Gurukul Public School has been a beacon of nurturing and innovation in Meerut Cantt. We believe that every child is unique, which is why we've introduced <strong>AI-integrated learning</strong> to prepare them for the 21st century.
                </p>
                <p className="text-gray-700 font-medium leading-relaxed text-lg mt-4">
                  To our parents: Thank you for trusting us with your world. To our kids: Come and explore, play, and learn!
                </p>
              </div>
              <div className="flex items-center gap-4 text-kids-dark">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">📜</div>
                <p className="font-bold">34+ Years of Legacy in Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <section className="py-20 animate-pop-in container mx-auto px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-5xl font-display font-bold text-kids-pink mb-4">Nurturing Since {SCHOOL_INFO.estd}</h2>
          <p className="text-xl text-gray-600 font-medium italic">A legacy of excellence in Meerut Cantt.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white/90 p-10 rounded-[4rem] shadow-kids-xl border-4 border-white">
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/400/300?random=a1" className="rounded-[2rem] shadow-lg transform rotate-2" alt="Event" />
              <img src="https://picsum.photos/400/300?random=a2" className="rounded-[2rem] shadow-lg transform -rotate-3" alt="Class" />
              <img src="https://picsum.photos/400/300?random=a3" className="rounded-[2rem] shadow-lg transform -rotate-2 mt-4" alt="Play" />
              <img src="https://picsum.photos/400/300?random=a4" className="rounded-[2rem] shadow-lg transform rotate-4 mt-2" alt="School" />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h3 className="text-3xl font-display font-bold text-kids-blue">Our Mission</h3>
            <p className="text-lg text-gray-700 font-medium leading-relaxed italic">
              "To provide an environment that is not just a school, but a second home where discovery happens through play and love."
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-kids-blue/10 rounded-2xl border-2 border-kids-blue/20">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-bold text-kids-blue">Holistic Values</h4>
                <p className="text-xs text-gray-600">Building character along with grades.</p>
              </div>
              <div className="p-4 bg-kids-pink/10 rounded-2xl border-2 border-kids-pink/20">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-bold text-kids-pink">Safe Haven</h4>
                <p className="text-xs text-gray-600">Secure & nurturing environment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderAcademics = () => (
    <section className="py-20 container mx-auto px-4 animate-pop-in">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-display font-bold text-kids-teal mb-4">Learning Adventure 🌈</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium italic">Our curriculum is designed to spark curiosity and foster a love for lifelong learning through AI-integrated methods.</p>
      </div>

      <div className="space-y-12 max-w-5xl mx-auto">
        {[
          { 
            color: 'border-kids-teal', 
            title: 'Early Years (Nursery - KG)', 
            icon: '🎨', 
            desc: 'Focus on social interaction, motor skills, and creative play.',
            features: ['Sensory Play Labs', 'Storytelling Sessions', 'Basic Numeracy', 'Phonics Magic']
          },
          { 
            color: 'border-kids-blue', 
            title: 'Foundation (Classes 1 - 2)', 
            icon: '📐', 
            desc: 'Building core literacy and introducing logical thinking.',
            features: ['Bilingual Literacy', 'Math through Games', 'Environmental Studies', 'AI Pattern Logic']
          },
          { 
            color: 'border-kids-purple', 
            title: 'Primary (Classes 3 - 5)', 
            icon: '🚀', 
            desc: 'Advanced curriculum preparing stars for the future world.',
            features: ['English Literature', 'Digital Citizenship', 'Intro to Coding', 'Science Experiments']
          }
        ].map((level, i) => (
          <div key={i} className={`glass-card p-10 rounded-[3rem] shadow-kids-xl border-l-[16px] ${level.color} flex flex-col md:flex-row gap-10 items-start hover:scale-[1.02] transition-transform`}>
            <div className="text-7xl md:text-8xl flex-shrink-0 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{level.icon}</div>
            <div className="flex-grow">
              <h3 className="text-3xl font-display font-bold mb-3">{level.title}</h3>
              <p className="text-gray-600 font-bold mb-6 italic">{level.desc}</p>
              <div className="grid grid-cols-2 gap-4">
                {level.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-kids-yellow"></span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-kids-teal/10 p-12 rounded-[4rem] text-center border-4 border-dashed border-kids-teal/30">
        <h4 className="text-2xl font-display font-bold text-kids-teal mb-4">Did You Know? 🤖</h4>
        <p className="text-lg font-medium text-gray-700 max-w-2xl mx-auto">
          We are the first primary school in Meerut Cantt to integrate <strong>AI Logical Reasoning</strong> into our daily math curriculum, ensuring our kids stay ahead in the digital age.
        </p>
      </div>
    </section>
  );

  const renderFacilities = () => (
    <section className="py-20 container mx-auto px-4 animate-pop-in">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-display font-bold text-kids-green mb-4">Our Campus Nexus 🏫</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">Equipped with state-of-the-art facilities to ensure a safe, fun, and futuristic learning experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { icon: '🖥️', title: 'Smart Classrooms', desc: 'Interactive touchboards and AI-powered learning aids in every room.', color: 'border-blue-400' },
          { icon: '🧬', title: 'AI & Tech Lab', desc: 'Introduction to robotics and logic-building for young minds.', color: 'border-purple-400' },
          { icon: '🌿', title: 'Green Playground', desc: 'Large, lush green area for outdoor sports and physical activities.', color: 'border-green-400' },
          { icon: '📚', title: 'Kids Library', desc: 'A collection of over 2000 books ranging from fairy tales to science.', color: 'border-yellow-400' },
          { icon: '🚐', title: 'Safe Transport', desc: 'GPS-enabled school vans with trained attendants for safety.', color: 'border-pink-400' },
          { icon: '📹', title: 'CCTV Security', desc: '24/7 camera surveillance ensuring a 100% secure campus.', color: 'border-red-400' }
        ].map((facility, i) => (
          <div key={i} className={`glass-card p-8 rounded-[3rem] shadow-fun border-t-8 ${facility.color} hover:-translate-y-2 transition-transform`}>
            <div className="text-5xl mb-4">{facility.icon}</div>
            <h3 className="text-2xl font-display font-bold mb-2">{facility.title}</h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">{facility.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {[
          { label: 'Student-Teacher Ratio', val: '10:1' },
          { label: 'AC Smart Rooms', val: '100%' },
          { label: 'Green Area', val: '5000+ sq.ft' }
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 bg-white rounded-3xl shadow-kids-xl min-w-[150px] border-2 border-kids-green/20">
            <div className="text-3xl font-display font-bold text-kids-green">{stat.val}</div>
            <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContact = () => {
    if (formSubmitted) {
      return (
        <section className="py-20 animate-pop-in container mx-auto px-4">
          <div className="max-w-3xl mx-auto glass-card rounded-[4rem] p-16 shadow-kids-xl border-[12px] border-kids-green/30 text-center">
            <div className="text-8xl mb-8 animate-bounce">🎉</div>
            <h2 className="text-4xl font-display font-bold text-kids-dark mb-4">Magic Request Sent!</h2>
            <p className="text-xl text-gray-600 font-medium mb-10">Our admission gurus will contact you within 24 magical hours. Get ready for an amazing journey!</p>
            <button 
              onClick={() => setFormSubmitted(false)} 
              className="bg-kids-green text-white px-10 py-4 rounded-full font-display font-bold text-xl shadow-fun hover:translate-y-1 transition-all"
            >
              Back to Home
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="py-20 animate-pop-in container mx-auto px-4">
        <div className="max-w-5xl mx-auto glass-card rounded-[4rem] overflow-hidden shadow-kids-xl border-[12px] border-kids-yellow/30 flex flex-col md:flex-row">
          {/* Form Side */}
          <div className="md:w-3/5 p-8 md:p-12 bg-white">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-4xl font-display font-bold text-kids-dark flex items-center justify-center md:justify-start gap-3">
                Enroll Your Hero! 🎒
              </h2>
              <p className="text-gray-500 font-bold mt-2">Fill the magic scroll below to start the adventure.</p>
            </div>

            <form className="space-y-6" onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Child's Info */}
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Child's Name</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🧒</span>
                    <input type="text" placeholder="e.g. Advik Sharma" className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all" required />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Applying For</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🏫</span>
                    <select className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] pl-14 pr-6 py-4 outline-none font-bold text-sm appearance-none transition-all" required>
                      <option value="">Select Class</option>
                      <option>Playgroup</option>
                      <option>Nursery</option>
                      <option>LKG</option>
                      <option>UKG</option>
                      <option>Class 1</option>
                      <option>Class 2</option>
                      <option>Class 3</option>
                      <option>Class 4</option>
                      <option>Class 5</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Date of Birth</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📅</span>
                    <input type="date" className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Parent's Name</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">👤</span>
                    <input type="text" placeholder="Full Name" className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📞</span>
                    <input type="tel" pattern="[0-9]{10}" placeholder="10-digit Mobile" className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Residential Area</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📍</span>
                    <input type="text" placeholder="e.g. Meerut Cantt" className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] pl-14 pr-6 py-4 outline-none font-bold text-sm transition-all" required />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <label className="block text-xs font-black uppercase text-kids-blue tracking-widest ml-4">Any Specific Query?</label>
                <textarea rows={3} placeholder="Tell us what you're looking for..." className="w-full bg-blue-50/50 border-4 border-transparent focus:border-kids-blue/20 rounded-[1.5rem] px-6 py-4 outline-none font-bold text-sm transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="w-full group relative bg-kids-dark text-white text-xl font-display font-bold py-6 rounded-[2rem] shadow-fun hover:shadow-none hover:translate-y-1 transition-all overflow-hidden mt-4">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Submit Magic Request <i className="fas fa-paper-plane animate-float"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-kids-blue/20 to-kids-pink/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>
          </div>

          {/* Contact Info Side */}
          <div className="md:w-2/5 bg-kids-yellow/10 p-12 flex flex-col justify-center gap-10 border-l-4 border-dashed border-kids-yellow/40">
            <div>
              <h3 className="text-2xl font-display font-bold text-kids-orange mb-6 flex items-center gap-3">
                Visit Our Campus 📍
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl flex-shrink-0">🏫</div>
                  <div>
                    <p className="font-bold text-gray-800 leading-snug">{SCHOOL_INFO.address}</p>
                    <p className="text-xs font-black text-kids-orange uppercase mt-1">School Office</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl flex-shrink-0">📞</div>
                  <div>
                    <p className="font-bold text-gray-800 leading-snug">{SCHOOL_INFO.phone}</p>
                    <p className="text-xs font-black text-kids-orange uppercase mt-1">General Enquiry</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl flex-shrink-0">⏰</div>
                  <div>
                    <p className="font-bold text-gray-800 leading-snug">08:00 AM - 02:00 PM</p>
                    <p className="text-xs font-black text-kids-orange uppercase mt-1">Office Hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-kids-yellow relative overflow-hidden group">
              <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-kids-yellow rounded-full opacity-10 group-hover:scale-[10] transition-transform duration-700"></div>
              <p className="text-sm font-bold text-gray-600 italic relative z-10">"At Gurukul, we don't just enroll students, we welcome new members into our family. Looking forward to meeting you!"</p>
              <p className="mt-4 font-display font-bold text-kids-dark relative z-10">— Team Gurukul</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home': return renderHome();
      case 'about': return renderAbout();
      case 'academics': return renderAcademics();
      case 'facilities': return renderFacilities();
      case 'activities': return (
        <section className="py-20 container mx-auto px-4 animate-pop-in">
          <h2 className="text-5xl font-display font-bold text-center text-kids-yellow mb-16">Fun & Learn Zone 🎮</h2>
          <GamesSection />
        </section>
      );
      case 'gallery': return (
        <section className="py-20 animate-pop-in container mx-auto px-4">
          <h2 className="text-5xl font-display font-bold text-center text-kids-purple mb-12">Smiling Faces 📸</h2>
          <div className="relative max-w-5xl mx-auto rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
            <img src={GALLERY_IMAGES[carouselIndex]} className="w-full h-[500px] object-cover" alt="Gallery" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-white/20 rounded-full">
              {GALLERY_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setCarouselIndex(i)} className={`w-4 h-4 rounded-full ${i === carouselIndex ? 'bg-kids-yellow w-10' : 'bg-white/60'}`} />
              ))}
            </div>
          </div>
        </section>
      );
      case 'contact': return renderContact();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <CursorTrail />
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 animate-gradient-slow opacity-80"></div>
      <div className="bg-kids-dark text-white py-2 px-4 text-[10px] md:text-sm font-bold text-center relative z-50 flex items-center justify-center gap-4">
        <span>🏆 No. 1 in Meerut</span>
        <span>🤖 AI Integrated Classes</span>
        <span>📞 {SCHOOL_INFO.phone}</span>
      </div>
      <Navigation activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-grow relative z-10">{renderContent()}</main>
      <footer className="bg-kids-dark text-white pt-20 pb-10 text-center relative overflow-hidden">
        {/* Decorative elements for footer */}
        <div className="absolute -top-10 left-0 w-full h-20 bg-kids-dark transform -skew-y-2 origin-left"></div>
        <div className="relative z-10">
          <h2 className="font-display text-4xl mb-2 text-kids-yellow">{SCHOOL_INFO.name}</h2>
          <p className="opacity-80 mb-6 max-w-lg mx-auto text-sm">{SCHOOL_INFO.address}</p>
          <div className="flex flex-col items-center gap-3">
            <div className="h-[1px] w-24 bg-white/20 mb-3"></div>
            <p className="font-display text-lg tracking-wide flex items-center gap-2">
              Made with <span className="text-kids-pink animate-pulse text-2xl">❤️</span> for kids
            </p>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mt-4">
              &copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      <SchoolAssistant />
    </div>
  );
};

export default App;
