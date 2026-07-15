interface AlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteAlertDialog({ isOpen, onClose, onConfirm }: AlertProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm">
                <h3 className="font-bold text-lg dark:text-white mb-2">Delete Item</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this? This action cannot be undone.</p>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-2 rounded border dark:border-gray-600 dark:text-white">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2 rounded bg-red-600 text-white">Delete</button>
                </div>
            </div>
        </div>
    );
}