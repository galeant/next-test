import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleInputForm from 'widgets/forms/ArticleInputForm'
import { getArticleDetail } from 'redux/action/article'
import { useRouter } from 'next/router';

const ArticletDetail = () => {
    const { isReady, query } = useRouter();
    const dispatch = useDispatch();
    const articleDetail = useSelector((state) => state.article.detail)

    useEffect(() => {
        if (isReady) {
            dispatch(getArticleDetail(query.id))
        }
    }, [isReady])

    return (
        <ArticleInputForm
            id={articleDetail.id}
            data={articleDetail}
        ></ArticleInputForm>
    )
}

export default ArticletDetail;