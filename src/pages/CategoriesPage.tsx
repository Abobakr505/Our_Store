import { useLanguage } from '@/i18n/LanguageContext';
import { categories } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CategoriesPage = () => {
  const { t, lang } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t('categoriesTitle')}</h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">{t('categoriesSubtitle')}</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
            >
              <Link to={`/category/${cat.id}`}>
                <Card className="group relative overflow-hidden border-0 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-gold">
                  <div className="relative h-72 overflow-hidden md:h-80">
                    <img
                      src={cat.image}
                      alt={lang === 'ar' ? cat.name : cat.nameEn}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                    <div className="absolute bottom-0 start-0 p-6 md:p-8">
                      <div className="mb-2 inline-block rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-accent-foreground">
                        {cat.productCount} {lang === 'ar' ? 'منتج' : 'products'}
                      </div>
                      <h2 className="mb-2 text-2xl font-bold text-primary-foreground md:text-3xl">
                        {lang === 'ar' ? cat.name : cat.nameEn}
                      </h2>
                      <p className="mb-4 max-w-sm text-sm text-primary-foreground/70">
                        {lang === 'ar' ? cat.description : cat.descriptionEn}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                        {t('exploreCategory')}
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
