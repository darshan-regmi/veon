import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/lib/cart';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  downloadUrl?: string;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  createdAt?: Date;
}

interface BookCardProps {
  book: Book;
  showAddToCart?: boolean;
}

export default function BookCard({ book, showAddToCart = true }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Link href={`/books/${book.id}`}>
          <div className="aspect-[3/4] relative">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        {book.featured && (
          <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <CardContent className="p-4">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        {book.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(book.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({book.reviews || 0})
            </span>
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {book.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          ${book.price.toFixed(2)}
        </div>
        
        {showAddToCart && (
          <Button onClick={handleAddToCart} className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}