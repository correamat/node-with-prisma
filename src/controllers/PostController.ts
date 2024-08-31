import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
    async createPost(request: Request, response: Response) {
        try {
            const { title, content, userId } = request.body;

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    author: { connect: { id: userId } },
                }
            });

            return response.status(200).json({ success: true, message: 'Post created successfully', post });
        } catch (error) {
            return response.status(400).json({ success: false, message: error.message });
        }
    },
    async getPost(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const post = await prisma.post.findUnique({ where: { id: Number(id) } });

            if (!post) {
                return response.status(404).json({ success: false, message: 'Post not found' });
            }

            return response.status(200).json({ success: true, post });
        } catch (error) {
            return response.status(400).json({ success: false, message: error.message });
        }
    },
    async listPosts(request: Request, response: Response) {
        try {
            const posts = await prisma.post.findMany({
                orderBy: {
                    id: "desc"
                }
            });

            return response.status(200).json({ success: true, posts });
        } catch (error) {
            return response.status(400).json({ success: false, message: error.message });
        }
    },
    async updatePost(request: Request, response: Response) {
        try {
            const { id, title, content } = request.body;

            const postExists = await prisma.post.findUnique({ where: { id: Number(id) } });
            if (!postExists) {
                return response.status(404).json({ success: false, message: 'Post not found' });
            }

            const post = await prisma.post.update({
                data: {
                    title,
                    content
                },
                where: {
                    id: Number(id)
                }
            });

            return response.status(200).json({ success: true, message: 'Post updated successfully', post });
        } catch (error) {
            return response.status(400).json({ success: false, message: error.message });
        }
    },
    async deletePost(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const postExists = await prisma.post.findUnique({ where: { id: Number(id) } });
            if (!postExists) {
                return response.status(404).json({ success: false, message: 'Post not found' });
            }

            const post = await prisma.post.delete({
                where: {
                    id: Number(id)
                }
            });

            return response.status(200).json({ success: true, message: 'Post deleted successfully', post });
        } catch (error) {
            return response.status(400).json({ success: false, message: error.message });
        }
    },
};