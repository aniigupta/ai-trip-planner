"use client"
import { Button } from '@/components/ui/button';
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { ArrowDown, Globe2, Heart, Landmark, Mountain, Send, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const suggestions = [
    {
        title: 'Plan a relaxing beach vacation',
        icon: <Sparkles className='text-blue-400 h-5 w-5' />,
    },
    {
        title: 'Find a romantic getaway for two',
        icon: <Heart className='text-red-400 h-5 w-5' />,
    },
    {
        title: 'Explore cities with rich history',
        icon: <Landmark className='text-yellow-400 h-5 w-5' />,
    },
    {
        title: 'Plan a trip for outdoor activities',
        icon: <Mountain className='text-green-400 h-5 w-5' />,
    },
    {
        title: 'Discover hidden gems off the beaten path',
        icon: <Globe2 className='text-purple-400 h-5 w-5' />,
    },
];

function Hero() {
    const { user } = useUser();
    const router = useRouter();

    const onSend = () => {
        if (!user) {
            router.push('/sign-in')
            return;
        }
        router.push('/creta-new-trip');
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
            {/* Title + Description */}
            <div className='max-w-3xl w-full space-y-6'>
                <h1 className='text-2xl md:text-5xl font-bold'>
                    Hey, I'm your personal <span className='text-blue-500'>Trip planner</span>
                </h1>
                <p className='text-lg text-gray-600'>
                    Tell me what you want, and I'll handle the rest: Flights, Hotels, trip planning – all in seconds
                </p>
            </div>

            {/* Input Box */}
            <div className='border rounded-2xl p-4 mt-10 flex w-full max-w-2xl shadow-lg bg-white'>
                <Textarea
                    placeholder='Create a trip for Paris from New Delhi'
                    className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                />
                <Button size={'icon'} className='self-end ml-2' onClick={() => onSend()}>
                    <Send />
                </Button>
            </div>

            {/* Suggestions */}
            <div className='flex gap-4 mt-8 flex-wrap justify-center'>
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        className='flex items-center gap-2 p-3 border rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-sm'
                    >
                        {suggestion.icon}
                        <h2 className='text-sm whitespace-nowrap'>{suggestion.title}</h2>
                    </div>
                ))}
            </div>

            {/* Video Section */}
            <div className='flex flex-col items-center justify-center mt-16'>
                <h2 className='flex gap-2 text-2xl items-center'>
                    Not sure where to start? <strong>See how it works</strong>
                    <ArrowDown />
                </h2>
                <div className="mt-6">
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook.png"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
