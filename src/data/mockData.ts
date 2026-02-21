export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'medical',
    name: 'القسم الطبي',
    nameEn: 'Medical',
    description: 'يونيفورم طبي مخصص للمستشفيات والعيادات والمختبرات',
    descriptionEn: 'Custom medical uniforms for hospitals, clinics and labs',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80',
    productCount: 24,
  },
  {
    id: 'restaurants',
    name: 'قسم المطاعم',
    nameEn: 'Restaurants',
    description: 'زي موحد مميز للمطاعم والفنادق والمقاهي',
    descriptionEn: 'Distinctive uniforms for restaurants, hotels and cafés',
    icon: 'ChefHat',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    productCount: 18,
  },
  {
    id: 'families',
    name: 'قسم العائلات',
    nameEn: 'Families',
    description: 'ملابس عائلية مخصصة بالأسماء والتصاميم المميزة',
    descriptionEn: 'Custom family clothing with names and unique designs',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    productCount: 32,
  },
  {
    id: 'events',
    name: 'قسم المناسبات',
    nameEn: 'Events',
    description: 'تجهيزات مخصصة للأعراس والمناسبات والهدايا',
    descriptionEn: 'Custom items for weddings, events and gifts',
    icon: 'PartyPopper',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    productCount: 15,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'سكراب طبي كلاسيك',
    nameEn: 'Classic Medical Scrub',
    description: 'سكراب طبي عالي الجودة مصنوع من القطن المريح، مثالي للأطباء والممرضين. يمكن إضافة الاسم والتخصص بالتطريز.',
    descriptionEn: 'High quality medical scrub made from comfortable cotton, ideal for doctors and nurses. Name and specialty embroidery available.',
    price: 450,
    images: ['https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80'],
    category: 'medical',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['أبيض', 'أزرق', 'أخضر', 'كحلي'],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    featured: true,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'زي شيف احترافي',
    nameEn: 'Professional Chef Uniform',
    description: 'زي شيف احترافي مع تطريز الاسم والشعار، مقاوم للحرارة ومريح أثناء العمل في المطبخ.',
    descriptionEn: 'Professional chef uniform with name and logo embroidery, heat resistant and comfortable for kitchen work.',
    price: 550,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'],
    category: 'restaurants',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['أبيض', 'أسود', 'رمادي'],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'تيشيرت عائلي مخصص',
    nameEn: 'Custom Family T-Shirt',
    description: 'تيشيرت قطني ناعم مع طباعة أسماء أفراد العائلة بتصميم مميز. مثالي للرحلات والمناسبات العائلية.',
    descriptionEn: 'Soft cotton t-shirt with family names printed in a unique design. Perfect for family trips and occasions.',
    price: 180,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'],
    category: 'families',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['أبيض', 'أسود', 'رمادي', 'كحلي', 'أحمر'],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    featured: true,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'روب مناسبات فاخر',
    nameEn: 'Luxury Event Robe',
    description: 'روب ساتان فاخر مع تطريز ذهبي، مثالي للعرائس وحفلات الزفاف. يمكن تخصيصه بالاسم والتاريخ.',
    descriptionEn: 'Luxury satin robe with gold embroidery, perfect for brides and weddings. Can be customized with name and date.',
    price: 750,
    originalPrice: 900,
    images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80'],
    category: 'events',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أبيض', 'وردي', 'ذهبي', 'فضي'],
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: '5',
    name: 'لاب كوت طبي',
    nameEn: 'Medical Lab Coat',
    description: 'لاب كوت أبيض احترافي مع تطريز الاسم والتخصص. خامة ممتازة مقاومة للتجعد.',
    descriptionEn: 'Professional white lab coat with name and specialty embroidery. Excellent wrinkle-resistant fabric.',
    price: 380,
    images: ['https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80'],
    category: 'medical',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['أبيض'],
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    featured: false,
  },
  {
    id: '6',
    name: 'مريلة مطعم مخصصة',
    nameEn: 'Custom Restaurant Apron',
    description: 'مريلة جلد صناعي فاخرة مع طباعة شعار المطعم. متينة وسهلة التنظيف.',
    descriptionEn: 'Premium faux leather apron with restaurant logo printing. Durable and easy to clean.',
    price: 250,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'],
    category: 'restaurants',
    sizes: ['One Size'],
    colors: ['بني', 'أسود', 'رمادي'],
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    featured: false,
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'هودي عائلي بأسماء',
    nameEn: 'Family Name Hoodie',
    description: 'هودي فليس دافئ مع طباعة أسماء العائلة على الظهر. متوفر بألوان متعددة.',
    descriptionEn: 'Warm fleece hoodie with family names printed on the back. Available in multiple colors.',
    price: 320,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'],
    category: 'families',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['أسود', 'كحلي', 'رمادي', 'بيج'],
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    featured: false,
    isNew: true,
  },
  {
    id: '8',
    name: 'طقم هدية مخصص',
    nameEn: 'Custom Gift Set',
    description: 'طقم هدية فاخر يشمل روب وشنطة مطرزة بالاسم. مثالي كهدية لجميع المناسبات.',
    descriptionEn: 'Luxury gift set includes robe and bag embroidered with name. Perfect gift for all occasions.',
    price: 980,
    originalPrice: 1200,
    images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80'],
    category: 'events',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['ذهبي', 'فضي', 'أبيض', 'وردي'],
    rating: 5.0,
    reviewCount: 45,
    inStock: true,
    featured: false,
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'د. أحمد محمد',
    nameEn: 'Dr. Ahmed Mohamed',
    role: 'مدير مستشفى',
    roleEn: 'Hospital Director',
    text: 'جودة التطريز ممتازة والخامات فاخرة. طلبنا 200 قطعة للمستشفى وكلها كانت بنفس المستوى العالي. خدمة عملاء ممتازة ومتعاونة.',
    textEn: 'Excellent embroidery quality and premium materials. We ordered 200 pieces for the hospital and they were all consistently high quality. Outstanding customer service.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80',
  },
  {
    id: '2',
    name: 'شيف عمر حسن',
    nameEn: 'Chef Omar Hassan',
    role: 'صاحب مطعم',
    roleEn: 'Restaurant Owner',
    text: 'أفضل مكان لتجهيز يونيفورم المطعم. التصميم احترافي والتسليم في الموعد دائماً. أنصح الجميع بالتعامل معهم.',
    textEn: 'Best place for restaurant uniform supply. Professional design and always on-time delivery. I recommend them to everyone.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: '3',
    name: 'سارة الأحمدي',
    nameEn: 'Sara Al-Ahmadi',
    role: 'عروس',
    roleEn: 'Bride',
    text: 'الروب المخصص لفرح ابنتي كان رائع! التطريز الذهبي بالاسم أضاف لمسة فخامة لا مثيل لها. شكراً جزيلاً لكم.',
    textEn: "The custom robe for my daughter's wedding was amazing! The gold name embroidery added an unmatched touch of luxury. Thank you so much.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: '4',
    name: 'م. خالد العتيبي',
    nameEn: 'Eng. Khalid Al-Otaibi',
    role: 'مدير شركة',
    roleEn: 'Company Manager',
    text: 'تعاملنا معهم لتجهيز يونيفورم 500 موظف. الجودة ممتازة والأسعار تنافسية. أوصي بهم لأي شركة تبحث عن التميز.',
    textEn: 'We worked with them to outfit 500 employees. Excellent quality and competitive prices. I recommend them to any company seeking excellence.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
];
