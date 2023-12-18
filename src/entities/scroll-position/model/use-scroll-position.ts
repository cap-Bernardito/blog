import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useAppDispatch, useAppSelector } from "app/app-store/store-hooks";

import { scrollPositionActions } from "./slice/scroll-position-slice";
import { selectScrollPosition } from "./selectors";

export const useScrollPosition = (scrollOff = false, position?: "top") => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useAppSelector(selectScrollPosition(pathname));

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
