import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VoiceflowWidget from './components/VoiceflowWidget';

function App() {
  const [chatEnabled, setChatEnabled] = useState(false);

  const handleChatClick = () => {
    const voiceflow = (window as { voiceflow?: { chat?: { open?: () => void } } }).voiceflow;
    if (voiceflow?.chat?.open) {
      voiceflow.chat.open();
      return;
    }
    setChatEnabled(true);
  };

  return (
    <div className="min-h-screen">
      <VoiceflowWidget enabled={chatEnabled} />
      <Header onChatClick={handleChatClick} chatEnabled={chatEnabled} />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
