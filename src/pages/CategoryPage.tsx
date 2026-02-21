import { useLanguage } from '@/i18n/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { categories, products } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CategoryPage = () => {
  const { t, lang } = useLanguage();
  const { id } = useParams();
  const [sortBy, setSortBy] = useState('newest');

  const category = categories.find((c) => c.id === id);
  let categoryProducts = id ? products.filter((p) => p.category === id) : products;
  
  const title = category
    ? lang === 'ar' ? category.name : category.nameEn
    : t('allProducts');

  // Sort
  if (sortBy === 'priceLow') categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price);
  if (sortBy === 'priceHigh') categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        {category && (
          <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-navy p-8 md:p-12">
            <div className="absolute inset-0">
              <img src={category.image} alt="" className="h-full w-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/60" />
            </div>
            <div className="relative">
              <nav className="mb-4 flex items-center gap-2 text-sm text-primary-foreground/50">
                <Link to="/" className="hover:text-accent">{t('home')}</Link>
                <span>/</span>
                <Link to="/categories" className="hover:text-accent">{t('categories')}</Link>
                <span>/</span>
                <span className="text-accent">{title}</span>
              </nav>
              <h1 className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl">{title}</h1>
              <p className="text-primary-foreground/60">{lang === 'ar' ? category.description : category.descriptionEn}</p>
            </div>
          </div>
        )}

        {!category && <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">{title}</h1>}

        {/* Filters Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium">{categoryProducts.length} {t('resultsCount')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{t('sortBy')}:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('newest')}</SelectItem>
                <SelectItem value="priceLow">{t('priceLowToHigh')}</SelectItem>
                <SelectItem value="priceHigh">{t('priceHighToLow')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.05 } } }}
            >
              <Link to={`/product/${product.id}`}>
                <Card className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={lang === 'ar' ? product.name : product.nameEn}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    {product.isNew && (
                      <Badge className="absolute start-3 top-3 bg-accent text-accent-foreground">{t('newBadge')}</Badge>
                    )}
                    {product.isBestSeller && (
                      <Badge className="absolute start-3 top-3 bg-primary text-primary-foreground">{t('bestSeller')}</Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute end-3 top-3 bg-destructive text-destructive-foreground">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-bold text-foreground line-clamp-1">
                      {lang === 'ar' ? product.name : product.nameEn}
                    </h3>
                    <div className="mb-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className={`h-3.5 w-3.5 ${si < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground/20'}`} />
                      ))}
                      <span className="ms-1 text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-accent">{product.price}</span>
                        {product.originalPrice && <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>}
                        <span className="text-sm text-muted-foreground">{t('currency')}</span>
                      </div>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-navy-light rounded-lg">
                        {t('viewProduct')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
