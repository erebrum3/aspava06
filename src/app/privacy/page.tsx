import { legalTexts } from '@/data/legalTexts';

export default function PrivacyPage() {
  const { privacy } = legalTexts;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-heading font-bold text-aspava-dark mb-4">
          {privacy.title}
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {privacy.lastUpdated}
        </p>
        <div className="prose prose-lg max-w-none">
          <div
            className="whitespace-pre-wrap text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: privacy.content }}
          />
        </div>
      </div>
    </div>
  );
}
