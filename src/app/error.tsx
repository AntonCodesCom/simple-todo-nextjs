'use client';
import CommonErrorBoundary from '~/Common/components/ErrorBoundary';
import CommonLayout from '~/Common/components/Layout';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootErrorBoundary({ error }: Props) {
  return (
    <CommonLayout>
      <CommonErrorBoundary error={error} />
    </CommonLayout>
  );
}
