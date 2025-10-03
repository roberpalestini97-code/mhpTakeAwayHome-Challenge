import './globals.css';
import { ReactNode } from 'react';
import QueryProvider from '../providers/query-provider';

export const metadata = {
  title: 'Movie Search',
  description: 'Search and favorite movies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
