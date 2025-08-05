import React from 'react';
import { Hero } from '../Hero';
import { FeaturedProjects } from '../FeaturedProjects';
import { Testimonials } from '../Testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Testimonials />
    </>
  );
}