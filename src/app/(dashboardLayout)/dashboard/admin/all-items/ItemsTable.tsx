import Link from 'next/link';
import { Item } from '@/lib/api/admin';
import { RiEyeLine } from 'react-icons/ri';
import { BiStar } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';

interface ItemsTableProps {
    items: Item[];
    onDelete: (id: string) => void;
    onToggle: (item: Item) => void;
}

export default function ItemsTable({ items, onDelete, onToggle }: ItemsTableProps) {
    return (
        <table className="w-full text-left bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <thead className="bg-blue-50 dark:bg-gray-700">
                <tr>
                    <th className="p-4 text-gray-700 dark:text-gray-200">Image</th>
                    <th className="p-4 text-gray-700 dark:text-gray-200">Title</th>
                    <th className="p-4 text-gray-700 dark:text-gray-200">Category</th>
                    <th className="p-4 text-gray-700 dark:text-gray-200">Price</th>
                    <th className="p-4 text-center text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item: Item) => (
                    <tr key={item._id} className="border-t dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-gray-700/50">
                        <td className="p-4 align-middle">
                            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="p-4 align-middle font-medium dark:text-gray-200">{item.title}</td>
                        <td className="p-4 align-middle capitalize dark:text-gray-400">{item.category}</td>
                        <td className="p-4 align-middle text-blue-600 dark:text-blue-400 font-bold">${item.price}</td>
                        <td className="p-4 align-middle text-center">
                            <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-300">
                                <Link href={`/all-items/${item._id}`}><RiEyeLine className="w-5 h-5 hover:text-blue-500" /></Link>
                                <button onClick={() => onToggle(item)}><BiStar className={`w-5 h-5 ${item.isFeatured ? 'fill-yellow-400 text-yellow-400' : ''}`} /></button>
                                <button onClick={() => onDelete(item._id)}><BsTrash2 className="w-5 h-5 hover:text-red-500" /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}