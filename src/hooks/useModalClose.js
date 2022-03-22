import { useEffect } from "react";

export const useModalClose = (ref, setModalOpen) => {
  useEffect(() => {
    const handleClickOut = ({ target }) => {
      console.log(target);
      if (!ref.current.contains(target)) setModalOpen(false);
    };

    window.addEventListener("click", handleClickOut);

    return () => {
      window.removeEventListener("click", handleClickOut);
    };
  }, [ref, setModalOpen]);
};
