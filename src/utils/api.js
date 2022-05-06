import http from '@/utils/http'

/**
 * 登陆接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLoginApi = (params) => {
  return http
    .post('oauth/login', '', { params: params });
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
export const commentNewestApi = (params) => {
  return http.get('blog/comment/newest', { params: params });
}

/**
 * top5
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const blogTop5Api = () => {
  return http.get('blog/top5');
}

/**
 * 创建tag
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createTagApi = (params) => {
  return http.post('blog/tag', params);
}

/**
 * 获取tag列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTagApi = () => {
  return http.get('blog/tag');
}

/**
 * 获取blog对应的tag
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogTagApi = (params) => {
  return http.get('blog/tag/relation/' + params);
}

/**
 * 获取blog用户信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogUserApi = () => {
  return http.get('blog/user');
}

/**
 * 获取blog用户信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUserInfoApi = (params) => {
  return http.put('/users', params);
}

/**
 * 注册
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const registerUserApi = (params) => {
  return http.post('/users/register', params);
}

/**
 * 删除blog
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteBlogApi = (params) => {
  return http.delete('/blog/' + params);
}

/**
 * 获取博客草稿列表接口
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBlogDraftListApi = (params) => {
  return http.post('/blog/draft', params)
}

/**
 * 更新blog
 * @param params
 * @returns {*}
 */
export const updateBlogApi = (params) => {
  return http.post('/blog/update', params)
}

export const getDictionaryApi = (params) => {
  return http.get('/system/dictionary/value', { params: { type_name: params } })
}
