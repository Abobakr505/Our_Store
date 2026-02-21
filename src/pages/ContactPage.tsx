import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactPage = () => {
  const { t, lang } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === 'ar' ? 'تم إرسال رسالتك بنجاح! ✉️' : 'Message sent successfully! ✉️');
  };

  const contactCards = [
    { icon: Phone, label: t('phone'), value: '+20 123 456 7890', dir: 'ltr' as const },
    { icon: Mail, label: t('email'), value: 'info@ourstore.com', dir: 'ltr' as const },
    { icon: MapPin, label: t('address'), value: lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt' },
    { icon: Clock, label: t('workingHours'), value: t('workingHoursValue') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-navy py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_80%_55%/0.06),transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">{t('contactTitle')}</h1>
            <p className="mx-auto max-w-xl text-lg text-primary-foreground/60">{t('contactSubtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">{t('contactFormTitle')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div><Label>{t('name')}</Label><Input required className="mt-2" /></div>
                      <div><Label>{t('emailAddress')}</Label><Input required type="email" className="mt-2" dir="ltr" /></div>
                    </div>
                    <div><Label>{t('phoneNumber')}</Label><Input type="tel" className="mt-2" dir="ltr" /></div>
                    <div><Label>{t('subject')}</Label><Input className="mt-2" /></div>
                    <div>
                      <Label>{lang === 'ar' ? 'الرسالة' : 'Message'}</Label>
                      <Textarea required className="mt-2" placeholder={t('messagePlaceholder')} rows={5} />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-gold-dark shadow-gold gap-2">
                      <Send className="h-4 w-4" />
                      {t('sendMessage')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}
              className="space-y-4 lg:col-span-2"
            >
              {contactCards.map((item, i) => (
                <Card key={i} className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-gold">
                      <item.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground" dir={item.dir}>{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* WhatsApp CTA */}
              <Card className="border-0 bg-[#25D366]/10 shadow-md">
                <CardContent className="p-5">
                  <a
                    href="https://wa.me/201234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</p>
                      <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'رد فوري خلال دقائق' : 'Instant reply within minutes'}</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
