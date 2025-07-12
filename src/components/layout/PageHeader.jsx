export default function PageHeader({ title }) {
  return (
    <div className="text-center mt-2 py-6 gap-2 sm:gap-6 flex items-center justify-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-gray-900">
        {title}
      </h1>
    </div>
  );
}
