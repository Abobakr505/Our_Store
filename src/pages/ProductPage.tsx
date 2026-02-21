import { useLanguage } from '@/i18n/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCartStore, CartItem } from '@/store/cartStore';
import { Star, Upload, Plus, Minus, Check, Share2, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const EXCHANGE_RATE_SAR_TO_EGP = 12.68; // تحديث هذا الرقم دوريًا (فبراير 2026 تقريبًا)

const ProductPage = () => {
  const { t, lang } = useLanguage();
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [embroideryName, setEmbroideryName] = useState('');
  const [embroideryColor, setEmbroideryColor] = useState('');
  const [printLocation, setPrintLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [logoFile, setLogoFile] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // ── إضافة اختيار العملة ──
  const [currency, setCurrency] = useState<'EGP' | 'SAR'>('EGP');

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl text-muted-foreground">
          {lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
        </p>
      </div>
    );
  }

  // حساب السعر المعروض حسب العملة
  const displayedPrice =
    currency === 'SAR'
      ? (product.price / EXCHANGE_RATE_SAR_TO_EGP).toFixed(2)
      : product.price.toFixed(2);

  const displayedOriginalPrice = product.originalPrice
    ? currency === 'SAR'
      ? (product.originalPrice / EXCHANGE_RATE_SAR_TO_EGP).toFixed(2)
      : product.originalPrice.toFixed(2)
    : undefined;

  const currencySymbol = currency === 'SAR' ? 'ر.س' : 'ج.م';

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price, // نحتفظ بالسعر الأصلي (EGP) للحسابات الداخلية
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
      customization: { logoFile, embroideryName, embroideryColor, printLocation, notes },
      // اختياري: يمكنك إضافة هذه الحقول لعرضها لاحقًا في السلة
      // selectedCurrency: currency,
      // displayedPriceAtAdd: displayedPrice,
    };
    addItem(item);
    toast.success(lang === 'ar' ? 'تمت الإضافة إلى السلة ✓' : 'Added to cart ✓');
  };

  const printLocations =
    lang === 'ar'
      ? ['الصدر - يمين', 'الصدر - يسار', 'الظهر', 'الكم - يمين', 'الكم - يسار']
      : ['Chest - Right', 'Chest - Left', 'Back', 'Sleeve - Right', 'Sleeve - Left'];

  const embroideryColors =
    lang === 'ar'
      ? ['ذهبي', 'فضي', 'أبيض', 'أسود', 'كحلي', 'أحمر']
      : ['Gold', 'Silver', 'White', 'Black', 'Navy', 'Red'];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            {t('home')}
          </Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-accent">
            {t('categories')}
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {lang === 'ar' ? product.name : product.nameEn}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="overflow-hidden rounded-2xl bg-secondary">
              <img
                src={product.images[selectedImageIndex]}
                alt={lang === 'ar' ? product.name : product.nameEn}
                className="h-[500px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* يمكنك إضافة thumbnails هنا لو حابب */}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="mb-3 flex items-center gap-2 flex-wrap">
                {product.isNew && (
                  <Badge className="bg-accent text-accent-foreground">
                    {t('newBadge')}
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-primary text-primary-foreground">
                    {t('bestSeller')}
                  </Badge>
                )}
                {product.inStock ? (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    <Check className="me-1 h-3 w-3" />
                    {t('inStock')}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-destructive text-destructive"
                  >
                    {t('outOfStock')}
                  </Badge>
                )}
              </div>

              <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                {lang === 'ar' ? product.name : product.nameEn}
              </h1>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} {t('reviews')})
                </span>
              </div>

              {/* اختيار العملة */}
              <div className="mb-4 flex items-center gap-3">
                <Label className="font-semibold min-w-[70px]">
                  {lang === 'ar' ? 'العملة' : 'Currency'}
                </Label>
                <Select
                  value={currency}
                  onValueChange={(val) => setCurrency(val as 'EGP' | 'SAR')}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EGP">EGP - جنيه مصري</SelectItem>
                    <SelectItem value="SAR">SAR - ريال سعودي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* السعر */}
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-black text-accent">
                  {displayedPrice} <span className="text-lg">{currencySymbol}</span>
                </p>
                {displayedOriginalPrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    {displayedOriginalPrice} {currencySymbol}
                  </p>
                )}
              </div>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              {lang === 'ar' ? product.description : product.descriptionEn}
            </p>

            {/* Size */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-foreground font-semibold text-base">
                  {t('size')}
                </Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-accent h-auto p-0">
                      {t('sizeChart')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('sizeChart')}</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">{t('size')}</th>
                            <th className="p-2">CM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizes.map((s) => (
                            <tr key={s} className="border-b">
                              <td className="p-2 font-medium">{s}</td>
                              <td className="p-2">-</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-xl border-2 px-5 py-2.5 text-sm font-semibold transition-all ${
                      selectedSize === s
                        ? 'border-accent bg-accent text-accent-foreground shadow-gold'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <Label className="text-foreground font-semibold text-base">
                {t('color')}
              </Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-foreground font-semibold text-base">
                {t('quantity')}
              </Label>
              <div className="mt-2 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-xl"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-bold">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-xl"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Customization Section */}
            <div className="rounded-2xl border-2 border-accent/20 bg-accent/5 p-6 space-y-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                {/* <Sparkles className="h-5 w-5 text-accent" /> */}
                {lang === 'ar' ? 'تخصيص المنتج' : 'Product Customization'}
              </h3>

              <div>
                <Label className="font-semibold">{t('uploadLogo')}</Label>
                <div className="mt-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-accent/30 p-4 transition-colors hover:border-accent hover:bg-accent/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Upload className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-foreground">
                        {logoFile ||
                          (lang === 'ar' ? 'اختر ملف' : 'Choose file')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, PDF
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="hidden"
                      onChange={(e) =>
                        setLogoFile(e.target.files?.[0]?.name || '')
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <Label className="font-semibold">{t('embroideryName')}</Label>
                <Input
                  className="mt-2"
                  value={embroideryName}
                  onChange={(e) => setEmbroideryName(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'اكتب الاسم المراد تطريزه'
                      : 'Enter name for embroidery'
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">{t('embroideryColor')}</Label>
                <Select
                  value={embroideryColor}
                  onValueChange={setEmbroideryColor}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {embroideryColors.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-semibold">{t('printLocation')}</Label>
                <Select value={printLocation} onValueChange={setPrintLocation}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {printLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-semibold">{t('notes')}</Label>
                <Textarea
                  className="mt-2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'أي ملاحظات أو تفاصيل إضافية...'
                      : 'Any additional notes or details...'
                  }
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-accent text-accent-foreground hover:bg-gold-dark shadow-gold text-lg py-7 rounded-xl"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {t('addToCart')}
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl py-7">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl py-7">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              {t('relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={lang === 'ar' ? p.name : p.nameEn}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-bold text-foreground line-clamp-1">
                        {lang === 'ar' ? p.name : p.nameEn}
                      </h3>
                      <span className="text-lg font-bold text-accent">
                        {p.price} {t('currency')}
                      </span>
                      {/* ملحوظة: هنا لسه بيستخدم العملة الأساسية – لو عايز تغيّرها بنفس الطريقة، طبق نفس المنطق */}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;