import PageMeta from "../../components/common/PageMeta";

export default function Benefits() {
  return (
    <>
      <PageMeta
        title="Benefits | Good eCommerce"
        description="Learn about the benefits of our platform"
      />

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
          Benefits
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          This page will showcase the benefits of Good eCommerce. Content coming soon.
        </p>
      </div>
    </>
  );
}
