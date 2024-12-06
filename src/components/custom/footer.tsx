function Footer() {
  const fullYear = new Date().getFullYear();
  return (
    <footer className="text-secondary py-2 text-center text-sm">
      PAINS © {fullYear}
    </footer>
  );
}

export default Footer;
