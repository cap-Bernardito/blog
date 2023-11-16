import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { articleSelectors } from "entities/article";
import { addCommentThunk } from "entities/article-comments";
import { type MessageField, MessageForm } from "entities/message-form/";
import { sessionSelectors } from "entities/session";

export const AddCommentForm = () => {
  const userId = useAppSelector(sessionSelectors.selectUserId);
  const articleId = useAppSelector(articleSelectors.selectArticleId);
  const dispatch = useAppDispatch();

  const handleSummit = useCallback(
    async (formData: MessageField) => {
      if (!userId || !articleId) {
        throw new Error("Невалидные данные");
      }

      await dispatch(
        addCommentThunk({
          formData: {
            articleId,
            userId,
            profileId: userId,
            text: formData.message,
          },
        }),
      ).unwrap();

      return true;
    },
    [articleId, dispatch, userId],
  );

  return <MessageForm onSubmit={handleSummit} />;
};
