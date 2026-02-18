
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Users, 
  Sprout, 
  Activity, 
  Target, 
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Mail,
  ExternalLink,
  BookOpen,
  Calendar,
  Building,
  Cpu
} from 'lucide-react';
import { translations } from './translations';
import { Language, Theme } from './types';

// Helper Components
const ThemeToggle = ({ theme, toggle }: { theme: Theme, toggle: () => void }) => (
  <button 
    onClick={toggle}
    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
    aria-label="Toggle Theme"
  >
    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
  </button>
);

const LanguageToggle = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => (
  <button 
    onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')}
    className="px-3 py-1 border border-black dark:border-zinc-700 rounded-md font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
  >
    {lang === 'TR' ? 'EN' : 'TR'}
  </button>
);

const ProjectCard = ({ title, date, org, summary, icon: Icon, tags, lang }: any) => (
  <div className="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-full transform hover:-translate-y-2">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        <Icon size={32} />
      </div>
      <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
        <Calendar size={14} />
        {date}
      </div>
    </div>
    <h3 className="text-2xl font-black mb-2 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-sm text-blue-700 dark:text-blue-400 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
      <Building size={14} />
      {org}
    </p>
    <p className="text-zinc-700 dark:text-zinc-300 mb-6 flex-grow leading-relaxed font-medium">{summary}</p>
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag: string) => (
        <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
          {tag}
        </span>
      ))}
    </div>
    <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black group/btn mt-auto text-sm">
      {lang === 'TR' ? 'PROJEYİ İNCELE' : 'EXPLORE PROJECT'} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
    </button>
  </div>
);

const NewsCard = ({ title, date, excerpt, lang }: any) => (
  <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-all group">
    <div className="text-xs font-black text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-widest flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
      {date}
    </div>
    <h4 className="text-xl font-black mb-4 text-black dark:text-white group-hover:text-blue-600 transition-colors leading-snug">{title}</h4>
    <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-medium line-clamp-2">{excerpt}</p>
    <button className="text-sm font-black text-black dark:text-white flex items-center gap-2 group-hover:translate-x-2 transition-transform">
      {lang === 'TR' ? 'OKU' : 'READ'} <ChevronRight size={16} />
    </button>
  </div>
);

