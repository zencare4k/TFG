import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/product_API";
import "../../styles/home.css";

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadCarouselImages = async () => {
      try {
        const data = await fetchProducts(); // Obtén los productos desde la base de datos
        const carouselSlides = data.map((product) => ({
          src: product.image,
          alt: product.name,
          text: `${product.name} - ${product.price}€`,
        }));
        setSlides(carouselSlides);
      } catch (error) {
        console.error("Error al cargar las imágenes del carrusel:", error);
      }
    };

    loadCarouselImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) {
    return <p>Cargando carrusel...</p>;
  }

  return (
    <div id="sideshow-example" data-component="slideshow">
      <div role="list">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeIndex ? "active" : ""}`}
          >
            <img src={slide.src} alt={slide.alt} />
            <div className="text-overlay">{slide.text}</div>
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)}>
        &#10094;
      </button>
      <button className="next" onClick={() => setActiveIndex((activeIndex + 1) % slides.length)}>
        &#10095;
      </button>
    </div>
  );
};

export default HeroSection;