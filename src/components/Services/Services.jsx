import React from 'react';
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import container from '../../assets/6.jpg';
import container2 from '../../assets/8.jpg';
import container3 from '../../assets/5.jpg';
import container4 from '../../assets/2.jpg';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

const CustomPrevArrow = ({ className, onClick }) => (
    <ArrowLeftCircle size={36} className={`${className} text-white hover:text-sky-400 z-10`} onClick={onClick} />
);

const CustomNextArrow = ({ className, onClick }) => (
    <ArrowRightCircle size={36} className={`${className} text-white hover:text-sky-400 z-10`} onClick={onClick} />
);

export const Services = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        lazyLoad: true,
        cssEase: "ease-in-out",
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    return (
        <section id='services' className="border-b border-neutral-800 pb-24 flex flex-col items-center">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -80 }}
                transition={{ duration: 1 }}
                className="my-16 text-center text-4xl font-bold text-white"
            >
                Our Services
            </motion.h1>

            <div className="w-full max-w-3xl px-4 relative">
                <Slider {...settings}>
                    {data.map((d, id) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
                            className="relative h-[480px] rounded-xl overflow-hidden mx-auto shadow-xl max-w-3xl"
                        >
                            <img
                                src={d.image}
                                alt="background"
                                className="absolute inset-0 w-full h-full object-cover z-[-2]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 backdrop-blur-sm z-[-1]" />

                            <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 text-center">
                                <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-inner">
                                    <h2 className="text-3xl font-bold text-white font-protest mb-4 tracking-wide drop-shadow-lg">
                                        {d.title}
                                    </h2>
                                    <p className="text-white text-base font-review leading-relaxed drop-shadow-sm">
                                        {d.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

const data = [
    {
        id: 1,
        title: "Logistics (Ocean Freight, Air Freight, Road Freight)",
        description: "We provide comprehensive logistics solutions to ensure your goods are delivered on time and in perfect condition, whether by sea, air, or road. Our services are tailored to your needs for a seamless supply chain.",
        image: container
    },
    {
        id: 2,
        title: "Warehousing",
        description: "Our modern warehousing facilities ensure safe and secure storage with advanced inventory management and flexible options that optimize your supply chain.",
        image: container2
    },
    {
        id: 3,
        title: "Transportation",
        description: "We offer reliable road transport solutions across regions, using a modern fleet and expert drivers to ensure timely, safe, and efficient delivery of your goods to their destination without hassle or delay for you and your customers .",
        image: container3
    },
    {
        id: 4,
        title: "Custom Clearance",
        description: "Our expert team handles all customs clearance processes efficiently, ensuring your cargo clears borders without delays. From documentation to compliance, we make international shipping hassle-free and fully compliant.",
        image: container4
    }
];
