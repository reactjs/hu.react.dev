/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import React from 'react';
import {sharedStyles} from 'theme';

type Props = {
  location: Location,
};

const PageNotFound = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>Az oldal nem található</Header>
          <TitleAndMetaTags title="React - Page Not Found" />
          <div css={sharedStyles.markdown}>
            <p>Nem találtuk meg, amit kerestél.</p>
            <p>
              Kérjük vedd fel a kapcsolatot az oldal tulajdonosával, ami
              erre az URL-re küldött téged és tudasd velük, hogy a link nem működik.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default PageNotFound;
