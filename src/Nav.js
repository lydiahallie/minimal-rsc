'use client';
import {startTransition} from 'react';
import {useRouter} from './router';

export default function SidebarNoteContent({}) {
  const {navigate} = useRouter();

  return (
    <nav>
      <div
        onClick={() => {
          startTransition(() => {
            navigate('one');
          });
        }}>
        Page One
      </div>
      <div
        onClick={() => {
          startTransition(() => {
            navigate('two');
          });
        }}>
        Page Two
      </div>
      <div
        onClick={() => {
          startTransition(() => {
            navigate('three');
          });
        }}>
        Page with <code>Suspense</code>
      </div>
    </nav>
  );
}
