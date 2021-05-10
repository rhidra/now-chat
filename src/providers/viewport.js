import React, { useContext, useEffect } from "react";

const viewportContext = React.createContext({});

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    let id;

    window.addEventListener("resize", () => {
      if (id) {
        window.cancelAnimationFrame(id);
      }
      id = window.requestAnimationFrame(handleWindowResize);
    });

    return () => {
      if (id) {
        window.cancelAnimationFrame(id);
      }
      window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export function useViewport(debounce = 1000) {
  const { width, height } = useContext(viewportContext);
  return { width, height };
};

export function useIsMobile(debounce = 1000) {
  const {width} = useViewport(debounce);
  return width <= 641;
}