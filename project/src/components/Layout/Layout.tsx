import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

export function Layout() {
  const [isContentPage, setIsContentPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsContentPage(location.pathname.includes('/content/'));
  }, [location]);

  return (
    <div className="flex h-screen overflow-hidden" style={{
      backgroundImage: 'url("https://lh3.googleusercontent.com/pw/AP1GczNY19sI_7U-M35qH3qe-AMfS6RJWOCMmjp0OrpzsgFPx321-iMe_q3ZFlH_CQSJoaowfpDvB1oL8YsGFSpPRmQGF04E5NO2Qp2WVLoXQKl5Ihc3-K2nWuY1aJlEv0JCrTn8IV9lT07fI4457dNBveHU4Q=w1024-h1024-s-no-gm?authuser=0")',
      backgroundSize: '200px',
      backgroundRepeat: 'repeat'
    }}>
      <Sidebar collapsed={isContentPage} />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}