import cn from "classnames";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { register } from "swiper/element/bundle";
import type { SwiperProps, SwiperSlideProps } from "swiper/react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { ArticleCardVertical, articleSelectors, fetchArticlesRecommendations } from "entities/article";

import css from "./article-recommendations.module.scss";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & SwiperProps, HTMLElement>;
      "swiper-slide": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & SwiperSlideProps, HTMLElement>;
    }
  }
}

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void; initialized?: boolean };

register();

type ArticleRecommendationsProps = {
  className?: string;
  type?: string;
};

export const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({ className, type }) => {
  const recommendations = useAppSelector(articleSelectors.selectRecommendations);
  const dispatch = useAppDispatch();
  const swiperElRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (!swiperElRef.current) {
      return;
    }

    const swiperParams = {
      navigation: false,
      pagination: false,
      scrollbar: {
        draggable: true,
      },
      spaceBetween: 16,
      slidesPerView: 1,
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1920: {
          slidesPerView: 3,
        },
      },
    };

    if (!swiperElRef.current.initialized) {
      Object.assign(swiperElRef.current, swiperParams);
      swiperElRef.current.initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperElRef.current]);

  useEffect(() => {
    dispatch(fetchArticlesRecommendations({ limit: 8, type }));
  }, [dispatch, type]);

  return (
    recommendations && (
      <div className={cn(css.root, className)}>
        <h2 className={css.title}>Рекомендуем:</h2>
        <swiper-container ref={swiperElRef} init={false}>
          {recommendations.map((article) => {
            return (
              <swiper-slide key={article.id}>
                <ArticleCardVertical {...article} />
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    )
  );
};
