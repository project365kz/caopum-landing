import { useState, useEffect, useRef, useCallback } from 'react'
import logoSvg from '/logo.svg'
import {
  Menu, X, ChevronDown, ArrowUp, Send,
  Target, ShieldCheck, Leaf, PackageCheck, Scale, Recycle,
  Landmark, FileText, Users, CalendarDays, ArrowLeftRight, Megaphone,
  Factory, Container, Film, Package, Boxes, Cog, RotateCcw,
  Handshake, MessageSquare, UserPlus, BookOpen, Award, Calendar,
  Mail, Phone, MapPin, CheckCircle2, ExternalLink
} from 'lucide-react'

/* ==================== ДАННЫЕ ==================== */

const NAV_LINKS = [
  { href: '#about', label: 'О нас' },
  { href: '#activities', label: 'Деятельность' },
  { href: '#benefits', label: 'Преимущества' },
  { href: '#forwho', label: 'Для кого' },
  { href: '#news', label: 'Новости' },
  { href: '#contacts', label: 'Контакты' },
]

const GOALS = [
  { icon: Target, title: 'Развитие отрасли', text: 'Развитие упаковочной отрасли Центральной Азии как единого и конкурентоспособного рынка' },
  { icon: Scale, title: 'Стандарты и регламенты', text: 'Участие в разработке технических регламентов и стандартов упаковочной продукции' },
  { icon: ShieldCheck, title: 'Защита производителей', text: 'Защита отечественных производителей от недобросовестной конкуренции и контрафакта' },
  { icon: PackageCheck, title: 'Безопасность упаковки', text: 'Повышение безопасности пищевой упаковки и контроль качества материалов' },
  { icon: Recycle, title: 'Борьба с контрафактом', text: 'Противодействие некачественной и контрафактной упаковочной продукции на рынке' },
  { icon: Leaf, title: 'Экология и переработка', text: 'Развитие переработки вторичного сырья и продвижение экологических инициатив' },
]

const ACTIVITIES = [
  { icon: Landmark, title: 'Взаимодействие с государством', text: 'Работа с государственными органами по вопросам регулирования упаковочной отрасли' },
  { icon: FileText, title: 'Отраслевые инициативы', text: 'Подготовка отраслевых предложений и инициатив для улучшения рыночных условий' },
  { icon: Users, title: 'Экспертная поддержка', text: 'Консультации и экспертная поддержка участников по техническим и правовым вопросам' },
  { icon: CalendarDays, title: 'Форумы и мероприятия', text: 'Организация встреч, форумов, круглых столов и отраслевых конференций' },
  { icon: ArrowLeftRight, title: 'Обмен технологиями', text: 'Содействие обмену опытом и передовыми технологиями между участниками рынка' },
  { icon: Megaphone, title: 'Информационная поддержка', text: 'Информационная и аналитическая поддержка рынка упаковочных материалов' },
]

const MEMBER_TYPES = [
  { icon: Factory, label: 'Производители полимерной упаковки' },
  { icon: Container, label: 'Производители ПЭТ-тары' },
  { icon: Film, label: 'Производители плёнок и пакетов' },
  { icon: Package, label: 'Производители гофрокартона' },
  { icon: Boxes, label: 'Поставщики сырья' },
  { icon: Cog, label: 'Поставщики оборудования' },
  { icon: RotateCcw, label: 'Переработчики вторичного сырья' },
]

const BENEFITS = [
  { icon: Handshake, title: 'Представительство', text: 'Представление интересов вашего бизнеса перед государственными органами' },
  { icon: MessageSquare, title: 'Влияние на стандарты', text: 'Участие в обсуждении и формировании отраслевых требований' },
  { icon: UserPlus, title: 'Новые партнёры', text: 'Новые партнёры и клиенты внутри профессионального сообщества' },
  { icon: BookOpen, title: 'Отраслевая информация', text: 'Доступ к отраслевой информации и практическому опыту коллег' },
  { icon: Award, title: 'Репутация и доверие', text: 'Повышение доверия к компании через членство в объединении' },
  { icon: Calendar, title: 'Совместные проекты', text: 'Участие в совместных проектах, встречах и мероприятиях объединения' },
]

