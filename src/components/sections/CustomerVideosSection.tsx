
import React, { useState, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealAnimation from '../ui/RevealAnimation';
import AnimatedButton from '../ui/AnimatedButton';

const CustomerVideosSection = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Featured video data
  const videos = [
    {
      id: 1,
      title: "Rocketry For Schools Launch Day",
      description: "Students demonstrating their model rockets during our educational launch day event.",
      videoUrl: "https://cdn.discordapp.com/attachments/1039909475487858758/1350499352321331373/My_Movie_14.mov?ex=67d6f608&is=67d5a488&hm=c11a765b7e10ef25f32a5f2cceade28f55f5e4d6966baa35aa5efd6ce931a077&"
    }
  ];
  
  return (
    <section id="videos" className="py-20 bg-white dark:bg-space-950 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      <div className="container px-4 sm:px-6 mx-auto">
        <RevealAnimation>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-space-100 dark:bg-space-800 text-space-800 dark:text-space-200 rounded-full mb-4 inline-block">
              Success Stories
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Inspiring <span className="text-rocket-600 dark:text-rocket-400">Young Scientists</span>
            </h2>
            <p className="text-space-600 dark:text-space-400 text-sm sm:text-base">
              Watch how schools across the UK are using our products to inspire the next generation of rocket scientists.
            </p>
          </div>
        </RevealAnimation>
        
        <div className="relative" ref={videoContainerRef}>
          <RevealAnimation delay={0.1}>
            <div className="bg-white dark:bg-space-900 rounded-2xl shadow-premium overflow-hidden">
              <div className="aspect-video w-full">
                <video
                  width="100%"
                  height="100%"
                  src={videos[0].videoUrl}
                  title={videos[0].title}
                  className="w-full h-full"
                  controls
                ></video>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{videos[0].title}</h3>
                <p className="text-space-600 dark:text-space-400">{videos[0].description}</p>
              </div>
            </div>
          </RevealAnimation>
        </div>
        
        {/* Testimonials */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              quote: "The rocketry kits have transformed our science lessons. Students who were previously disengaged are now eagerly participating.",
              author: "Sarah Johnson",
              role: "Science Teacher, Manchester Grammar School"
            },
            {
              quote: "As a STEM coordinator, I've seen firsthand how these rockets inspire curiosity about physics and engineering principles.",
              author: "David Thompson",
              role: "STEM Coordinator, Edinburgh Academy"
            },
            {
              quote: "Our school club has participated in the UK Rocketry Challenge for three years using these kits, placing in the top five each time!",
              author: "Michael Chen",
              role: "Physics Teacher, St. Paul's School"
            }
          ].map((testimonial, index) => (
            <RevealAnimation key={index} delay={0.1 * (index + 1)}>
              <div className="bg-space-50 dark:bg-space-900/50 rounded-xl p-6 h-full border border-gray-100 dark:border-gray-800">
                <p className="text-space-600 dark:text-space-400 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-space-500 dark:text-space-500">{testimonial.role}</p>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerVideosSection;
