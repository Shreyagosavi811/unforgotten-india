import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IndiaExplorerPage from './pages/IndiaExplorerPage';
import RegionalExplorerPage from './pages/RegionalExplorerPage';
import StoryPage from './pages/StoryPage';
import StoryCollectionPage from './pages/StoryCollectionPage';
import StoriesDiscoveryPage from './pages/StoriesDiscoveryPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories" element={<StoriesDiscoveryPage />} />
        <Route path="/india" element={<IndiaExplorerPage />} />
        <Route path="/india/:stateId" element={<RegionalExplorerPage />} />
        <Route path="/india/:stateId/:category" element={<StoryCollectionPage />} />
        <Route path="/story/:storySlug" element={<StoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
