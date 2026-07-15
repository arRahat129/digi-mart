import Link from 'next/link';
import { Item } from '@/lib/api/admin';
import { RiEyeLine } from 'react-icons/ri';
import { BiStar } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';

interface ItemsGridProps {
    items: Item[];
    onDelete: (id: string) => void;
    onToggle: (item: Item) => void;
}

export default function ItemsGrid({ items, onDelete, onToggle }: ItemsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item: Item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 shadow-sm">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="font-bold dark:text-white">{item.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">${item.price}</p>
                    <div className="flex gap-4 pt-4 border-t dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        <Link href={`/all-items/${item._id}`} className="flex-1 flex justify-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><RiEyeLine className="w-6 h-6" /></Link>
                        <button onClick={() => onToggle(item)} className="flex-1 flex justify-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><BiStar className={`w-6 h-6 ${item.isFeatured ? 'fill-yellow-400 text-yellow-400' : ''}`} /></button>
                        <button onClick={() => onDelete(item._id)} className="flex-1 flex justify-center py-2 hover:bg-red-50 dark:hover:bg-gray-700 rounded text-red-500"><BsTrash2 className="w-6 h-6" /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}