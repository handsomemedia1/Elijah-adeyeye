import { LuArrowUpRight, LuNewspaper } from 'react-icons/lu';
import { elitechImageUrl, elitechPostUrl } from '../data/siteData';
import '../pages/BlogPage.css';

// eslint-disable-next-line react-refresh/only-export-components
export const formatPostDate = (iso, month = 'short') =>
  new Date(iso).toLocaleDateString('en-GB', { timeZone: 'UTC', month, day: 'numeric', year: 'numeric' });

export function PostMeta({ post }) {
  return (
    <p className="blog-meta">
      <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
      {post.views > 0 && <span>{post.views.toLocaleString('en-GB')} views</span>}
    </p>
  );
}

/** A card for a post published on Elitech Hub. It links there, where the post lives. */
export default function BlogCard({ post, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;

  return (
    <article className="blog-card">
      <a href={elitechPostUrl(post.slug)} target="_blank" rel="noopener" className="blog-card__link">
        <div className="blog-card__media">
          {post.thumbnail
            ? <img src={elitechImageUrl(post.thumbnail)} alt="" width="640" height="360" loading="lazy" decoding="async" />
            : <div className="blog-card__placeholder" aria-hidden="true"><LuNewspaper /></div>}
          {post.category && <span className="blog-card__category">{post.category}</span>}
        </div>
        <div className="blog-card__body">
          <Heading className="blog-card__title">{post.title}</Heading>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__footer">
            <PostMeta post={post} />
            <LuArrowUpRight className="blog-card__arrow" aria-label="Opens on Elitech Hub" />
          </div>
        </div>
      </a>
    </article>
  );
}
