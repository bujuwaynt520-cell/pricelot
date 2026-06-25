import Link from "next/link";
import { 
  BookOpen, 
  GraduationCap, 
  Layers, 
  ShieldAlert, 
  Award, 
  Globe, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  HelpCircle, 
  Clock, 
  User, 
  Tag, 
  Calculator, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  FileText,
  BadgePercent,
  ShieldCheck
} from "lucide-react";
import { 
  CATEGORIES, 
  ENGINE_ARTICLES, 
  SAMPLE_LESSONS_EXTENDED, 
  SAMPLE_STRATEGIES_EXTENDED, 
  SAMPLE_GLOSSARY_EXTENDED,
  AUTHORS
} from "./lib/contentEngine";
import NewsletterCTA from "./components/NewsletterCTA";

// Map icon string names to actual Lucide Icon elements safely
function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case "GraduationCap": return <GraduationCap className="w-5 h-5 text-orange-600" />;
    case "TrendingUp": return <TrendingUp className="w-5 h-5 text-orange-600" />;
    case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-orange-600" />;
    case "Award": return <Award className="w-5 h-5 text-orange-600" />;
    case "Layers": return <Layers className="w-5 h-5 text-orange-600" />;
    case "Globe": return <Globe className="w-5 h-5 text-orange-600" />;
    default: return <BookOpen className="w-5 h-5 text-orange-600" />;
  }
}

