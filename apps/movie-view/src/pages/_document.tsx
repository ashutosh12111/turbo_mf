import {
  DocumentHeadTags,
  documentGetInitialProps,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/v15-pagesRouter";
import {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentProps,
} from "next/document";

type Props = DocumentProps & DocumentHeadTagsProps;

export default function Document(props: Props) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (context: DocumentContext) =>
  documentGetInitialProps(context);
