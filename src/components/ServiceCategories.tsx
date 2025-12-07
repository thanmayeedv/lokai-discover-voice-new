import { Wrench, ShoppingBag, GraduationCap, Home, Car, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const ServiceCategories = () => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'plumber',
      nameKey: 'categories.plumber',
      icon: Wrench,
      descKey: 'categories.plumberDesc',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'kirani',
      nameKey: 'categories.kirani',
      icon: ShoppingBag,
      descKey: 'categories.kiraniDesc',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'tutor',
      nameKey: 'categories.tutor',
      icon: GraduationCap,
      descKey: 'categories.tutorDesc',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'electrician',
      nameKey: 'categories.electrician',
      icon: Home,
      descKey: 'categories.electricianDesc',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 'mechanic',
      nameKey: 'categories.mechanic',
      icon: Car,
      descKey: 'categories.mechanicDesc',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      id: 'cook',
      nameKey: 'categories.cook',
      icon: Utensils,
      descKey: 'categories.cookDesc',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t('categories.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('categories.description')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id} 
              className="service-card cursor-pointer group hover:border-accent"
            >
              <CardContent className="p-4 text-center">
                <div className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{t(category.nameKey)}</h3>
                <p className="text-xs text-muted-foreground">{t(category.descKey)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCategories;