export default function HomePage() {
  // Pull structured database content statically
  const categoriesList = Object.values(CATEGORIES);
  const featuredArticles = ENGINE_ARTICLES.slice(0, 4);
  const featuredLessons = SAMPLE_LESSONS_EXTENDED.slice(0, 4);
  const featuredStrategies = SAMPLE_STRATEGIES_EXTENDED.slice(0, 3);
  const popularGlossary = SAMPLE_GLOSSARY_EXTENDED.slice(0, 8);
  const expertAuthors = Object.values(AUTHORS);

  return (
    <div className="space-y-12 text-left animate-fade-in">
      
      {/* Editorial Announcement Banner */}
      <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-zinc-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-500 bg-orange-950/50 border border-orange-900/30 px-2 py-0.5 rounded">
              Independent Audit Policy
            </span>
            <span className="text-zinc-500 text-xs font-mono">• Updated daily</span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-black italic tracking-tight text-white leading-tight">
            Sponsor-Free Market Analysis & Mechanical Trading Guides
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            PriceLot does not accept affiliate placement payments or listing referral commissions. Every broker audited, strategy tested, and technical course published is kept 100% objective.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/brokers"
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition text-center shadow"
          >
            Broker Matrix
          </Link>
          <Link
            href="/glossary"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono font-bold text-xs uppercase tracking-wider rounded-lg border border-zinc-750 transition text-center"
          >
            A-Z Dictionary
          </Link>
        </div>
      </div>

      {/* Main Investopedia Grid System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Rich Articles, Courses, and Strategies */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section: Learning Paths / Curriculum */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <h2 className="text-xl font-serif font-black italic text-zinc-900 flex items-center gap-2.5">
                <GraduationCap className="w-5.5 h-5.5 text-orange-600" /> Interactive Learning Paths
              </h2>
              <Link 
                href="/academy" 
                className="text-xs font-mono font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1 group"
              >
                All Courses <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/academy/${lesson.id}`}
                  className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 p-5 rounded-xl transition shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-orange-600 font-bold uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                        {lesson.category}
                      </span>
                      <span className="text-zinc-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition">
                      {lesson.title}
                    </h3>
                    <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-orange-600 transition">
                    <span>Level: <span className="font-bold uppercase text-zinc-700">{lesson.difficulty}</span></span>
                    <span className="flex items-center gap-1 font-bold">Start Path <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section: Featured Deep Dive Articles */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <h2 className="text-xl font-serif font-black italic text-zinc-900 flex items-center gap-2.5">
                <FileText className="w-5.5 h-5.5 text-orange-600" /> Deep Dive Editorial & Guides
              </h2>
              <Link 
                href="/articles" 
                className="text-xs font-mono font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1 group"
              >
                Browse All Guides <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 p-5 rounded-xl transition flex flex-col md:flex-row justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1.5 flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-400">
                      <span className="text-orange-600 font-bold uppercase">{article.category}</span>
                      <span>•</span>
                      <span>Updated {article.updatedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {AUTHORS[article.authorId]?.name || "Staff Contributor"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded-full text-[9px] font-mono text-zinc-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end shrink-0">
                    <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-150 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-600 transition">
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section: Backtested Mechanical Blueprints */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <h2 className="text-xl font-serif font-black italic text-zinc-900 flex items-center gap-2.5">
                <Layers className="w-5.5 h-5.5 text-orange-600" /> Quantitative Backtested Blueprints
              </h2>
              <Link 
                href="/strategies" 
                className="text-xs font-mono font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1 group"
              >
                All Blueprints <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredStrategies.map((strat) => (
                <Link
                  key={strat.id}
                  href={`/strategies/${strat.id}`}
                  className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-orange-200 p-4.5 rounded-xl transition shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-400 font-bold uppercase">{strat.difficulty}</span>
                      <span className="text-orange-600 font-black tracking-tight">{strat.winRateEstimate} Win</span>
                    </div>
                    <h3 className="text-xs font-bold text-zinc-900 group-hover:text-orange-600 transition line-clamp-1">
                      {strat.name}
                    </h3>
                    <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                      {strat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-zinc-100 flex justify-between items-center text-[9px] font-mono text-zinc-400">
                    <span className="px-1.5 py-0.5 bg-zinc-50 border border-zinc-150 rounded text-zinc-600 font-semibold">{strat.timeframe}</span>
                    <span className="text-orange-600 font-bold group-hover:translate-x-0.5 transition-transform">Analyze →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Taxonomy index, Sizing Tools, Expert Profiles, Audits */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Widget: Position Sizing Calculator */}
          <div className="bg-white border border-zinc-200 p-6 rounded-xl space-y-4 shadow-sm text-left">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 shadow-inner w-11 h-11 flex items-center justify-center">
              <Calculator className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono font-bold text-orange-600 uppercase tracking-widest">Axiomatic Sizing Tool</span>
              <h3 className="font-serif font-bold text-zinc-900 text-base italic leading-tight">Position Sizing Calculator</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Input your risk margins and stop loss coordinates to compute optimized standard lot allocations. Protect capital with direct math.
              </p>
            </div>
            <Link
              href="/tools"
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold font-mono uppercase tracking-wider rounded-lg border border-zinc-900 transition flex items-center justify-center gap-1.5 text-center shadow"
            >
              Launch Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Widget: A-Z Reference Glossary Terminology */}
          <div className="bg-white border border-zinc-200 p-6 rounded-xl space-y-4 shadow-sm text-left">
            <div className="border-b border-zinc-150 pb-2.5 flex items-center justify-between">
              <h3 className="font-serif font-black italic text-zinc-950 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-600" /> A-Z Reference Glossary
              </h3>
              <Link href="/glossary" className="text-[10px] font-mono font-bold text-orange-600 hover:text-orange-500">
                View All
              </Link>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Quick dictionary reference for foundational and quantitative market parameters:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold text-zinc-700">
              {popularGlossary.map((term) => (
                <Link
                  key={term.id}
                  href={`/glossary?term=${term.id}`}
                  className="px-2.5 py-1.5 bg-zinc-50 hover:bg-orange-50 hover:text-orange-600 border border-zinc-200 hover:border-orange-200 rounded-lg transition text-left flex items-center justify-between"
                >
                  <span className="truncate">{term.term}</span>
                  <ChevronRight className="w-3 h-3 text-zinc-300 group-hover:text-orange-600 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <NewsletterCTA />

          {/* Widget: Curated Taxonomy Categories */}
          <div className="bg-white border border-zinc-200 p-6 rounded-xl space-y-4 shadow-sm text-left">
            <h3 className="font-serif font-black italic text-zinc-950 text-sm border-b border-zinc-150 pb-2.5">
              Resource Hub Categories
            </h3>
            <div className="space-y-2.5">
              {categoriesList.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group flex items-center gap-3 p-2 hover:bg-zinc-50 border border-transparent hover:border-zinc-150 rounded-lg transition"
                >
                  <div className="p-2 bg-zinc-50 group-hover:bg-orange-50 rounded border border-zinc-200/50 group-hover:border-orange-100 transition shrink-0">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-zinc-800 group-hover:text-orange-600 transition truncate">
                      {category.name}
                    </div>
                    <p className="text-[10px] text-zinc-400 truncate leading-relaxed mt-0.5">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-orange-600 group-hover:translate-x-0.5 transition shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Widget: Verified Expert Contributors */}
          <div className="bg-white border border-zinc-200 p-6 rounded-xl space-y-4 shadow-sm text-left">
            <h3 className="font-serif font-black italic text-zinc-950 text-sm border-b border-zinc-150 pb-2.5">
              Editorial Board & Authors
            </h3>
            <div className="space-y-3">
              {expertAuthors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.id}`}
                  className="group flex items-start gap-3.5 p-1 rounded-lg transition"
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-lg shadow-inner shrink-0">
                    {author.avatar}
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="font-bold text-xs text-zinc-800 group-hover:text-orange-600 transition truncate">
                      {author.name}
                    </div>
                    <div className="text-[9px] font-mono text-zinc-400 font-bold truncate">
                      {author.role}
                    </div>
                    <p className="text-[10px] text-zinc-500 line-clamp-1 leading-normal">
                      {author.bio}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
