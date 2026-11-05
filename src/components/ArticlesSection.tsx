import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Tag, 
  ArrowRight, 
  X, 
  Share2, 
  MessageCircle, 
  Calendar, 
  Award, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ARTICLES_DATABASE, CLINIC_INFO } from '../data/mockData';
import { Article } from '../types';

interface ArticlesSectionProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  onOpenAppointment,
  onOpenWhatsApp
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos os Artigos' },
    { id: 'alimentacao', label: 'Alimentação & IA' },
    { id: 'sono', label: 'Sono do Bebê' },
    { id: 'doencas-comuns', label: 'Febre & Doenças' },
    { id: 'neonatologia', label: 'Recém-Nascido' },
    { id: 'desenvolvimento', label: 'Desenvolvimento' },
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATABASE.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleShare = () => {
    if (navigator.share && activeArticle) {
      navigator.share({
        title: activeArticle.title,
        text: activeArticle.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblioteca & Referência Pediátrica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Artigos Científicos e Dicas Seguras para a Família
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Conteúdo escrito e revisado pela Dra. Gabriela Lara para que os pais encontrem respostas confiáveis, respaldadas pela Sociedade Brasileira de Pediatria.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Live Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Pesquise por termo: febre, sono, bronquiolite, introdução alimentar, cólica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm placeholder:text-slate-400 transition-all outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-purple-100 hover:border-purple-300 p-6 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-3">
                  
                  {/* Category & Time */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 text-[11px] uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {article.readTimeMinutes} min de leitura
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-800 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer of Card */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-900">
                  <span>Ler artigo completo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-3xl p-6 max-w-md mx-auto">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">Nenhum artigo encontrado para a busca "{searchTerm}"</p>
            <p className="text-xs text-slate-500 mt-1">Tente pesquisar por outros termos como sono, vacinas, febre ou alimentação.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-purple-700 hover:underline"
            >
              Ver todos os artigos
            </button>
          </div>
        )}

      </div>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-6 max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-purple-200">
                    ⏱ {activeArticle.readTimeMinutes} min de leitura • {activeArticle.publishedDate}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white text-xs flex items-center gap-1 transition-colors"
                    title="Compartilhar Artigo"
                  >
                    <Share2 className="w-4 h-4" />
                    {copySuccess && <span className="text-[10px] bg-emerald-500 px-1.5 py-0.5 rounded">Copiado!</span>}
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3 leading-snug">
                {activeArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 mt-1 font-medium">
                {activeArticle.subtitle}
              </p>

              {/* Byline */}
              <div className="mt-4 pt-3 border-t border-purple-700/60 flex items-center gap-3">
                <img
                  src={CLINIC_INFO.profilePhoto}
                  alt={CLINIC_INFO.doctorName}
                  className="w-9 h-9 rounded-full object-cover object-[50%_30%] border border-white"
                />
                <div>
                  <p className="text-xs font-bold text-white">{CLINIC_INFO.doctorName}</p>
                  <p className="text-[10px] text-purple-200">{CLINIC_INFO.specialties} • {CLINIC_INFO.crm} • {CLINIC_INFO.rqe}</p>
                </div>
              </div>
            </div>

            {/* Modal Body: Scrollable Article Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
              
              {/* Introduction */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-purple-950 font-medium text-sm leading-relaxed">
                {activeArticle.content.introduction}
              </div>

              {/* Sections */}
              {activeArticle.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    {section.heading}
                  </h3>
                  
                  {section.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                      {p}
                    </p>
                  ))}

                  {section.bulletPoints && (
                    <ul className="space-y-2 pl-2">
                      {section.bulletPoints.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Takeaways / Resumo Prático */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Pontos Principais para Lembrar:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-900">
                  {activeArticle.content.takeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-[11px] text-slate-500">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Aviso Médico:</strong> As orientações contidas neste artigo possuem caráter exclusivamente educativo e informativo. Elas não substituem a consulta médica pediátrica presencial e o exame físico individualizado do seu filho.
                </p>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenWhatsApp();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Tirar Dúvida sobre este Tema (WhatsApp)</span>
              </button>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenAppointment();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta com a Dra. Gabriela</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