const SectionHeading = ({ children, subtitle, align = 'center' }: { children?: React.ReactNode, subtitle?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-4xl md:text-5xl font-black mb-6 text-black dark:text-white tracking-tighter">
      {children}
    </h2>
    {subtitle && <p className={`text-zinc-700 dark:text-zinc-400 max-w-2xl font-bold text-lg leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>}
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('TR');
  const [theme, setTheme] = useState<Theme>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t.nav_about, id: "about" },
    { name: t.nav_thematic, id: "thematic" },
    { name: t.nav_projects, id: "projects" },
    { name: t.nav_news, id: "news" },
    { name: t.nav_contact, id: "contact" },
  ];

  const newsItems = [
    {
      title: lang === 'TR' ? "AIxImpact, Sürdürülebilirlik Forumu'na ev sahipliği yaptı" : "AIxImpact hosted the Sustainability Forum",
      date: "12 MART 2025",
      excerpt: lang === 'TR' ? "Üniversite ve sanayi ortaklarını bir araya getiren forumda yapay zekanın yeşil dönüşümdeki rolü tartışıldı." : "The role of AI in green transformation was discussed at the forum, bringing together university and industry partners."
    },
    {
      title: lang === 'TR' ? "Yenişehir Projesi AB Fonu Desteği Aldı" : "Yenişehir Project Received EU Grant",
      date: "05 ŞUBAT 2025",
      excerpt: lang === 'TR' ? "İklim dirençli tarım çalışmalarımız, Avrupa Birliği tarafından stratejik öneme sahip olarak tanımlandı." : "Our climate-resilient agriculture work was identified as strategically important by the European Union."
    },
    {
      title: lang === 'TR' ? "Yapay Zeka ve Etik Çalıştay Serisi Başlıyor" : "AI and Ethics Workshop Series Begins",
      date: "20 OCAK 2025",
      excerpt: lang === 'TR' ? "Sosyal etki projelerinde veri gizliliği ve adalet odaklı yeni bir eğitim serisi duyuruldu." : "A new training series focused on data privacy and justice in social impact projects has been announced."
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-black font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-morphism py-4 shadow-xl border-b border-zinc-200 dark:border-zinc-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-0 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
              <span className="font-black text-xl italic">AI</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-black dark:text-white pl-2">
              xIMPACT
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)} 
                className="text-[12px] font-black text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-[0.2em]"
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              <LanguageToggle lang={lang} setLang={setLang} />
              <ThemeToggle theme={theme} toggle={toggleTheme} />
            </div>
          </div>

          <button className="md:hidden text-black dark:text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-black pt-32 px-8 md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)} 
                className="text-4xl font-black text-black dark:text-white uppercase text-left tracking-tighter"
              >
                {link.name}
              </button>
            ))}
            <div className="flex gap-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
              <LanguageToggle lang={lang} setLang={setLang} />
              <ThemeToggle theme={theme} toggle={toggleTheme} />
            </div>
          </div>
        </div>
      )}

      {/* Hero / About Section */}
      <section id="about" className="pt-40 pb-32 bg-white dark:bg-black overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                <Cpu size={14} />
                <span>Özyeğin University Strategic Initiative</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter leading-[0.9] uppercase">
                {t.about_title}
              </h1>
              <div className="space-y-6 text-xl text-zinc-700 dark:text-zinc-400 leading-relaxed font-medium max-w-xl">
                <p>{t.about_desc1}</p>
                <p>{t.about_desc2}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('contact')} className="px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 transition-all active:scale-95">
                  {lang === 'TR' ? 'KATILIM SAĞLA' : 'GET INVOLVED'}
                </button>
                <button onClick={() => scrollToSection('thematic')} className="px-8 py-5 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-black dark:text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                  {t.nav_thematic}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop" 
                className="relative rounded-[4rem] shadow-2xl object-cover w-full h-[600px] grayscale hover:grayscale-0 transition-all duration-700 border border-zinc-200 dark:border-zinc-800" 
                alt="AI impact visual" 
              />
              <div className="absolute -bottom-8 -right-8 glass-morphism p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-[280px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <BookOpen size={24} />
                  </div>
                  <span className="font-black text-sm uppercase tracking-tighter dark:text-white">
                    {lang === 'TR' ? 'Multidisipliner Yaklaşım' : 'Multidisciplinary Approach'}
                  </span>
                </div>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed uppercase">
                  {lang === 'TR' ? 'Mühendislik, Sosyal Bilimler ve İşletme bir arada.' : 'Engineering, Social Sciences, and Business combined.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thematic Areas */}
      <section id="thematic" className="py-32 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle={lang === 'TR' ? 'Sürdürülebilir bir dünya için odaklandığımız temel uzmanlık alanlarımız.' : 'Core areas of expertise we focus on for a sustainable world.'}>
            {t.thematic_title}
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Agri-Food */}
            <div className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-100 dark:border-zinc-800 group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sprout size={120} />
              </div>
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center text-emerald-600 mb-10 group-hover:scale-110 transition-transform">
                <Sprout size={48} />
              </div>
              <h3 className="text-3xl font-black mb-6 text-black dark:text-white uppercase tracking-tighter">
                <span className="text-blue-600 italic mr-1">AI</span>{t.agri_title.substring(2)}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-semibold leading-relaxed">{t.agri_desc}</p>
              <ul className="space-y-4">
                {[lang === 'TR' ? 'Akıllı Sulama' : 'Smart Irrigation', lang === 'TR' ? 'Hasat Tahmini' : 'Harvest Prediction', lang === 'TR' ? 'Lojistik Optimizasyon' : 'Logistic Optimization'].map(item => (
                  <li key={item} className="flex gap-3 items-center text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    <ChevronRight className="text-blue-600" size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Crises */}
            <div className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 border-4 border-blue-600 group relative transform scale-105 z-10">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={120} />
              </div>
              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center text-rose-600 mb-10 group-hover:scale-110 transition-transform">
                <Activity size={48} />
              </div>
              <h3 className="text-3xl font-black mb-6 text-black dark:text-white uppercase tracking-tighter">
                <span className="text-blue-600 italic mr-1">AI</span>{t.crises_title.substring(2)}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-semibold leading-relaxed">{t.crises_desc}</p>
              <ul className="space-y-4">
                {[lang === 'TR' ? 'Erken Uyarı Sistemleri' : 'Early Warning Systems', lang === 'TR' ? 'Acil Durum Yönetimi' : 'Emergency Management', lang === 'TR' ? 'Hasar Tespit Modelleri' : 'Damage Assessment Models'].map(item => (
                  <li key={item} className="flex gap-3 items-center text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    <ChevronRight className="text-blue-600" size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* SDG */}
            <div className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-100 dark:border-zinc-800 group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={120} />
              </div>
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center text-blue-600 mb-10 group-hover:scale-110 transition-transform">
                <Target size={48} />
              </div>
              <h3 className="text-3xl font-black mb-6 text-black dark:text-white uppercase tracking-tighter">
                <span className="text-blue-600 italic mr-1">AI</span>{t.sdg_title.substring(2)}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-semibold leading-relaxed">{t.sdg_desc}</p>
              <ul className="space-y-4">
                {[lang === 'TR' ? 'İklim Eylemi (SDG 13)' : 'Climate Action (SDG 13)', lang === 'TR' ? 'Nitelikli Eğitim (SDG 4)' : 'Quality Education (SDG 4)', lang === 'TR' ? 'Eşitsizliklerin Azaltılması' : 'Reduced Inequalities'].map(item => (
                  <li key={item} className="flex gap-3 items-center text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    <ChevronRight className="text-blue-600" size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <SectionHeading>{t.projects_title}</SectionHeading>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <ProjectCard 
              lang={lang}
              title={lang === 'TR' ? "Yenişehir İklim Dayanıklılığı" : "Yenişehir Climate Resilience"}
              date="2024–2026"
              org="EU-Türkiye Climate Grant"
              summary={lang === 'TR' 
                ? "Yenişehir'de yürütülen bu proje, iklim değişikliğine uyumlu, çevresel olarak sürdürülebilir ve üretken tarım sistemlerinin yapay zeka ile güçlendirilmesini hedeflemektedir."
                : "This project aims to strengthen climate-compatible, environmentally sustainable, and productive agricultural systems in Yenişehir using AI technology."}
              icon={Sprout}
              tags={["Agriculture", "Climate", "AI", "EU-Project"]}
            />
            <ProjectCard 
              lang={lang}
              title={lang === 'TR' ? "Afet Sonrası Drone Hasar Tespiti" : "Post-Disaster Drone Damage Detection"}
              date="2023–2025"
              org="TÜBİTAK 1001 / İBB AKOM"
              summary={lang === 'TR'
                ? "Büyük ölçekli afetlerde hızlı ve etkili hasar tespiti yapılmasını sağlamak amacıyla geliştirilen çok aşamalı bir drone yönlendirme ve görüntü işleme sistemidir."
                : "A multi-stage drone guidance and image processing system developed to ensure fast and effective damage detection in large-scale disasters."}
              icon={Activity}
              tags={["Disaster", "Drones", "Computer Vision", "Safety"]}
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden border-y border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle={lang === 'TR' ? 'Güçlerimizi birleştirdiğimiz kurumsal ve akademik paydaşlarımız.' : 'Our institutional and academic stakeholders with whom we join forces.'}>
            {t.partners_title}
          </SectionHeading>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity">
            <div className="h-12 w-auto flex items-center justify-center font-black text-2xl tracking-tighter text-zinc-400">ÖZYEĞİN UNIVERSITY</div>
            <div className="h-12 w-auto flex items-center justify-center font-black text-2xl tracking-tighter text-zinc-400">TÜBİTAK</div>
            <div className="h-12 w-auto flex items-center justify-center font-black text-2xl tracking-tighter text-zinc-400">EUROPEAN UNION</div>
            <div className="h-12 w-auto flex items-center justify-center font-black text-2xl tracking-tighter text-zinc-400">İBB AKOM</div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <SectionHeading>{t.news_title}</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((news, idx) => (
              <NewsCard key={idx} {...news} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-6xl md:text-8xl font-black mb-8 text-black dark:text-white tracking-tighter uppercase leading-[0.9]">
                {t.contact_title}
              </h2>
              <p className="text-2xl text-zinc-600 dark:text-zinc-400 font-bold max-w-3xl mx-auto">
                {t.contact_desc}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-24">
              {[
                { icon: Users, title: t.researcher_cta, items: lang === 'TR' ? ['Fikirlerinizi Paylaşın', 'Projelerinizi Entegre Edin', 'Asistanlık Başvurusu'] : ['Share Ideas', 'Integrate Projects', 'Apply for Assistantship'] },
                { icon: Globe, title: t.public_cta, items: lang === 'TR' ? ['Veri Temelli Çözümler', 'Saha İş Birlikleri', 'Kurumsal Ortaklık'] : ['Data-Driven Solutions', 'Field Collaborations', 'Corporate Partnership'] },
                { icon: Target, title: t.funding_cta, items: lang === 'TR' ? ['Projelere Destek Verin', 'Fon ve Bağış Yönetimi', 'Yeni Çağrılara Katılın'] : ['Support Projects', 'Fund Management', 'Join New Calls'] },
              ].map((card, i) => (
                <div key={i} className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500 transition-all group flex flex-col">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-blue-600 mb-10 w-fit group-hover:scale-110 transition-transform">
                    <card.icon size={48} />
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-black dark:text-white uppercase leading-tight tracking-tighter">{card.title}</h4>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {card.items.map(item => (
                      <li key={item} className="flex gap-3 items-center font-bold text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 group/link">
                    {lang === 'TR' ? 'BİLGİ AL' : 'GET INFO'} <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-16 md:p-24 rounded-[4.5rem] bg-black text-white text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 opacity-90 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="relative z-10 space-y-12">
                <h3 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase">
                  {lang === 'TR' ? 'Geleceği Beraber Tasarlayalım' : "Let's Design the Future Together"}
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <a href="mailto:aiximpact@ozyegin.edu.tr" className="flex items-center gap-4 bg-white/10 hover:bg-white text-white hover:text-blue-900 px-10 py-6 rounded-[2rem] transition-all backdrop-blur-md border border-white/20 group/mail shadow-2xl">
                    <Mail size={28} />
                    <span className="font-black text-xl tracking-widest uppercase">AIXIMPACT@OZYREGIN.EDU.TR</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  AI
                </div>
                <span className="text-3xl font-black tracking-tighter text-black dark:text-white pl-2">xIMPACT</span>
              </div>
              <p className="text-zinc-500 font-bold max-w-sm text-sm leading-relaxed uppercase">
                {lang === 'TR' ? 'Özyeğin Üniversitesi bünyesinde toplumsal fayda için yapay zeka çözümleri geliştiren araştırma ve etkileşim merkezi.' : 'Research and interaction center within Özyeğin University developing AI solutions for social benefit.'}
              </p>
            </div>
            <div>
              <h5 className="font-black text-black dark:text-white uppercase tracking-widest text-xs mb-8">Navigation</h5>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)} className="text-zinc-400 hover:text-blue-600 font-bold text-xs uppercase tracking-[0.2em] transition-colors">{link.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-black text-black dark:text-white uppercase tracking-widest text-xs mb-8">Connect</h5>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"><Globe size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"><ExternalLink size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] text-center">
              © 2025 ÖZYEĞİN UNIVERSITY. {lang === 'TR' ? 'TÜM HAKLARI SAKLIDIR.' : 'ALL RIGHTS RESERVED.'}
            </p>
            <div className="flex gap-8">
              <span className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">Privacy Policy</span>
              <span className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
