import AOS from 'aos';
import 'aos/dist/aos.css';

export const initAOS = (): void => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: false,
  });
};
