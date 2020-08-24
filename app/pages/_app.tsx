import { AppProps, ErrorComponent } from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import { CSSReset, ThemeProvider, ColorModeProvider } from "@chakra-ui/core"
import { Suspense } from "react"
import FullPageSpinner from "app/components/FullPageSpinner"
import theme from "app/styles/theme"
import "react-markdown-editor-lite/lib/index.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="dark">
          <CSSReset />
          <Suspense fallback={<FullPageSpinner />}>
            <Component {...pageProps} />
          </Suspense>
        </ColorModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }) {
  return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
}
