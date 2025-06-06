import PageHeader from '@/components/shared/PageHeader';
import TranslatorForm from '@/components/tools/TranslatorForm';
import { Languages } from 'lucide-react';

export default function TranslatorPage() {
  return (
    <div>
      <PageHeader 
        title="English to Bangla Translator"
        description="Translate text from English to Bengali using AI."
        icon={Languages}
      />
      <div className="max-w-2xl mx-auto">
        <TranslatorForm />
      </div>
    </div>
  );
}
