import { Variant, VariantLabels } from "motion-v";

export const fadeIn = (direction : string, delay : number) : {[k : string] : Variant }  => {
    return {
      hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 1
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        }
      }
    };
  };
  
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren,
          delayChildren,
        }
      }
    };
  };
  
  export const slideIn = (direction : string, type : string , delay : number, duration : number) : { [k : string] : Variant } => {
    return {
      hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type,
          delay,
          duration,
          ease: 'easeOut',
        }
      }
    };
  };
  
  export const textFromLeft = (delay : number) : { [k : string ] : Variant} => {
    return {
      hidden: {
        x: -15,
        opacity: 1,
      },
      show: {
        x: 0,
        opacity: 100,
        transition: {
          type: "spring",
          duration: 1.25,
          delay
        }
      },   
    };
  };

  export const textFromRight = (delay : number) : { [k : string]: Variant } => {
    return {
      hidden: {
        x: 30,
        opacity: 1,
      },
      show: {
        x: 0,
        opacity: 100,
        transition: {
          type: "spring",
          duration: 1.25,
          delay,
        }
      },
      
    };
  };

  export const Middle = (delay: number): { [key: string]: Variant } => {
    return {
      hidden: {
        y: 50,
        opacity: 1, // Note: Typically 'hidden' might have opacity: 0. This could be intentional.
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay, // Uses the 'delay' parameter from the function arguments
        }
      },
    };
  };

  


  
  export const scale = (delay) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay,
        }
      }
    };
  }; 