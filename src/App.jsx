import { useState, useEffect } from 'react'
import {
  Menu, X, ChevronDown, ChevronUp,
  Target, ShieldCheck, Leaf, PackageCheck, Scale, Recycle,
  Landmark, FileText, Users, CalendarDays, ArrowLeftRight, Megaphone,
  Factory, Container, Film, Package, Boxes, Cog, RotateCcw,
  Handshake, MessageSquare, UserPlus, BookOpen, Award, Calendar,
  Mail, Phone, MapPin, Send, ArrowUp
} from 'lucide-react'

/* ==================== ДАННЫЕ ==================== */

const NAV_LINKS = [
  { href: '#about', label: 'О нас' },
  { href: '#goals', label: 'Цели' },
  { href: '#members', label: 'Участники' },
  { href: '#benefits', label: 'Преимущества' },
  { href: '#news', label: 'Новости' },
  { href: '#contacts', label: 'Контакты' },
]

const GOALS = [
  { icon: Target, title: 'Развитие отрасли', text: 'Развитие упаковочной отрасли Центральной Азии' },
  { icon: Scale, title: 'Стандарты и регламенты', text: 'Участие в разработке технических регламентов и стандартов' },
  { icon: ShieldCheck, title: 'Защита производителей', text: 'Защита отечественных производителей' },
  { icon: PackageCheck, title: 'Безопасность упаковки', text: 'Повышение безопасности пищевой упаковки' },
  { icon: Recycle, title: 'Борьба с контрафактом', text: 'Борьба с некачественной и контрафактной продукцией' },
  { icon: Leaf, title: 'Экология и переработка', text: 'Развитие переработки и экологических инициатив' },
]

const ACTIVITIES = [
  { icon: Landmark, title: 'Работа с государством', text: 'Взаимодействие с государственными органами' },
  { icon: FileText, title: 'Отраслевые инициативы', text: 'Подготовка отраслевых предложений и инициатив' },
  { icon: Users, title: 'Экспертная поддержка', text: 'Консультации и экспертная поддержка участников' },
  { icon: CalendarDays, title: 'Форумы и встречи', text: 'Организация встреч, форумов и круглых столов' },
  { icon: ArrowLeftRight, title: 'Обмен опытом', text: 'Обмен опытом и технологиями' },
  { icon: Megaphone, title: 'Информационная поддержка', text: 'Информационная поддержка рынка' },
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
  { icon: Handshake, title: 'Представительство', text: 'Представление интересов бизнеса перед государственными органами' },
  { icon: MessageSquare, title: 'Участие в формировании стандартов', text: 'Участие в обсуждении и формировании отраслевых требований' },
  { icon: UserPlus, title: 'Партнёры и клиенты', text: 'Новые партнёры и клиенты внутри профессионального сообщества' },
  { icon: BookOpen, title: 'Доступ к информации', text: 'Доступ к отраслевой информации и практическому опыту коллег' },
  { icon: Award, title: 'Доверие к компании', text: 'Повышение доверия к компании через членство в объединении' },
  { icon: Calendar, title: 'Проекты и мероприятия', text: 'Участие в совместных проектах, встречах и мероприятиях' },
]

const FOR_WHOM = [
  'Производители упаковки',
  'Переработчики полимеров',
  'Поставщики сырья',
  'Поставщики оборудования',
  'Компании-потребители упаковки',
]

/* ==================== КОМПОНЕНТЫ ==================== */

/* --- Кнопка CTA --- */
function CtaButton({ className = '', children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold
        px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer
        shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  )
}

