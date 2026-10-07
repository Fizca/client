import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => (
  <main className="content">
      {children}
  </main>
);

export default Main;
