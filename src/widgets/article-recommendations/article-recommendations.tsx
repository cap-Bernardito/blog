import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { register } from "swiper/element/bundle";
import type { SwiperProps, SwiperSlideProps } from "swiper/react";

import { Article, ArticleCardVertical, articleRTKApi } from "entities/article";

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
  id: Article["id"];
};

export const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({ className, type, id }) => {
  const { data: recommendations, isSuccess } = articleRTKApi.useGetArticlesRecommendationsQuery({ type, id });
  const swiperElRef = useRef<SwiperRef>(null);
  const [swiper, setSwiper] = useState<Swiper>();

  useEffect(() => {
    if (!swiperElRef.current || !recommendations) {
      return;
    }

    const swiperParams: SwiperProps = {
      navigation: false,
      pagination: {
        clickable: true,
        bulletElement: "button",
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
      on: {
        init: (swiperInstanse) => setSwiper(swiperInstanse),
      },
      injectStyles: [
        `
        .swiper-wrapper {height: auto; padding-bottom: 18px}
        :host ::slotted(swiper-slide) {height: auto; display: flex;}
        :host .swiper-pagination {left: 10px; right: 10px; width: auto; display: flex; justify-content: space-between;}
        :host .swiper-pagination-bullet {flex: 1 1 10px !important;}
      `,
      ],
    };

    if (!swiperElRef.current.initialized) {
      Object.assign(swiperElRef.current, swiperParams);
      swiperElRef.current.initialize();
    } else {
      swiper?.update();
    }

    return () => {
      swiper?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperElRef.current, recommendations]);

  return (
    isSuccess &&
    recommendations?.length > 0 && (
      <section className={cn(css.root, className)}>
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
      </section>
    )
  );
};
