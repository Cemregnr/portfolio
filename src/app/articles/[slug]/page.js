import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <img src={article.thumbnail} alt={article.title} className="rounded-xl mb-6 w-full h-80 object-cover" />
      <div className="prose prose-lg text-white mb-8">{article.content}</div>
      <div className="text-sm text-gray-400 mt-8">Published: {new Date(article.date_created).toLocaleDateString()}</div>
    </div>
  );
}
