import { Button } from "@heroui/react";
import { FiSearch, FiArrowDown, FiTrendingUp } from 'react-icons/fi';
import Image from 'next/image';
import bannerImg from '@/assets/images/Banner.png'

const Banner = () => {
    return (
        <section className="relative w-full h-[65vh] min-h-120 max-h-162.5 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 transition-colors duration-300 pt-16">

            <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-80 dark:opacity-40">
                <Image
                    src={bannerImg}
                    alt="Abstract geometric network grid background"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-teal-500/5 blur-3xl animate-pulse pointer-events-none [animation-delay:2s]" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-between h-full py-8">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase shadow-xs animate-bounce animation-duration-[3s]">
                    <FiTrendingUp className="w-3.5 h-3.5" />
                    <span>Next-Gen Digital Marketplace</span>
                </div>

                <div className="space-y-4 max-w-3xl mt-4">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                        Discover & Deploy Elite{' '}
                        <span className="bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            Digital Assets
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-900 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Access an optimized repository of curated web boilerplates, production-ready modules, and component sub-systems tailored for accelerated development frameworks.
                    </p>
                </div>

                <form className="w-full max-w-xl mt-6 group">
                    <div className="relative flex items-center p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-950 shadow-xl shadow-slate-200/50 dark:shadow-none focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                        <div className="pl-3 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <FiSearch className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search templates, widgets, APIs..."
                            className="w-full pl-3 pr-4 py-2.5 text-sm bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden font-medium"
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            className="bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/10 hover:bg-blue-500 px-5 rounded-lg"
                        >
                            Explore
                        </Button>
                    </div>
                </form>

                <div className="mt-auto pt-6 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer group">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors">
                        Scroll to explore
                    </span>
                    <div className="animate-bounce">
                        <FiArrowDown className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;