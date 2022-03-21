import http from '@/utils/http'

/**
 * 登陆接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLoginApi = (params) => {
  return http
    .post('oauth/token', '', { headers: { Authorization: 'Basic YXBwOmFwcA==' }, params: params });
}

/**
 * 获取博客列表接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogListApi = (params) => {
  return http.post('/blog/list', params)
}

/**
 * 获取博客内容接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogByIdApi = (params) => {
  return http.get('/blog/' + params)
}

/**
 * 新增博客接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const publishBlogApi = (params) => {
  return http.post('blog/add', params);
}

/**
 * 通过blogId获取评论
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const commentListApi = (params) => {
  return http.post('blog/comment:list', params);
}

/**
 * 通过blogId评论blog
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const commentBlogApi = (params) => {
  return http.post('blog/comment', params);
}

/**
 * 最新10条评论
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const commentNewestApi = () => {
  return http.get('blog/comment/newest');
}

/**
 * top5
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const blogTop5Api = () => {
  return http.get('blog/top5');
}
