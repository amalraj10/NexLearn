import { Metadata } from 'next';
import { HomeRedirect } from '@/components';

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to NexLearn - Your modern online examination platform for learning and assessment",
};

export default function Home() {
  return <HomeRedirect />;
}
