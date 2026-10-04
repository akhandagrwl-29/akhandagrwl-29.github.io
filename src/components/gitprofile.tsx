import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';
import SiteHeader from './site-header';
import Hero from './hero';
import SiteSection from './site-section';
import AwardCard from './award-card';

/**
 * Renders the GitProfile component.
 *
 * @param {Object} config - the configuration object
 * @return {JSX.Element} the rendered GitProfile component
 */
const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config),
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) {
          return [];
        }

        const excludeRepo =
          sanitizedConfig.projects.github.automatic.exclude.projects
            .map((project) => `+-repo:${project}`)
            .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        const repoData = repoResponse.data;

        return repoData.items;
      } else {
        if (sanitizedConfig.projects.github.manual.projects.length === 0) {
          return [];
        }
        const repos = sanitizedConfig.projects.github.manual.projects
          .map((project) => `+repo:${project}`)
          .join('');

        const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        const repoData = repoResponse.data;

        return repoData.items;
      }
    },
    [
      sanitizedConfig.github.username,
      sanitizedConfig.projects.github.mode,
      sanitizedConfig.projects.github.manual.projects,
      sanitizedConfig.projects.github.automatic.sortBy,
      sanitizedConfig.projects.github.automatic.limit,
      sanitizedConfig.projects.github.automatic.exclude.forks,
      sanitizedConfig.projects.github.automatic.exclude.projects,
    ],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      const data = response.data;

      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (!sanitizedConfig.projects.github.display) {
        return;
      }

      setGithubProjects(await getGithubProjects(data.public_repos));
    } catch (error) {
      handleError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [
    sanitizedConfig.github.username,
    sanitizedConfig.projects.github.display,
    getGithubProjects,
  ]);

  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const glow = document.getElementById('pointer-glow');
    if (!glow) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      glow.style.setProperty('--x', `${event.clientX}px`);
      glow.style.setProperty('--y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const handleError = (error: AxiosError | Error): void => {
    console.error('Error:', error);

    if (error instanceof AxiosError) {
      try {
        const reset = formatDistance(
          new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000),
          new Date(),
          { addSuffix: true },
        );

        if (typeof error.response?.status === 'number') {
          switch (error.response.status) {
            case 403:
              setError(setTooManyRequestError(reset));
              break;
            case 404:
              setError(INVALID_GITHUB_USERNAME_ERROR);
              break;
            default:
              setError(GENERIC_ERROR);
              break;
          }
        } else {
          setError(GENERIC_ERROR);
        }
      } catch (innerError) {
        setError(GENERIC_ERROR);
      }
    } else {
      setError(GENERIC_ERROR);
    }
  };

  return (
    <div className="site-root fade-in">
      <div id="pointer-glow" className="pointer-glow" />
      {error ? (
        <ErrorPage
          status={error.status}
          title={error.title}
          subTitle={error.subTitle}
        />
      ) : (
        <>
          <SiteHeader
            name={profile?.name || 'Akhand Agarwal'}
            githubUsername={sanitizedConfig.github.username}
            linkedin={sanitizedConfig.social.linkedin}
            theme={theme}
            setTheme={setTheme}
          />
          <Hero
            profile={profile}
            loading={loading}
            resumeFileUrl={sanitizedConfig.resume.fileUrl}
            githubUsername={sanitizedConfig.github.username}
          />

          {sanitizedConfig.experiences.length !== 0 && (
            <SiteSection
              id="experience"
              label="01 — Career"
              title={
                <>
                  Places I&apos;ve <em>built</em>
                </>
              }
            >
              <ExperienceCard
                loading={loading}
                experiences={sanitizedConfig.experiences}
              />
            </SiteSection>
          )}

          {sanitizedConfig.projects.external.projects.length !== 0 && (
            <SiteSection
              id="work"
              label="02 — Product"
              title={
                <>
                  A few things I&apos;ve <em>built</em>
                </>
              }
            >
              <ExternalProjectCard
                loading={loading}
                header={sanitizedConfig.projects.external.header}
                externalProjects={sanitizedConfig.projects.external.projects}
                googleAnalyticId={sanitizedConfig.googleAnalytics.id}
              />
            </SiteSection>
          )}

          {sanitizedConfig.projects.github.display && (
            <SiteSection
              id="projects"
              label="03 — Open source"
              title={
                <>
                  Selected <em>repositories</em>
                </>
              }
            >
              <GithubProjectCard
                header={sanitizedConfig.projects.github.header}
                limit={sanitizedConfig.projects.github.automatic.limit}
                githubProjects={githubProjects}
                loading={loading}
                googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
              />
            </SiteSection>
          )}

          {sanitizedConfig.publications.length !== 0 && (
            <SiteSection
              id="writing"
              label="04 — Writing"
              title={
                <>
                  Notes on <em>systems</em>
                </>
              }
            >
              <PublicationCard
                loading={loading}
                publications={sanitizedConfig.publications}
              />
            </SiteSection>
          )}

          {sanitizedConfig.awards.length !== 0 && (
            <SiteSection
              id="awards"
              label="05 — Honors"
              title={
                <>
                  Awards &amp; <em>recognition</em>
                </>
              }
            >
              <AwardCard loading={loading} awards={sanitizedConfig.awards} />
            </SiteSection>
          )}

          {sanitizedConfig.blog.display && (
            <SiteSection id="blog" label="06 — Blog" title="Latest posts">
              <BlogCard
                loading={loading}
                googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                blog={sanitizedConfig.blog}
              />
            </SiteSection>
          )}

          {(sanitizedConfig.skills.length !== 0 ||
            sanitizedConfig.educations.length !== 0 ||
            sanitizedConfig.certifications.length !== 0) && (
            <SiteSection
              id="stack"
              label="06 — Craft"
              title={
                <>
                  Tools, school, <em>proof</em>
                </>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                {sanitizedConfig.skills.length !== 0 && (
                  <SkillCard
                    loading={loading}
                    skills={sanitizedConfig.skills}
                  />
                )}
                <div className="grid gap-5">
                  {sanitizedConfig.educations.length !== 0 && (
                    <EducationCard
                      loading={loading}
                      educations={sanitizedConfig.educations}
                    />
                  )}
                  {sanitizedConfig.certifications.length !== 0 && (
                    <CertificationCard
                      loading={loading}
                      certifications={sanitizedConfig.certifications}
                    />
                  )}
                </div>
              </div>
            </SiteSection>
          )}

          <SiteSection
            id="contact"
            label="07 — Contact"
            title={
              <>
                Let&apos;s build the <em>next</em> thing
              </>
            }
          >
            <DetailsCard
              profile={profile}
              loading={loading}
              github={sanitizedConfig.github}
              social={sanitizedConfig.social}
            />
          </SiteSection>

          {sanitizedConfig.footer && (
            <footer className="site-footer">
              <div className="site-wrap">
                <Footer content={sanitizedConfig.footer} loading={loading} />
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default GitProfile;
