/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import Layout from 'components/Layout';
import Container from 'components/Container';
import Header from 'components/Header';
import React from 'react';
import {sharedStyles} from 'theme';

type Props = {
  location: Location,
};

const JsxCompiler = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>JSX Compiler Service</Header>
          <div css={sharedStyles.markdown}>
            <p>
              <strong>
                Ez az eszköz el lett távolítva, mivel a JSXTransformer
                elavultnak lett minősítve.
              </strong>
            </p>
            <p>
              Egy másik eszköz használatát ajánljuk, mint például{' '}
              <a href="https://babeljs.io/repl">a Babel REPL</a>.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default JsxCompiler;
