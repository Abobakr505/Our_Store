import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { categories, products, testimonials } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Shield, Palette, Truck, Headphones, ArrowLeft, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const { t, lang } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const featuredProducts = products.filter((p) => p.featured);

  const stats = [
    { value: '5,000+', label: t('happyClients') },
    { value: '50,000+', label: t('productsDelivered') },
    { value: '10+', label: t('yearsExperience') },
    { value: '99%', label: t('satisfactionRate') },
  ];

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-navy py-24 md:py-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45_80%_55%/0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(45_80%_55%/0.05),transparent_50%)]" />
          <div className="absolute top-20 end-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-10 start-10 h-48 w-48 rounded-full bg-accent/3 blur-2xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent"
            >
              <Sparkles className="h-4 w-4" />
              {lang === 'ar' ? 'تطريز · طباعة · تخصيص' : 'Embroidery · Printing · Customization'}
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6 text-4xl font-black leading-tight text-primary-foreground md:text-6xl lg:text-7xl"
            >
              {t('heroTitle')}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}
              className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/60 md:text-xl"
            >
              {t('heroSubtitle')}
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.4 } } }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/categories">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark shadow-gold gap-2 text-lg px-8 py-6 min-w-[200px]">
                  {t('heroBtn')}
                  <ArrowIcon className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-slate-100 border-primary-foreground text-accent hover:bg-primary-foreground gap-2 text-lg px-8 py-6 min-w-[200px]">
                  {t('heroBtnSecondary')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.6 } } }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-accent md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">{t('categoriesTitle')}</span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">{t('categoriesTitle')}</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">{t('categoriesSubtitle')}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link to={`/category/${cat.id}`}>
                  <Card className="group relative overflow-hidden border-0 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-gold">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={lang === 'ar' ? cat.name : cat.nameEn}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                      <div className="absolute bottom-0 start-0 p-5">
                        <h3 className="mb-1 text-xl font-bold text-primary-foreground">
                          {lang === 'ar' ? cat.name : cat.nameEn}
                        </h3>
                        <p className="mb-3 text-sm text-primary-foreground/70">
                          {lang === 'ar' ? cat.description : cat.descriptionEn}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                          {t('exploreCategory')}
                          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        </span>
                      </div>
                      <div className="absolute end-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-accent-foreground">
                        {cat.productCount} {lang === 'ar' ? 'منتج' : 'items'}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">{t('featuredTitle')}</span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">{t('featuredTitle')}</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">{t('featuredSubtitle')}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <Link to={`/product/${product.id}`}>
                  <Card className="group overflow-hidden border-0 bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={lang === 'ar' ? product.name : product.nameEn}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      {product.isNew && (
                        <span className="absolute start-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{t('newBadge')}</span>
                      )}
                      {product.isBestSeller && (
                        <span className="absolute start-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{t('bestSeller')}</span>
                      )}
                      {product.originalPrice && (
                        <span className="absolute end-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-2 text-base font-bold text-foreground line-clamp-1">
                        {lang === 'ar' ? product.name : product.nameEn}
                      </h3>
                      <div className="mb-3 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star
                            key={si}
                            className={`h-3.5 w-3.5 ${si < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground/20'}`}
                          />
                        ))}
                        <span className="ms-1 text-xs text-muted-foreground">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-accent">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                          )}
                          <span className="text-sm text-muted-foreground">{t('currency')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12 text-center">
            <Link to="/categories">
              <Button size="lg" variant="outline" className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8">
                {t('viewAllProducts')}
                <ArrowIcon className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">{t('whyUsTitle')}</span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">{t('whyUsTitle')}</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">{t('whyUsSubtitle')}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Shield, title: t('quality'), desc: t('qualityDesc') },
              { icon: Palette, title: t('customization'), desc: t('customizationDesc') },
              { icon: Truck, title: t('fastDelivery'), desc: t('fastDeliveryDesc') },
              { icon: Headphones, title: t('support'), desc: t('supportDesc') },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="group border-0 bg-card p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-gold py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(222_47%_14%/0.3),transparent_60%)]" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="mb-4 text-3xl font-bold text-accent-foreground md:text-5xl">{t('ctaTitle')}</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-accent-foreground/70">{t('ctaSubtitle')}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/categories">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-navy-light gap-2 text-lg px-8 py-6 min-w-[200px]">
                  {t('ctaBtn')}
                  <ArrowIcon className="h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 gap-2 text-lg px-8 py-6 min-w-[200px]">
                  {t('ctaWhatsApp')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-navy py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">{t('testimonialsTitle')}</span>
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-5xl">{t('testimonialsTitle')}</h2>
            <p className="text-primary-foreground/50">{t('testimonialsSubtitle')}</p>
          </motion.div>
          <div className="mx-auto max-w-3xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="relative border-0 bg-navy-light/80 shadow-2xl backdrop-blur">
                <CardContent className="p-8 md:p-12">
                  <Quote className="mb-6 h-10 w-10 text-accent/30" />
                  <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                    {lang === 'ar' ? testimonials[testimonialIndex].text : testimonials[testimonialIndex].textEn}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[testimonialIndex].avatar}
                      alt=""
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/30"
                    />
                    <div>
                      <p className="font-bold text-accent">
                        {lang === 'ar' ? testimonials[testimonialIndex].name : testimonials[testimonialIndex].nameEn}
                      </p>
                      <p className="text-sm text-primary-foreground/50">
                        {lang === 'ar' ? testimonials[testimonialIndex].role : testimonials[testimonialIndex].roleEn}
                      </p>
                    </div>
                    <div className="ms-auto flex gap-1">
                      {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="text-primary-foreground/50 hover:bg-navy-light hover:text-accent"
              >
                {lang === 'ar' ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'w-8 bg-accent' : 'w-2.5 bg-primary-foreground/20 hover:bg-primary-foreground/40'}`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="text-primary-foreground/50 hover:bg-navy-light hover:text-accent"
              >
                {lang === 'ar' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
