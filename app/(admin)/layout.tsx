import styles from './layout.module.css'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className={styles.header}>
        <a href="#logo">Админ панель</a>
        <div>
          <a href="#contact">Контакты</a>
          <a href="#about">О нас</a>
        </div>
      </header>
      {children}
    </>
  );
}