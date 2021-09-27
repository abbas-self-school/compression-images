import Head from 'next/head';
import CompressionImage from './../components/compressionImage';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <Head>
        <title>Compression Images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CompressionImage />
    </div>
  )
}
