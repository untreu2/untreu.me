import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: () => null,
          a: ({ href, children, ...props }) => {
            const isExternal = /^https?:\/\//.test(href ?? '')
            return (
              <a
                href={href}
                {...props}
                {...(isExternal
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
