import { AiFillGithub } from 'react-icons/ai';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import { FALLBACK_IMAGE } from '../../constants';

const Hero = ({
  profile,
  loading,
  resumeFileUrl,
  githubUsername,
}: {
  profile: Profile | null;
  loading: boolean;
  resumeFileUrl?: string;
  githubUsername: string;
}) => {
  const name = profile?.name?.trim() || 'Akhand Agarwal';

  return (
    <section id="top" className="site-wrap site-hero">
      <div className="reveal">
        <p className="eyebrow">Software engineer · backend systems</p>
        <h1 className="display">
          Building reliable
          <br />
          <em>systems</em> people
          <br />
          can ship on
        </h1>
        <p className="lede">
          I&apos;m Akhand Agarwal, a software engineer currently at Allen
          Digital. I enjoy transforming complex product requirements into{' '}
          <span className="mark">clear APIs, durable workflows</span>, and
          services that stay calm when traffic spikes.
        </p>
        <div className="hero-actions">
          {resumeFileUrl && (
            <a
              href={resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-solid"
            >
              Download resume
            </a>
          )}
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="btn-soft"
          >
            <AiFillGithub />
            GitHub
          </a>
          <span className="aside-note">(yes, the real one)</span>
        </div>
      </div>

      <div className="reveal reveal-delay-2">
        <div className="window-frame">
          <div className="window-bar">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
            <span className="ml-2 font-mono-ibm text-xs text-[color:var(--text-3)]">
              akhand — zsh
            </span>
          </div>
          <div className="window-body">
            <div className="avatar-tile">
              {loading || !profile ? (
                skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })
              ) : (
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={name}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              )}
            </div>
            <div className="terminal">
              <div>
                <span className="cmd">$</span> whoami
              </div>
              <div className="ok">{name}</div>
              <div>
                <span className="cmd">$</span> cat bio.txt
              </div>
              <div>
                {loading || !profile
                  ? 'loading profile from github...'
                  : profile.bio || 'Building backend systems.'}
              </div>
              {profile?.location && (
                <>
                  <div>
                    <span className="cmd">$</span> pwd
                  </div>
                  <div className="ok">{profile.location}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
