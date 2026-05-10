import api from "@/lib/api";

export const BlogService = {
  async getBlogList(page = 0, limit = 10) {
    const response = await api.get(`/blog?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getBlogPost(slug) {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },
};