/* --- Header --- */
function Header({ onCtaClick }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <img src="/logo.svg" alt="ЦАОПУМ" className="h-10 sm:h-14 w-auto" />
          </a>

          {/* Десктоп-навигация */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${scrolled ? 'text-slate-700 hover:text-primary-500 hover:bg-primary-50' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onCtaClick}
              className={`ml-4 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
                ${scrolled
                  ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-md'
                  : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'}`}
            >
              Вступить
            </button>
          </nav>

          {/* Мобильное меню — кнопка */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg cursor-pointer ${scrolled ? 'text-slate-700' : 'text-white'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-slate-700 hover:bg-primary-50 hover:text-primary-500 font-medium"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onCtaClick() }}
              className="mt-2 px-4 py-3 bg-accent-500 text-white rounded-lg font-semibold cursor-pointer"
            >
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
      {/* Фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      {/* Декоративные круги */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">Профессиональное отраслевое объединение</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-5xl mx-auto">
          Центрально-Азиатское объединение производителей{' '}
          <span className="text-accent-400">упаковочных материалов</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          Объединение предприятий упаковочной индустрии Центральной Азии для развития цивилизованного рынка,
          повышения качества продукции и формирования единых отраслевых стандартов
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton onClick={onCtaClick}>
            <Send size={20} />
            Оставить заявку на вступление
          </CtaButton>
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium px-6 py-4 rounded-xl
              border border-white/20 hover:border-white/40 transition-all"
          >
            Узнать больше
            <ChevronDown size={18} />
          </a>
        </div>

        {/* Статистика */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '7+', label: 'типов участников' },
            { value: '6', label: 'направлений работы' },
            { value: 'ЦА', label: 'регион охвата' },
            { value: '∞', label: 'возможностей роста' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-2xl sm:text-3xl font-bold text-accent-400 mb-1">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- О нас --- */
function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">О нас</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Профессиональная площадка для отрасли
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            <strong>ТОО «Центрально-Азиатское объединение производителей упаковочных материалов»</strong> —
            это отраслевое объединение производителей упаковки, переработчиков полимеров, поставщиков сырья и оборудования.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Мы формируем площадку для взаимодействия <strong>бизнеса, государства и потребителей</strong> упаковочной продукции.
            Работаем над развитием отрасли, защитой интересов добросовестных производителей и внедрением
            современных технологических и экологических решений.
          </p>
        </div>
      </div>
    </section>
  )
}

/* --- Цели и Деятельность (табы) --- */
function GoalsAndActivities() {
  const [tab, setTab] = useState('goals')

  const items = tab === 'goals' ? GOALS : ACTIVITIES

  return (
    <section id="goals" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">Наша миссия</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">Цели и направления</h2>
        </div>

        {/* Табы */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-sm border border-slate-200">
            <button
              onClick={() => setTab('goals')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer
                ${tab === 'goals' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Наши цели
            </button>
            <button
              onClick={() => setTab('activities')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer
                ${tab === 'activities' ? 'bg-primary-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Направления деятельности
            </button>
          </div>
        </div>

        {/* Карточки */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={`${tab}-${i}`} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100
              hover:shadow-lg hover:border-accent-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4
                group-hover:bg-accent-500 transition-colors duration-300">
                <item.icon size={24} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Участники --- */
function Members() {
  return (
    <section id="members" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">Участники</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">Кто входит в объединение</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Мы объединяем предприятия всей цепочки упаковочной индустрии
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MEMBER_TYPES.map((m, i) => (
            <div key={i} className="flex items-center gap-4 bg-slate-50 rounded-xl p-5
              border border-slate-100 hover:bg-primary-50 hover:border-primary-200 transition-all duration-300">
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

/* --- Преимущества --- */
function Benefits({ onCtaClick }) {
  return (
    <section id="benefits" className="py-20 sm:py-28 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">Преимущества</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Зачем вступать в объединение</h2>
        </div>

        <p className="text-center text-white/70 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
          Рынок упаковки быстро меняется: усиливаются требования к безопасности, растёт конкуренция,
          появляются новые стандарты. <strong className="text-white">Работать поодиночке становится сложнее.</strong> Мы
          создаём профессиональную среду, где производители развиваются совместно.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {BENEFITS.map((b, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6
              hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4
                group-hover:bg-accent-500 transition-colors duration-300">
                <b.icon size={24} className="text-accent-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-white mb-2">{b.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto">
          <p className="text-white/80 mb-2 text-sm">
            Членом объединения может стать юридическое лицо или ИП в сфере упаковочных материалов.
          </p>
          <p className="text-white font-semibold text-lg mb-6">
            Оставьте заявку — и мы свяжемся с вами для консультации
          </p>
          <CtaButton onClick={onCtaClick}>
            <Send size={20} />
            Оставить заявку на вступление
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

/* --- Для кого --- */
function ForWhom({ onCtaClick }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">Для кого</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Объединение создано для вас
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                <strong>Объединяясь, участники получают больше возможностей</strong>, чем работая по отдельности.
              </p>
              <CtaButton onClick={onCtaClick} className="text-sm px-6 py-3">
                <Send size={18} />
                Подать заявку на вступление
              </CtaButton>
            </div>
            <div className="space-y-3">
              {FOR_WHOM.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Новости --- */
function News() {
  const placeholders = [
    { title: 'Скоро здесь появятся новости отрасли', date: '' },
    { title: 'Следите за обновлениями', date: '' },
    { title: 'Мы работаем над контентом', date: '' },
  ]

  return (
    <section id="news" className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">Новости</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">Новости отрасли</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((n, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Package size={48} className="text-slate-300" />
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-sm mb-2">{n.date || 'Дата публикации'}</p>
                <h3 className="font-semibold text-slate-700">{n.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Контакты --- */
function Contacts() {
  return (
    <section id="contacts" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">Контакты</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">Свяжитесь с нами</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              ТОО «Центрально-Азиатское объединение производителей упаковочных материалов»
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-primary-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Электронная почта</p>
                  <p className="text-slate-900 font-medium">info@caopum.kz</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-primary-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Телефон</p>
                  <p className="text-slate-900 font-medium">+7 (___) ___-__-__</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-primary-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Адрес</p>
                  <p className="text-slate-900 font-medium">г. ________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Footer --- */
function Footer({ onCtaClick }) {
  return (
    <footer className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="ЦАОПУМ" className="h-10 w-auto brightness-0 invert opacity-70" />
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <button
            onClick={onCtaClick}
            className="px-5 py-2.5 bg-accent-500 text-white rounded-lg text-sm font-semibold
              hover:bg-accent-600 transition-colors cursor-pointer"
          >
            Вступить
          </button>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ТОО «Центрально-Азиатское объединение производителей упаковочных материалов». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* --- Модальная форма заявки --- */
function ApplicationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
          <X size={24} />
        </button>

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <PackageCheck size={32} className="text-accent-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
              <p className="text-slate-600">Мы свяжемся с вами в ближайшее время для консультации.</p>
              <button onClick={onClose}
                className="mt-6 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors cursor-pointer">
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка на вступление</h3>
              <p className="text-slate-600 mb-6">Заполните форму — мы свяжемся с вами для консультации</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Название компании *</label>
                  <input type="text" required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
                    placeholder="ТОО «Ваша компания»" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Контактное лицо *</label>
                  <input type="text" required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
                    placeholder="Имя и фамилия" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Телефон *</label>
                  <input type="tel" required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
                    placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input type="email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
                    placeholder="email@company.kz" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Направление деятельности</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-slate-700">
                    <option value="">Выберите...</option>
                    {MEMBER_TYPES.map((m, i) => (
                      <option key={i} value={m.label}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <button type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 rounded-xl
                    transition-all shadow-lg shadow-accent-500/25 cursor-pointer mt-2">
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
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg
        flex items-center justify-center hover:bg-primary-600 transition-all cursor-pointer"
    >
      <ArrowUp size={20} />
    </button>
  )
}

/* ==================== ГЛАВНЫЙ КОМПОНЕНТ ==================== */

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Header onCtaClick={openModal} />
      <Hero onCtaClick={openModal} />
      <About />
      <GoalsAndActivities />
      <Members />
      <Benefits onCtaClick={openModal} />
      <ForWhom onCtaClick={openModal} />
      <News />
      <Contacts />
      <Footer onCtaClick={openModal} />
      <ApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ScrollToTop />
    </div>
  )
}
