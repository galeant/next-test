import { useSelector } from 'react-redux'
import ArticleInputForm from 'widgets/forms/ArticleInputForm'

const ArticleCreate = () => {
    const articleDetail = useSelector((state) => state.article.detail)
    return (
        <ArticleInputForm
            data={articleDetail}
        ></ArticleInputForm>
    )
}

export default ArticleCreate;