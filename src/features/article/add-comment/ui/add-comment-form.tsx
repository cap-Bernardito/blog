import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { articleSelectors } from "entities/article";
import { articleCommentsRTKApi } from "entities/article-comments";
import { type MessageField, MessageForm } from "entities/message-form/";
import { sessionSelectors } from "entities/session";

import { getApiErrorMessage } from "shared/api/get-api-error-message";

export const AddCommentForm = () => {
  const userId = useAppSelector(sessionSelectors.selectUserId);
  const articleId = useAppSelector(articleSelectors.selectArticleId);
  const dispatch = useAppDispatch();

  const handleSummit = useCallback(
    async (formData: MessageField) => {
      if (!userId || !articleId) {
        throw new Error("Невалидные данные");
      }

      try {
        await dispatch(
          articleCommentsRTKApi.endpoints.addArticleComment.initiate({
            articleId,
            userId,
            profileId: userId,
            text: formData.message,
          }),
        ).unwrap();
      } catch (error) {
        throw new Error(getApiErrorMessage(error));
      }

      return true;
    },
    [articleId, dispatch, userId],
  );

  return <MessageForm onSubmit={handleSummit} />;
};
