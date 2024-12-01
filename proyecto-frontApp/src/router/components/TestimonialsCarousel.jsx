import React, { useEffect, useState } from 'react';
import '../../css/testimonials.css';

const TestimonialsCarousel = () => {
    const testimonials = [
        { id: 1, title: "Cliente Satisfecho", content: "INNOVANDING ha transformado completamente nuestra forma de trabajar. Los resultados fueron impresionantes." },
        { id: 2, title: "Gran Experiencia", content: "El servicio que hemos recibido ha sido excepcional. Totalmente recomendado." },
        { id: 3, title: "Excelente Soporte", content: "El equipo de INNOVANDING nos ha ayudado a resolver todos nuestros problemas técnicos con rapidez y eficiencia." },
        { id: 4, title: "Innovación Total", content: "La solución propuesta por INNOVANDING ha superado nuestras expectativas y ha mejorado significativamente nuestro flujo de trabajo." },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 2000);

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, [testimonials.length]);

    return (
        <div className="testimonials-carousel">
            <div className="testimonials">
                <div className="testimonial">
                    <h4>{testimonials[currentIndex].title}</h4>
                    <p>"{testimonials[currentIndex].content}"</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
