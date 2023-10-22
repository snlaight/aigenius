import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react';

export const DAY_IN_MS = 86_400_000;

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700',
    bg: 'bg-pink-700/10',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700',
    bg: 'bg-orange-700/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-emerald-700',
    bg: 'bg-emerald-700/10',
  },
];

export const testimonials = [
  {
    name: 'Richard',
    avatar: 'R',
    title: 'Software Engineer',
    description: 'This is the best application I\'ve ever used.',
  },
  {
    name: 'Eula',
    avatar: 'E',
    title: 'Designer',
    description: 'I\'m in love with this app! It\'s so easy to use.',
  },
  {
    name: 'Dennis',
    avatar: 'D',
    title: 'Product Manager',
    description: 'I use this daily to generate content for my projects!',
  },
  {
    name: 'Jenny',
    avatar: 'J',
    title: 'Marketing',
    description: 'I don\'t know what I would do without this app.',
  },
];

export const AmountOptions = [
  {
    value: '1',
    label: '1 Photo',
  },
  {
    value: '2',
    label: '2 Photos',
  },
  {
    value: '3',
    label: '3 Photos',
  },
  {
    value: '4',
    label: '4 Photos',
  },
  {
    value: '5',
    label: '5 Photos',
  },
];

export const ResolutionOptions = [
  {
    value: '256x256',
    label: '256x256',
  },
  {
    value: '512x512',
    label: '512x512',
  },
  {
    value: '1024x1024',
    label: '1024x1024',
  },
];
