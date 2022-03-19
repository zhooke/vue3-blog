import http from '@/utils/http'

/**
 * 登陆接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLogin = (params) => {
  return http
    .post('oauth/token', '', { headers: { Authorization: 'Basic YXBwOmFwcA==' }, params: params });
}

/**
 * 获取博客列表接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogList = (params) => {
  return http.post('/blog/list', params)
}

/**
 * 获取博客内容接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogById = (params) => {
  return http.get('/blog/' + params)
}

/**
 * 新增博客接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const publishBlog = (params) => {
  return http.post('blog/add', params);
}
