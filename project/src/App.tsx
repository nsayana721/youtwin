import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Marketplace } from './pages/Marketplace/Marketplace';
import { MyTwins } from './pages/MyTwins/MyTwins';
import { TutorDetail } from './pages/TutorDetail/TutorDetail';
import { ContentDetail } from './pages/ContentDetail/ContentDetail';
import { FavoritesProvider } from './context/FavoritesContext';
import { TermsProvider } from './context/TermsContext';
import { SharedProvider } from './context/SharedContext';
import { ChatHistoryProvider } from './context/ChatHistoryContext';
import { Terms } from './pages/Terms/Terms';
import { Shared } from './pages/Shared/Shared';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <TermsProvider>
          <SharedProvider> 
            <ChatHistoryProvider>
              <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate to="/marketplace" replace />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/mytwins" element={<MyTwins />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/shared" element={<Shared />} />
                <Route path="/mytwins/:id" element={<TutorDetail />} />
                <Route path="/mytwins/:tutorId/content/:contentId" element={<ContentDetail />} />
                <Route path="/marketplace/:id" element={<TutorDetail />} />
                <Route path="/marketplace/:tutorId/content/:contentId" element={<ContentDetail />} />
              </Route>
            </Routes>
            </ChatHistoryProvider>
          </SharedProvider>
        </TermsProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}
export default App;
