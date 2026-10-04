import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { LOCAL_STORAGE_KEY_NAME } from '../../constants';

const LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#writing', label: 'Writing' },
  { href: '#awards', label: 'Awards' },
  { href: '#stack', label: 'Stack' },
];

const SiteHeader = ({
  name,
  githubUsername,
  linkedin,
  theme,
  setTheme,
}: {
  name: string;
  githubUsername: string;
  linkedin?: string;
  theme: string;
  setTheme: (theme: string) => void;
}) => {
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, next);
    setTheme(next);
  };

  return (
    <>
      <div className="site-banner">
        <span>
          Backend engineer building products that stay fast under load.
        </span>
        <a className="btn-solid" href="#contact" style={{ padding: '5px 9px' }}>
          Say hello
        </a>
      </div>
      <nav className="site-nav">
        <div className="site-wrap site-nav-inner">
          <a href="#top" className="brand">
            {name || 'Akhand Agarwal'} <em>(engineer)</em>
          </a>
          <div className="nav-links">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              className="icon-btn"
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <AiFillGithub />
            </a>
            {linkedin && (
              <a
                className="icon-btn"
                href={`https://www.linkedin.com/in/${linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            )}
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SiteHeader;
