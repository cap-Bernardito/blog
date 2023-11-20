import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { scrollPositionActions, scrollPositionSelectors } from "..";

export const useScrollPosition = (scrollOff = false, position?: "top") => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useAppSelector(scrollPositionSelectors.selectScrollPosition(pathname));

  useLayoutEffect(() => {
    return () => {
      dispatch(scrollPositionActions.setScroll({ pathname, scrollY: window.scrollY }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollOff) {
      return;
    }

    const scrollY = position === "top" ? 0 : scrollPosition ?? 0;

    window.scrollTo(0, scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrollPosition;
};
