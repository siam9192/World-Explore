"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navRoutes } from "@/constants/navRoutes.constant";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      
      {/* Menu Button */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        className="flex size-10 items-center justify-center rounded-medium border border-border text-foreground transition-colors hover:bg-muted lg:hidden"
      >
        
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[280px] flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          
          <Link
            href="/"
            onClick={closeSidebar}
            className="font-heading text-xl font-bold"
          >
            
            WorldExplore
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation"
            className="flex size-9 items-center justify-center rounded-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            
            <X size={20} />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-5">
          
          <div className="flex flex-col gap-1">
            
            {navRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 rounded-medium px-4 py-3 text-small font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  
                  <Icon size={19} /> <span>{route.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        {/* Auth */}
        <div className="border-t border-border p-4">
          
          <div className="flex gap-3">
            
            <Link
              href="/login"
              onClick={closeSidebar}
              className="flex flex-1 items-center justify-center rounded-medium border border-border py-2.5 text-small font-medium transition-colors hover:bg-muted"
            >
              
              Login
            </Link>
            <Link
              href="/signup"
              onClick={closeSidebar}
              className="flex flex-1 items-center justify-center rounded-medium bg-primary py-2.5 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              
              Sign up
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileNav;
