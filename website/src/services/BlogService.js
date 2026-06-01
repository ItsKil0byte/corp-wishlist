import api from "@/lib/api";

export const BlogService = {
  async getBlogList(page = 0, limit = 10, category = "") {
    const url = category
      ? `/blog?page=${page}&limit=${limit}&category=${category}`
      : `/blog?page=${page}&limit=${limit}`;
    const response = await api.get(url);
    return response.data;
  },

  async getBlogPost(slug) {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },
};
