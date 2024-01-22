import cn from "classnames";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

import { Article, ArticleCardVertical, articleRTKApi } from "entities/article";

import css from "./article-recommendations.module.scss";

import "swiper/scss";
import "swiper/scss/pagination";

register();

type ArticleRecommendationsProps = {
  className?: string;
  type?: string;
  id: Article["id"];
};

export const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({ className, type, id }) => {
  const { data: recommendations, isSuccess } = articleRTKApi.useGetArticlesRecommendationsQuery({ type, id });

  return (
    isSuccess &&
    recommendations?.length > 0 && (
      <section className={cn(css.root, className)}>
        <h2 className={css.title}>Рекомендуем:</h2>
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          navigation={false}
          pagination={{
            clickable: true,
            bulletElement: "button",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1920: {
              slidesPerView: 3,
            },
          }}
        >
          {recommendations.map((article) => {
            return (
              <SwiperSlide key={article.id}>
                <ArticleCardVertical {...article} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    )
  );
};
