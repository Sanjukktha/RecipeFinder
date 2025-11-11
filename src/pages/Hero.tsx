import { useSession, getSession } from 'next-auth/react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Product from '../components/Hero_Sections/Product';
import Features from '../components/Hero_Sections/Features';
import Landing from '../components/Hero_Sections/Landing';
import ErrorPage from './auth/error';

// Navigation links for the header
const navigation = [
    { name: 'Product', key: 'product' },
    { name: 'Features', key: 'features' },
    { name: 'About', key: 'about' },
];

export default function Hero() {
    // State to manage the mobile menu open/close state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // State to manage the currently selected page
    const [selectedPage, setSelectedPage] = useState<string | null>(null);

    // Fetch the current session and status
    const { data: session, update } = useSession();

    // Function to render the content based on the selected page
    const renderContent = () => {
        switch (selectedPage) {
            case 'product':
                return (
                    <Product resetPage={() => setSelectedPage(null)} />
                );
            case 'features':
                return (
                    <Features resetPage={() => setSelectedPage(null)} />
                );
            case 'about':
                window.open('https://github.com/Sanjukktha', '_blank');
                setSelectedPage(null);
                return (
                    <Landing />
                );
            default:
                return (
                    <Landing />
                );
        }
    };

    // Ensures the user does not navigate to the sign-in page if a valid session exists.
    // If a session is already active, it updates the client state instead of prompting sign-in.
    // Otherwise, it initiates the sign-in process.

    const onAuthenticate = async () => {
        const sessionIsValid = await getSession()
        if (!sessionIsValid) {
            signIn('google')
            return
        }
        update()
    }

    // If the user is logged in, show the error page
    if (session) return <ErrorPage message='Inaccessible Page' />;

    return (
        <div className="bg-blue-50 min-h-screen">
            {/* Header section */}
            <header className="absolute inset-x-0 top-0 z-header bg-brand-800 shadow-md">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Recipe Finder</span>
                            <span className="text-xl font-bold text-white">Recipe Finder</span>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setSelectedPage(item.key)}
                                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white hover:bg-brand-700 rounded-md px-3 py-2 transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <button className="text-sm font-semibold leading-6 text-white hover:text-gray-200" onClick={onAuthenticate}>
                            Log in With Google <span aria-hidden="true">&rarr;</span>
                        </button>
                    </div>
                </nav>
                {/* Mobile menu dialog */}
                <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-modal bg-black bg-opacity-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-modal w-full overflow-y-auto bg-brand-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-brand-700">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Recipe Finder</span>
                                <span className="text-xl font-bold text-white">Recipe Finder</span>
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-200 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-brand-700">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                setSelectedPage(item.key);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-brand-700 hover:text-white w-full text-left transition-colors"
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <button
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-brand-700 hover:text-white w-full text-left transition-colors"
                                        onClick={onAuthenticate}
                                    >
                                        Log in With Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            {/* Main content section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Discover our new AI-powered recipe generator.{' '}
                            <a href="https://github.com/Sanjukktha" className="font-semibold text-brand-600">
                                <span className="absolute inset-0" aria-hidden="true" />
                                Learn more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
