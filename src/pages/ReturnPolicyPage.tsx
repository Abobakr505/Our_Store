import { useLanguage } from '@/i18n/LanguageContext';
import { RotateCcw, Shirt, Clock, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ReturnPolicyPage = () => {
  const { lang } = useLanguage();

  const sections = lang === 'ar' ? [
    { icon: RotateCcw, title: 'شروط الاسترجاع', items: ['يجب أن يكون المنتج في حالته الأصلية وبدون استخدام', 'يجب تقديم طلب الاسترجاع خلال 14 يوم من تاريخ الاستلام', 'يجب إرفاق فاتورة الشراء الأصلية', 'تكاليف الشحن للإرجاع على المشتري'] },
    { icon: Shirt, title: 'سياسة المنتجات المخصصة', items: ['المنتجات المخصصة (المطرزة أو المطبوعة) غير قابلة للاسترجاع', 'في حالة وجود عيب في التخصيص (خطأ في الاسم أو اللوجو) يتم إعادة التنفيذ مجاناً', 'يتم فحص كل طلب تخصيص قبل التنفيذ لتجنب الأخطاء'] },
    { icon: Clock, title: 'مدة الاستبدال', items: ['يتم معالجة طلبات الاستبدال خلال 3-5 أيام عمل', 'يتم إرسال المنتج البديل بعد استلام المنتج المرتجع', 'في حالة عدم توفر المنتج البديل يتم رد المبلغ خلال 7 أيام عمل'] },
    { icon: ShieldCheck, title: 'ضمان الجودة', items: ['نضمن جودة التطريز والطباعة لمدة 30 يوم', 'في حالة وجود أي عيب في الصناعة نتحمل كل التكاليف', 'رضا العميل هو أولويتنا القصوى'] },
  ] : [
    { icon: RotateCcw, title: 'Return Conditions', items: ['Product must be in original condition and unused', 'Return request must be submitted within 14 days of delivery', 'Original purchase invoice must be included', 'Return shipping costs are borne by the buyer'] },
    { icon: Shirt, title: 'Custom Products Policy', items: ['Customized products (embroidered or printed) are non-returnable', 'If there is a defect in customization (name or logo error), it will be redone for free', 'Each customization order is reviewed before execution to avoid errors'] },
    { icon: Clock, title: 'Exchange Period', items: ['Exchange requests are processed within 3-5 business days', 'Replacement product is shipped after receiving the returned item', 'If replacement is unavailable, refund is issued within 7 business days'] },
    { icon: ShieldCheck, title: 'Quality Guarantee', items: ['We guarantee embroidery and printing quality for 30 days', 'In case of any manufacturing defect, we cover all costs', 'Customer satisfaction is our top priority'] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-navy py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_80%_55%/0.06),transparent_60%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
              {lang === 'ar' ? 'سياسة الاسترجاع' : 'Return Policy'}
            </h1>
            <p className="mx-auto max-w-xl text-lg text-primary-foreground/60">
              {lang === 'ar' ? 'نلتزم بتقديم أفضل تجربة تسوق ونضمن حقوقك' : 'We are committed to providing the best shopping experience and protecting your rights'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                        <section.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
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

export default ReturnPolicyPage;
