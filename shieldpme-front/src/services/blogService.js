import { api } from './api';
import { USE_MOCK } from '../config/env';
import { posts } from '../data/blog';

// GET /api/blog/posts   (data no formato yyyy-MM-dd)
export async function listarPosts() {
  if (USE_MOCK) return posts;

  return api.get('/blog/posts');
}
