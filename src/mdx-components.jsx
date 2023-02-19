import { H2, P } from '@/components/Components';

export function useMDXComponents(components) {
  return { h2: H2, p: P, ...components };
}
