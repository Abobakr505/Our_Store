import { useLanguage } from '@/i18n/LanguageContext';
import { Shield, Eye, Target, Award, Lightbulb, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  const { t, lang } = useLanguage();

  const values = [
    { icon: Award, title: t('valueQuality'), desc: t('valueQualityDesc') },
    { icon: Lightbulb, title: t('valueInnovation'), desc: t('valueInnovationDesc') },
    { icon: Shield, title: t('valueIntegrity'), desc: t('valueIntegrityDesc') },
    { icon: Heart, title: t('valueService'), desc: t('valueServiceDesc') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-navy py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_80%_55%/0.06),transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-6xl">{t('aboutTitle')}</h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/60">{t('aboutHeroSubtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-accent">{t('aboutStory')}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {lang === 'ar'
                ? 'بدأت رحلتنا من شغف حقيقي بتقديم منتجات مخصصة عالية الجودة. نؤمن بأن كل علامة تجارية، كل مناسبة، وكل شخص يستحق منتجات تعكس هويته الفريدة. من التطريز الدقيق إلى الطباعة الاحترافية، نحرص على تقديم أفضل النتائج التي تفوق التوقعات. خلال أكثر من 10 سنوات، خدمنا آلاف العملاء من شركات ومستشفيات ومطاعم وأفراد، وكل طلب بالنسبة لنا هو فرصة لنثبت التزامنا بالتميز.'
                : 'Our journey began from a genuine passion for delivering high-quality customized products. We believe that every brand, every occasion, and every person deserves products that reflect their unique identity. From precise embroidery to professional printing, we ensure the best results that exceed expectations. Over 10+ years, we have served thousands of clients from companies, hospitals, restaurants, and individuals, and every order is an opportunity to prove our commitment to excellence.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold">
                    <Eye className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{t('vision')}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {lang === 'ar'
                      ? 'أن نكون الخيار الأول في المنطقة لتخصيص المنتجات بأعلى معايير الجودة والاحترافية، ونساهم في تعزيز هوية كل علامة تجارية وكل مناسبة.'
                      : 'To be the first choice in the region for product customization with the highest standards of quality and professionalism, contributing to enhancing every brand identity and occasion.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold">
                    <Target className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{t('mission')}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {lang === 'ar'
                      ? 'تمكين الأفراد والشركات من التعبير عن هويتهم من خلال منتجات مخصصة بجودة استثنائية وتجربة شراء سلسة، مع الالتزام بالمواعيد والأسعار العادلة.'
                      : 'Empowering individuals and businesses to express their identity through custom products with exceptional quality and a seamless shopping experience, with commitment to deadlines and fair pricing.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t('ourValues')}</h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <Card className="group h-full border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-gradient-gold">
                      <val.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-foreground">{val.title}</h3>
                      <p className="text-sm text-muted-foreground">{val.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
