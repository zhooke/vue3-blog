
async function login(request){
  const { data: result } = await this.$http.post('oauth/token',
    '', { headers: { Authorization: 'Basic YXBwOmFwcA==' },params: request })
  console.log(result)
  if (result.code !== 200) return this.$message.error('登陆失败！')
  return result;
}

export async function addBlog(request){
  const { data: result } = await this.$http.post('blog/add', request);
  console.log(result)
  if (result.code !== 200) return this.$message.error(result.data)
  return result;
}
