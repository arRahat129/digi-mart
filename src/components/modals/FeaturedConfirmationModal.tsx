interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function FeaturedConfirmationModal({ isOpen, onClose, onConfirm }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm">
                <h3 className="font-bold text-lg dark:text-white mb-2">Toggle Featured</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Confirm updating the featured status of this item?</p>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-2 rounded border dark:border-gray-600 dark:text-white">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 py-2 rounded bg-blue-600 text-white">Confirm</button>
                </div>
            </div>
        </div>
    );
}