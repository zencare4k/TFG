import React, { useEffect, useState } from "react";
import '../../styles/home.css';

const Herosection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const slides = [
        { src: "/assets/products/image1.jpg", alt: "Slide 1", text: `Camiseta Naruto 50% 2̶0̶.̶9̶9̶€̶  10.99€` },
        { src: "/assets/products/image2.jpg", alt: "Slide 2", text: "Camiseta de Linkin park 10% 2̶0̶.̶9̶9̶€̶   18.89€" },
        { src: "/assets/products/image3.jpg", alt: "Slide 3", text: "Camiseta de Limp Bizkit 35% 2̶0̶.̶9̶9̶€̶  13.64€" },
        { src: "/assets/products/image4.jpg", alt: "Slide 4", text: "Camiseta de Dragon Ball z 95% 2̶0̶.̶9̶9̶€̶  1.05€" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [slides.length]);

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <div id="sideshow-example" data-component="slideshow">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap" />
 v           <div role="list">
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
            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <button className="next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default Herosection;