import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member Vault & Cloud Sync History',
  description: 'Manage your secure cloud-synced Base64 assets. Synchronize conversion history across your developer ecosystem with the Member Vault.',
};

export default function CloudSyncLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
