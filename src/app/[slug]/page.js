export default async function SlugPage({ params }) {
  const { slug } = await params;
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Page: {slug}</h1>
      <p>This is a dynamic page for slug: {slug}</p>
    </div>
  );
}