const FOR_WHOM = [
  { icon: Factory, label: 'Производители упаковки', desc: 'Полимерная, ПЭТ, плёнки, гофрокартон' },
  { icon: Cog, label: 'Переработчики полимеров', desc: 'Вторичное сырьё и рециклинг' },
  { icon: Boxes, label: 'Поставщики сырья', desc: 'Полимеры, гранулы, добавки' },
  { icon: ArrowLeftRight, label: 'Поставщики оборудования', desc: 'Экструзия, печать, формовка' },
  { icon: Package, label: 'Потребители упаковки', desc: 'Пищевая, промышленная продукция' },
]

/* ==================== ХУКИ ==================== */

/* Scroll-reveal: наблюдает за элементами с классом .reveal */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    // Наблюдаем за всеми .reveal
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

/* Прогресс-бар скролла */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}

/* Активная секция навигации */
function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return active
}

/* ==================== КОМПОНЕНТЫ ==================== */

/* --- Кнопка CTA --- */
function CtaButton({ className = '', children, onClick, variant = 'accent' }) {
  const base = 'relative inline-flex items-center gap-2.5 font-semibold rounded-xl transition-all duration-300 cursor-pointer'
  const variants = {
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5',
    outline: 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50',
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5',
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} px-8 py-4 ${className}`}>
      {children}
    </button>
  )
}

/* --- Заголовок секции --- */
function SectionHeader({ tag, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-14 reveal">
      {tag && (
        <span className={`font-semibold text-sm uppercase tracking-wider ${light ? 'text-accent-400' : 'text-accent-500'}`}>
          {tag}
        </span>
      )}
      <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <div className="section-divider mt-5" />
      {subtitle && (
        <p className={`mt-2 text-lg max-w-3xl mx-auto leading-relaxed ${light ? 'text-white/70' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* --- Прогресс-бар --- */
function ScrollProgress() {
  const progress = useScrollProgress()
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

/* --- Header --- */
function Header({ onCtaClick }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Блокируем скролл при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-900/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <img src={logoSvg} alt="ЦАОПУМ" className="h-10 sm:h-14 w-auto" />
          </a>

          {/* Десктоп-навигация */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a key={link.href} href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${scrolled
                      ? `${isActive ? 'text-primary-500 bg-primary-50' : 'text-slate-600 hover:text-primary-500 hover:bg-slate-50'}`
                      : `${isActive ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`
                    }`}
                >
                  {link.label}
                </a>
              )
            })}
            <button onClick={onCtaClick}
              className={`ml-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                ${scrolled
                  ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-md shadow-accent-500/20'
                  : 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'}`}
            >
              Вступить
            </button>
          </nav>

          {/* Бургер */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg cursor-pointer transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl mobile-menu-enter">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 rounded-xl text-slate-700 hover:bg-primary-50 hover:text-primary-500 font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <button onClick={() => { setMobileOpen(false); onCtaClick() }}
              className="mt-3 px-4 py-3.5 bg-accent-500 text-white rounded-xl font-semibold cursor-pointer hover:bg-accent-600 transition-colors">
              Оставить заявку
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

/* --- Hero --- */
function Hero({ onCtaClick }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />

      {/* Анимированные блобы */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-500/8 rounded-full blur-3xl hero-blob-1" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl hero-blob-2" />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-accent-400/5 rounded-full blur-3xl hero-blob-3" />

      {/* Паттерн */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-36 text-center w-full">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm reveal">
          <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
          <span className="text-white/70 text-sm font-medium">Профессиональное отраслевое объединение</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 max-w-5xl mx-auto reveal">
          Центрально-Азиатское объединение производителей{' '}
          <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
            упаковочных материалов
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed reveal reveal-delay-1">
          Развиваем цивилизованный рынок упаковки, повышаем качество продукции и формируем единые отраслевые стандарты в Центральной Азии
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal reveal-delay-2">
          <CtaButton onClick={onCtaClick}>
            <Send size={20} />
            Оставить заявку на вступление
          </CtaButton>
          <CtaButton variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Узнать больше
            <ChevronDown size={18} />
          </CtaButton>
        </div>

        {/* Статистика */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto reveal reveal-delay-3">
          {[
            { value: '7+', label: 'типов участников' },
            { value: '6', label: 'направлений работы' },
            { value: 'ЦА', label: 'регион охвата' },
            { value: '∞', label: 'возможностей роста' },
          ].map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent mb-1">
                {s.value}
              </div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Скролл-подсказка */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 scroll-hint-anim">
        <span className="text-xs font-medium tracking-wider uppercase">Вниз</span>
        <ChevronDown size={20} />
      </div>
    </section>
  )
}

/* --- О нас + Цели (табы) --- */
function About() {
  const [tab, setTab] = useState('about')

  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader tag="О нас" title="Профессиональная площадка для отрасли" />

        {/* Табы */}
        <div className="flex justify-center mb-12 reveal">
          <div className="inline-flex bg-slate-100 rounded-2xl p-1.5">
            {[
              { key: 'about', label: 'Об объединении' },
              { key: 'goals', label: 'Наши цели' },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-6 sm:px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                  ${tab === t.key
                    ? 'bg-white text-primary-500 shadow-md'
                    : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Контент табов */}
        <div className="tab-content" key={tab}>
          {tab === 'about' ? (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-5 gap-10 items-start">
                <div className="md:col-span-3 space-y-5 reveal">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">ТОО «Центрально-Азиатское объединение производителей упаковочных материалов»</strong> —
                    это отраслевое объединение производителей упаковки, переработчиков полимеров, поставщиков сырья и оборудования.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Объединение формирует профессиональную площадку для взаимодействия бизнеса, государства и потребителей упаковочной продукции.
                    Мы работаем над развитием отрасли, защитой интересов добросовестных производителей и внедрением
                    современных технологических и экологических решений.
                  </p>
                </div>
                <div className="md:col-span-2 space-y-4 reveal reveal-delay-1">
                  {[
                    { icon: Users, label: 'Участников', sub: 'производителей и поставщиков' },
                    { icon: Target, label: 'Центральная Азия', sub: 'география деятельности' },
                    { icon: CheckCircle2, label: 'Единые стандарты', sub: 'требования качества' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-primary-200 transition-colors duration-300">
                      <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <s.icon size={22} className="text-primary-500" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{s.label}</div>
                        <div className="text-slate-500 text-xs">{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GOALS.map((item, i) => (
                <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100
                  hover:shadow-xl hover:border-accent-200 hover:-translate-y-1 transition-all duration-300 group reveal reveal-delay-${Math.min(i, 5)}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500/10 to-accent-500/5 rounded-xl
                    flex items-center justify-center mb-4 group-hover:bg-accent-500 group-hover:shadow-lg group-hover:shadow-accent-500/25 transition-all duration-300">
                    <item.icon size={24} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* --- Направления деятельности --- */
function Activities() {
  return (
    <section id="activities" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Деятельность"
          title="Направления деятельности"
          subtitle="Ключевые области работы объединения"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((item, i) => (
            <div key={i} className={`bg-white rounded-2xl p-7 border border-slate-100
              hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 group reveal reveal-delay-${Math.min(i, 5)}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500/10 to-primary-500/5 rounded-2xl
                flex items-center justify-center mb-5 group-hover:bg-primary-500 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <item.icon size={26} className="text-primary-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Преимущества --- */
function Benefits({ onCtaClick }) {
  return (
    <section id="benefits" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-400/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Преимущества"
          title="Зачем вступать в объединение"
          light
        />

        <div className="max-w-3xl mx-auto text-center mb-14 reveal">
          <p className="text-white/60 text-lg leading-relaxed">
            Рынок упаковки быстро меняется: усиливаются требования к безопасности, растёт конкуренция,
            появляются новые стандарты. <strong className="text-white/90">Работать поодиночке становится сложнее.</strong>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {BENEFITS.map((b, i) => (
            <div key={i} className={`glass-card rounded-2xl p-6 transition-all duration-300 group reveal reveal-delay-${Math.min(i, 5)}`}>
              <div className="w-12 h-12 bg-accent-500/15 rounded-xl flex items-center justify-center mb-4
                group-hover:bg-accent-500 group-hover:shadow-lg group-hover:shadow-accent-500/30 transition-all duration-300">
                <b.icon size={24} className="text-accent-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-white mb-2">{b.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>

        {/* CTA блок */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 max-w-2xl mx-auto text-center reveal">
          <p className="text-white/70 mb-2 text-sm">
            Членом объединения может стать юридическое лицо или ИП в сфере упаковочных материалов
          </p>
          <p className="text-white font-semibold text-lg sm:text-xl mb-6">
            Оставьте заявку — и мы свяжемся с вами для консультации
          </p>
          <CtaButton onClick={onCtaClick}>
            <Send size={20} />
            Стать участником
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

/* --- Для кого --- */
function ForWhom({ onCtaClick }) {
  return (
    <section id="forwho" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Для кого"
          title="Объединение создано для вас"
          subtitle="Объединяясь, участники получают больше возможностей, чем работая по отдельности"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {FOR_WHOM.map((item, i) => (
            <div key={i} className={`group text-center p-6 sm:p-7 rounded-2xl border border-slate-100 bg-white
              hover:border-accent-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal reveal-delay-${Math.min(i, 4)}`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-50 to-accent-500/5 rounded-2xl
                flex items-center justify-center group-hover:from-accent-500 group-hover:to-accent-600
                group-hover:shadow-lg group-hover:shadow-accent-500/25 transition-all duration-300">
                <item.icon size={28} className="text-primary-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{item.label}</h3>
              <p className="text-slate-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <CtaButton variant="primary" onClick={onCtaClick}>
            <Send size={20} />
            Подать заявку на вступление
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

/* --- Участники --- */
function Members() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Участники"
          title="Кто входит в объединение"
          subtitle="Мы объединяем предприятия всей цепочки упаковочной индустрии"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MEMBER_TYPES.map((m, i) => (
            <div key={i} className={`flex items-center gap-4 bg-white rounded-xl p-5
              border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 reveal reveal-delay-${Math.min(i, 5)}`}>
              <div className="w-11 h-11 bg-primary-500/10 rounded-lg flex items-center justify-center shrink-0">
                <m.icon size={22} className="text-primary-500" />
              </div>
              <span className="text-slate-700 font-medium text-sm">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Новости --- */
function News() {
  const placeholders = [
    { title: 'Скоро здесь появятся новости отрасли', text: 'Следите за обновлениями — мы будем публиковать актуальные новости' },
    { title: 'Отраслевая аналитика', text: 'Аналитические обзоры рынка упаковочных материалов Центральной Азии' },
    { title: 'Мероприятия и форумы', text: 'Анонсы предстоящих встреч, конференций и круглых столов' },
  ]

  return (
    <section id="news" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Новости"
          title="Новости отрасли"
          subtitle="Следите за последними событиями упаковочной индустрии"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((n, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden border border-slate-100 bg-white
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group reveal reveal-delay-${Math.min(i, 2)}`}>
              <div className="h-48 bg-gradient-to-br from-primary-50 via-slate-50 to-accent-50 flex items-center justify-center">
                <Package size={48} className="text-slate-200 group-hover:text-primary-200 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Скоро</p>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">
                  {n.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{n.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Контакты --- */
function Contacts({ onCtaClick }) {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contacts" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900" />
      <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Контакты"
          title="Свяжитесь с нами"
          light
        />
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Контактная информация */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 reveal">
            <h3 className="text-lg font-bold text-white mb-6">
              ТОО «Центрально-Азиатское объединение производителей упаковочных материалов»
            </h3>
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Электронная почта', value: 'info@caopum.kz', href: 'mailto:info@caopum.kz' },
                { icon: Phone, label: 'Телефон', value: '+7 (___) ___-__-__', href: 'tel:+77000000000' },
                { icon: MapPin, label: 'Адрес', value: 'г. ___' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/8 rounded-xl flex items-center justify-center shrink-0">
                    <c.icon size={20} className="text-accent-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white font-medium hover:text-accent-400 transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-white font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Хотите стать участником?</p>
              <button onClick={onCtaClick}
                className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-semibold text-sm transition-colors cursor-pointer">
                Подать заявку <ExternalLink size={16} />
              </button>
            </div>
          </div>

          {/* Форма */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 reveal reveal-delay-1">
            <h3 className="text-lg font-bold text-white mb-6">Напишите нам</h3>
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-accent-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-accent-400" />
                </div>
                <p className="text-white font-semibold text-lg">Сообщение отправлено!</p>
                <p className="text-white/50 text-sm mt-2">Мы ответим в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input type="text" required placeholder="Ваше имя"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30
                      focus:border-accent-500/50 focus:bg-white/8 outline-none transition-all duration-300" />
                </div>
                <div>
                  <input type="email" required placeholder="Email"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30
                      focus:border-accent-500/50 focus:bg-white/8 outline-none transition-all duration-300" />
                </div>
                <div>
                  <textarea required placeholder="Сообщение" rows="4"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30
                      focus:border-accent-500/50 focus:bg-white/8 outline-none transition-all duration-300 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 rounded-xl
                    transition-all duration-300 shadow-lg shadow-accent-500/25 cursor-pointer flex items-center justify-center gap-2">
                  <Send size={18} />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Footer --- */
function Footer({ onCtaClick }) {
  return (
    <footer className="bg-slate-950 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-800/50">
          <img src={logoSvg} alt="ЦАОПУМ" className="h-10 w-auto brightness-0 invert opacity-60" />
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>
          <button onClick={onCtaClick}
            className="px-5 py-2.5 bg-accent-500/10 text-accent-400 border border-accent-500/20 rounded-xl text-sm font-semibold
              hover:bg-accent-500 hover:text-white transition-all duration-300 cursor-pointer">
            Вступить
          </button>
        </div>
        <p className="text-slate-600 text-sm text-center">
          &copy; {new Date().getFullYear()} ТОО «Центрально-Азиатское объединение производителей упаковочных материалов». Все права защищены.
        </p>
      </div>
    </footer>
  )
}

/* --- Модальная форма заявки --- */
function ApplicationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm overlay-enter" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto modal-scroll modal-enter"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-5 right-5 text-slate-300 hover:text-slate-600 cursor-pointer transition-colors z-10">
          <X size={24} />
        </button>

        <div className="p-7 sm:p-9">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={40} className="text-accent-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
              <p className="text-slate-500 mb-6">Мы свяжемся с вами в ближайшее время для консультации.</p>
              <button onClick={onClose}
                className="px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors cursor-pointer">
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка на вступление</h3>
                <p className="text-slate-500">Заполните форму — мы свяжемся с вами для консультации</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Компания *</label>
                    <input type="text" required placeholder="ТОО «Ваша компания»"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Тип предприятия *</label>
                    <select required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm text-slate-700">
                      <option value="" disabled selected>Выберите...</option>
                      {MEMBER_TYPES.map((m, i) => (
                        <option key={i} value={m.label}>{m.label}</option>
                      ))}
                      <option value="other">Другое</option>
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Контактное лицо *</label>
                    <input type="text" required placeholder="Имя и фамилия"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Должность</label>
                    <input type="text" placeholder="Директор"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Телефон *</label>
                    <input type="tel" required placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
                    <input type="email" required placeholder="email@company.kz"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Комментарий</label>
                  <textarea rows="3" placeholder="Дополнительная информация или вопросы"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 outline-none transition-all text-sm resize-none" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer py-1">
                  <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-accent-500 focus:ring-accent-500" />
                  <span className="text-xs text-slate-500 leading-relaxed">Даю согласие на обработку персональных данных</span>
                </label>
                <button type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 rounded-xl
                    transition-all duration-300 shadow-lg shadow-accent-500/25 cursor-pointer flex items-center justify-center gap-2 mt-2">
                  <Send size={18} />
                  Отправить заявку
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* --- Кнопка «Наверх» --- */
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary-500 text-white rounded-full shadow-xl
        flex items-center justify-center hover:bg-primary-600 hover:shadow-2xl hover:-translate-y-0.5
        transition-all duration-300 cursor-pointer
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Наверх"
    >
      <ArrowUp size={20} />
    </button>
  )
}

/* ==================== ГЛАВНЫЙ КОМПОНЕНТ ==================== */

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  // Подключаем scroll-reveal
  useScrollReveal()

  // Переподключаем observer при смене табов и прочих обновлениях DOM
  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                io.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        )
        io.observe(el)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <ScrollProgress />
      <Header onCtaClick={openModal} />
      <Hero onCtaClick={openModal} />
      <About />
      <Activities />
      <Benefits onCtaClick={openModal} />
      <ForWhom onCtaClick={openModal} />
      <Members />
      <News />
      <Contacts onCtaClick={openModal} />
      <Footer onCtaClick={openModal} />
      <ApplicationModal isOpen={modalOpen} onClose={closeModal} />
      <ScrollToTop />
    </div>
  )
}
