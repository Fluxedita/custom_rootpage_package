"use client"

import { useState, useRef, useEffect } from "react"
import useSWR from 'swr';
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Camera, Lock, Info, Heart } from "lucide-react"
import { UserNav } from "./auth/UserNav"
import { useMobileMenu } from "@/hooks/useMobileMenu"
import supabase from '@/lib/supabase/client';
export function Header() {
  // Hooks and state declarations
  const { isOpen, toggle } = useMobileMenu();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  // SWR fetcher for custom pages
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error: customPagesError, isLoading: customPagesLoading, mutate: refreshCustomPages } = useSWR('/api/pages/list', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 0,
  });
  const customPages = data?.pages || [];
  
  // Debug logging
  useEffect(() => {
    if (data) {
      console.log('Custom pages data:', data);
      console.log('Custom pages array:', customPages);
    }
    if (customPagesError) {
      console.error('Custom pages error:', customPagesError);
    }
  }, [data, customPagesError, customPages]);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const mobileDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const handleMobileDropdownEnter = () => {
    if (mobileDropdownTimeout.current) clearTimeout(mobileDropdownTimeout.current);
    setMobileDropdownOpen(true);
  };
  const handleMobileDropdownLeave = () => {
    mobileDropdownTimeout.current = setTimeout(() => setMobileDropdownOpen(false), 120);
  };

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    supabase.auth.getUser().then(({ data, error }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const links = [
    { href: "/", label: "Home", icon: <Heart className="h-5 w-5" /> },
    { href: "/about", label: "About", icon: <Info className="h-5 w-5" /> },
    { href: "/contact", label: "Contact", icon: <Info className="h-5 w-5" /> },
  ]

  // Get admin email from app_settings
  const settingsFetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: settingsData } = useSWR('/api/settings', settingsFetcher);
  const adminEmail = settingsData?.settings?.admin_email;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <span className="hidden font-bold sm:inline-block">
              Fluxedita&nbsp;&nbsp;&nbsp;
            </span>
          </Link>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Custom Root Page Package
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {/* Removed Products dropdown and custom pages links */}
            <Link
              href="/products"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          </nav>
        </div>
        <button
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggle}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {loading ? (
              null
            ) : user ? (
              <UserNav user={user} />
            ) : (
              <div className="flex items-center space-x-2">
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-50 bg-background shadow-lg md:hidden"
          >
            <div className="border-t border-border">
              <nav className="space-y-1 px-2 py-3">
                <Link
                  href="/"
                  className={`group flex items-center rounded-md px-3 py-2 text-base font-medium ${pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                  onClick={toggle}
                >
                  <Heart className="mr-3 h-5 w-5 flex-shrink-0" />
                  Home
                </Link>
                
                <Link
                  href="/products"
                  className={`group flex items-center rounded-md px-3 py-2 text-base font-medium ${pathname === '/products' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                  onClick={toggle}
                >
                  <Info className="mr-3 h-5 w-5 flex-shrink-0" />
                  Products
                </Link>

                <Link
                  href="/about"
                  className={`group flex items-center rounded-md px-3 py-2 text-base font-medium ${pathname === '/about' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                  onClick={toggle}
                >
                  <Info className="mr-3 h-5 w-5 flex-shrink-0" />
                  About
                </Link>

                <Link
                  href="/contact"
                  className={`group flex items-center rounded-md px-3 py-2 text-base font-medium ${pathname === '/contact' ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                  onClick={toggle}
                >
                  <Info className="mr-3 h-5 w-5 flex-shrink-0" />
                  Contact
                </Link>
              </nav>
              
              <div className="border-t border-border p-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-foreground">
                      {user.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleSignOut();
                        toggle();
                      }}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      router.push('/auth/login');
                      toggle();
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
