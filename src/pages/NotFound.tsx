import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="mb-2 text-8xl font-black text-accent">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-foreground">{t('pageNotFound')}</h2>
        <p className="mb-8 max-w-md text-muted-foreground">{t('pageNotFoundDesc')}</p>
        <Link to="/">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark gap-2 px-8">
            <Home className="h-5 w-5" />
            {t('backToHome')}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
