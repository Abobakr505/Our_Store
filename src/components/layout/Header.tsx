import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import {
  ShoppingCart,
  Menu,
  X,
  Globe,
  User,
  Home,
  List,
  PackageSearch,
  Info,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: t('home'), icon: <Home size={20} /> },
    { to: '/categories', label: t('categories'), icon: <List size={20} /> },
    { to: '/about', label: t('about'), icon: <Info size={20} /> },
    { to: '/contact', label: t('contact'), icon: <Mail size={20} /> },
  ];

  // Animation Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 18,
        duration: 0.45,
        when: 'beforeChildren',
        staggerChildren: 0.09,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.32, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { x: 40, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`
        sticky top-0 z-50 w-full
        bg-primary shadow-navy backdrop-blur-lg
      `}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* ─── Main Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3.5 md:container md:mx-auto md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-gold shadow-sm">
            <span className="text-lg font-bold text-accent-foreground">M</span>
          </div>
          <span className="text-xl font-bold text-primary-foreground tracking-tight">
            {lang === 'ar' ? 'متجرنا' : 'Our Store'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3 py-2 font-bold text-sm transition-all duration-200 ${
                isActive(link.to)
                  ? 'bg-navy-light text-accent shadow-sm'
                  : 'text-primary-foreground/75 hover:bg-navy-light/80 hover:text-accent hover:shadow-sm'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="text-primary-foreground/75 hover:bg-navy-light hover:text-accent"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground/75 transition-all hover:bg-navy-light hover:text-accent"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-1 ring-accent/40">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/login">
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-gold-dark gap-1.5 rounded-lg shadow-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('login')}</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* ─── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                fixed  top-0 bottom-0 right-0 
                w-80 max-w-[85vw] 
                bg-gradient-to-b from-primary via-primary to-primary/95 
                shadow-2xl z-50 md:hidden 
                overflow-y-auto rounded-l-2xl 
                border-l border-navy-light/30 h-screen
              `}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className=" h-screen p-6 pt-7 z-50">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-gold shadow-md">
                      <span className="text-xl font-bold text-accent-foreground">M</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-foreground">
                      {lang === 'ar' ? 'متجرنا' : 'Our Store'}
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-2.5">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.to} variants={itemVariants}>
                      <Link
                        to={link.to}
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive(link.to)
                            ? 'bg-navy-light text-accent shadow-sm'
                            : 'text-primary-foreground/85 hover:bg-navy-light/60 hover:text-accent'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;