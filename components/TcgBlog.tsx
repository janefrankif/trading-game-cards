'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  X, 
  Share2, 
  Sparkles,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/tcg-content';

export function TcgBlog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Collector Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Trading Card Insights & Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Market analysis, price trend reports, bilateral trading strategies, and grading company comparisons compiled by veteran card appraisers.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Updated Weekly for Active Traders
          </span>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-1 group"
            >
              <div>
                {/* Article Cover */}
                <div 
                  onClick={() => setSelectedArticle(post)}
                  className="relative w-full h-44 bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-indigo-950/90 border border-indigo-700/50 text-indigo-300 font-bold text-[10px] backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>

                {/* Meta & Excerpt */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedArticle(post)}
                    className="font-bold text-white text-sm hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Author & Read CTA */}
              <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-700">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium truncate max-w-[90px]">
                    {post.author.name}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedArticle(post)}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300 text-xs font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400">{selectedArticle.date}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 pt-1">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                  <Image
                    src={selectedArticle.author.avatar}
                    alt={selectedArticle.author.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{selectedArticle.author.name}</div>
                  <div className="text-[11px] text-slate-400">{selectedArticle.author.role}</div>
                </div>
              </div>
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              {selectedArticle.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
