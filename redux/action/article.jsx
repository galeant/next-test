export const getArticleList = (queryParams) => ({
    type: 'GET_ARTICLE_LIST',
    queryParams
})

export const setArticleList = (data) => ({
    type: 'SET_ARTICLE_LIST',
    data,
})

export const getArticleDetail = (id) => ({
    type: 'GET_ARTICLE_DETAIL',
    id,
});

export const setArticleDetail = (data) => ({
    type: 'SET_ARTICLE_DETAIL',
    data
})

export const postArticle = (submitData,id) => ({
    type: 'POST_ARTICLE',
    id,
    submitData
})

export const deleteArticle = ({ id, queryParams }) => ({
    type: 'DELETE_ARTICLE',
    id, queryParams
})