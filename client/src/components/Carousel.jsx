// import { Carousel } from "@material-tailwind/react";

// function CarouselDefault() {
//     return (
//         <Carousel className="h-96 w-full">
//             <img
//                 src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//                 alt="image 1"
//                 className="h-full w-full object-cover"
//             />
//             <img
//                 src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//                 alt="image 2"
//                 className="h-full w-full object-cover"
//             />
//             <img
//                 src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//                 alt="image 3"
//                 className="h-full w-full object-cover"
//             />
//             <img
//                 src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//                 alt="image 3"
//                 className="h-full w-full object-cover"
//             />
//             <img
//                 src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//                 alt="image 3"
//                 className="h-full w-full object-cover"
//             />
//             <img
//                 src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//                 alt="image 3"
//                 className="h-full w-full object-cover"
//             />
//         </Carousel>
//     );
// }

// export default CarouselDefault;

// import { Carousel, Slide, CarouselInner, CarouselItem } from "@material-tailwind/react";
// import { useState, useEffect } from "react";

// function CarouselDefault() {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const images = [
// "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
// "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
// "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
// Agrega más imágenes aquí
//     ];

//     useEffect(() => {
//         // Cambiar automáticamente la diapositiva cada 3 segundos
//         const intervalId = setInterval(() => {
//             setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 3000);

//         return () => {
//             // Limpiar el temporizador cuando el componente se desmonte
//             clearInterval(intervalId);
//         };
//     }, []);

//     return (
//         <Carousel>
//             <CarouselInner>
//                 {images.map((image, index) => (
//                     <CarouselItem key={index} active={index === activeIndex}>
//                         <Slide>
//                             <img
//                                 src={image}
//                                 alt={`Slide ${index + 1}`}
//                                 className="h-full w-full object-cover"
//                             />
//                         </Slide>
//                     </CarouselItem>
//                 ))}
//             </CarouselInner>
//         </Carousel>
//     );
// }

// export default CarouselDefault;


import { useState, useEffect } from 'react';
import image1 from '../images/img1.jpg'

const Carousel = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const carouselImages = [
        "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
        "https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
    ];

    useEffect(() => {
        const autoChangeInterval = setInterval(() => {
            setCurrentImage((prevImage) =>
                prevImage === carouselImages.length - 1 ? 0 : prevImage + 1
            );
        }, 5000); // Cambia la imagen cada 5 segundos (ajusta este valor según tus necesidades)

        return () => {
            clearInterval(autoChangeInterval);
        };
    }, [carouselImages]);

    const handleChangeImage = (newIndex) => {
        setCurrentImage(newIndex);
    };

    return (
        <div className="w-full h-auto mb-10">
            <div className="relative overflow-hidden">
                <img
                    src={carouselImages[currentImage]}
                    alt={`Image ${currentImage + 1}`}
                    className="w-full h-[40rem] object-cover rounded-md"
                />

                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleChangeImage(index)}
                            className={`px-3 py-1 mx-2 mb-2 rounded-full ${currentImage === index
                                ? 'bg-color-third text-color-primary'
                                : 'bg-color-neutral-400 text-color-input'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;

