// app/layout.js
import './globals.css';

export const metadata = {
  title: '후발성 우울증 설문',
  description: 'Korean Seniors를 위한 후발성 우울증 설문 웹사이트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-semibold">후발성 우울증 설문</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-blue-600 text-white py-4 text-center">
          © {new Date().getFullYear()} 후발성 우울증 설문. 모든 권리 보유.
        </footer>
      </body>
    </html>
  );
}
