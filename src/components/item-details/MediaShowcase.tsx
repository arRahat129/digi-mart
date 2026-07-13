import Image from 'next/image';
import React from 'react';

interface MediaShowcaseProps {
    imageUrl: string;
    title: string;
}

export const MediaShowcase = ({ imageUrl, title }: MediaShowcaseProps) => {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden p-4">
            <div className="relative w-full h-[450px] bg-zinc-100 dark:bg-zinc-950 rounded-xl overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                />
            </div>
        </div>
    );
};