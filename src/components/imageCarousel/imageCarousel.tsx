import React, { useState, useEffect, CSSProperties } from 'react';
import imagenFondo from '@/resources/InformationPageBackgroundImage.jpg';
import image1 from '@/resources/carousel/fotografia1.jpeg';
import image2 from '@/resources/carousel/fotografia2.jpeg';
import image3 from '@/resources/carousel/fotografia3.jpeg';
import image4 from '@/resources/carousel/fotografia4.jpeg';
import image5 from '@/resources/carousel/fotografia5.jpeg';
import image6 from '@/resources/carousel/fotografia6.jpeg';
import image7 from '@/resources/carousel/fotografia7.jpeg';
import image8 from '@/resources/carousel/fotografia8.jpeg';
import image9 from '@/resources/carousel/fotografia9.jpeg';
import image10 from '@/resources/carousel/fotografia10.jpeg';
import image11 from '@/resources/carousel/fotografia11.jpeg';
import image12 from '@/resources/carousel/fotografia12.jpeg';
import image13 from '@/resources/carousel/fotografia13.jpeg';
import image14 from '@/resources/carousel/fotografia14.jpeg';
import image15 from '@/resources/carousel/fotografia15.jpeg';
import image16 from '@/resources/carousel/fotografia16.jpeg';
import image17 from '@/resources/carousel/fotografia17.jpeg';
import image18 from '@/resources/carousel/fotografia18.jpeg';
interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
    { src: image1.src, alt: "Image 1" },
    { src: image2.src, alt: "Image 2" },
    { src: image3.src, alt: "Image 3" },
    { src: image4.src, alt: "Image 4" },
    { src: image5.src, alt: "Image 5" },
    { src: image6.src, alt: "Image 6" },
    { src: image7.src, alt: "Image 7" },
    { src: image8.src, alt: "Image 8" },
    { src: image9.src, alt: "Image 9" },
    { src: image10.src, alt: "Image 10" },
    { src: image11.src, alt: "Image 11" },
    { src: image12.src, alt: "Image 12" },
    { src: image13.src, alt: "Image 13" },
    { src: image14.src, alt: "Image 14" },
    { src: image15.src, alt: "Image 15" },
    { src: image16.src, alt: "Image 16" },
    { src: image17.src, alt: "Image 17" },
    { src: image18.src, alt: "Image 18" },
  ];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % 18);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const carouselStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
  };

  const carouselItemStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '33.3%',
    height: 'auto%',
    opacity: 0,
    transition: 'opacity 1s ease-in-out',
  };
  const carouselItemContainerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Tres columnas iguales
    gap: '10px', // Espacio entre las imágenes
  };
  const activeItemStyle: CSSProperties = {
    ...carouselItemStyle,
    opacity: 1,
  };

  return (
    <div style={carouselStyle}>
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <img src={imagenFondo.src} alt="Imagen fija" style={{ width: '100%' }} />
      </div>
        <div style={carouselItemContainerStyle}>
        {images.map((image, index) => (
            <div key={index} style={index === currentIndex ? activeItemStyle : carouselItemStyle }>
            <div style={{ display: 'flex' }}>
            {index > 1 && (
              <img src={images[index - 2].src} alt={images[index - 2].alt} style={{ width: 'auto' }} />
            )}
            {index > 0 && (
              <img src={images[index - 1].src} alt={images[index - 1].alt} style={{ width: 'auto' }} />
            )}
            <img src={image.src} alt={image.alt} style={{ width: 'auto' }} />
          </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default ImageCarousel;
